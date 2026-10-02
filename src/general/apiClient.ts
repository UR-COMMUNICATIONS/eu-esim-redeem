/**
 * ApiService - A generic class to handle API calls with interceptors
 *
 * Features:
 * - Configurable base URL from environment variables
 * - Method flexibility (defaults to POST)
 * - Automatic appending of standard request properties
 * - Direct store reference for user data
 * - Request/response interceptors for global handling
 * - Error handling with custom error class
 */

import { store } from "@/store";

// Define types for interceptors
type RequestInterceptor = (config: RequestConfig) => RequestConfig;
type ResponseInterceptor = <T>(response: T) => T;
type ErrorInterceptor = (
  error: Error | ApiError,
) => Error | ApiError | Promise<any>;

// Define custom options extending RequestInit
interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  // Add any custom properties here if needed
  [key: string]: any;
}

// Define type for request configuration
interface RequestConfig {
  url: string;
  method: string;
  headers: Record<string, string>;
  data: any;
  [key: string]: any;
}

// Define interfaces for auth state and user
interface User {
  appUserId?: string | number;
  userId?: string | number;
  [key: string]: any;
}

interface AuthState {
  user?: User;
  [key: string]: any;
}

interface StoreState {
  auth: AuthState;
  [key: string]: any;
}

interface StandardRequestProps {
  source: string;
  platform: string;
  appUserId?: string | number;
  userId?: string | number;
}

class ApiService {
  baseUrl: string;
  requestInterceptors: RequestInterceptor[];
  responseInterceptors: ResponseInterceptor[];
  errorInterceptors: ErrorInterceptor[];

  constructor() {
    this.baseUrl = "https://staging.yoowifi.com";
    this.requestInterceptors = [];
    this.responseInterceptors = [];
    this.errorInterceptors = [];
  }

  /**
   * Add a request interceptor
   * @param interceptor Function that receives and modifies the request config
   * @returns Index of the interceptor for later removal
   */
  addRequestInterceptor(interceptor: RequestInterceptor): number {
    return this.requestInterceptors.push(interceptor) - 1;
  }

  /**
   * Add a response interceptor
   * @param interceptor Function that receives and modifies the response
   * @returns Index of the interceptor for later removal
   */
  addResponseInterceptor(interceptor: ResponseInterceptor): number {
    return this.responseInterceptors.push(interceptor) - 1;
  }

  /**
   * Add an error interceptor
   * @param interceptor Function that handles errors
   * @returns Index of the interceptor for later removal
   */
  addErrorInterceptor(interceptor: ErrorInterceptor): number {
    return this.errorInterceptors.push(interceptor) - 1;
  }

  /**
   * Remove a request interceptor
   * @param index Index of the interceptor to remove
   */
  removeRequestInterceptor(index: number): void {
    this.requestInterceptors.splice(index, 1);
  }

  /**
   * Remove a response interceptor
   * @param index Index of the interceptor to remove
   */
  removeResponseInterceptor(index: number): void {
    this.responseInterceptors.splice(index, 1);
  }

  /**
   * Remove an error interceptor
   * @param index Index of the interceptor to remove
   */
  removeErrorInterceptor(index: number): void {
    this.errorInterceptors.splice(index, 1);
  }

  /**
   * Apply standard properties to all requests
   * @param requestData The original request data
   * @returns Enhanced request data
   */
  applyStandardProps<T extends Record<string, any>>(
    requestData: T,
  ): T & StandardRequestProps {
    const enhancedData = { ...requestData };
    (enhancedData as T & StandardRequestProps).source = "urwifi";
    (enhancedData as T & StandardRequestProps).platform = "web";
    const authState = store.getState().auth as AuthState;
    const user = authState?.user;
    if (user) {
      if (user.appUserId) {
        (enhancedData as T & StandardRequestProps).appUserId = user.appUserId;
      }
      if (user.userId) {
        (enhancedData as unknown as StandardRequestProps).userId = user.userId;
      }
    }
    return enhancedData as T & StandardRequestProps;
  }

  /**
   * Process all request interceptors
   * @param config Request configuration
   * @returns Modified request configuration
   */
  processRequestInterceptors(config: RequestConfig): RequestConfig {
    return this.requestInterceptors.reduce((acc, interceptor) => {
      return interceptor(acc);
    }, config);
  }

  /**
   * Process all response interceptors
   * @param response API response
   * @returns Modified API response
   */
  processResponseInterceptors<T>(response: T): T {
    return this.responseInterceptors.reduce((acc, interceptor) => {
      return interceptor(acc);
    }, response);
  }

  /**
   * Process all error interceptors
   * @param error Error object
   * @returns Either resolved with a modified response or rejected with the error
   */
  processErrorInterceptors(error: Error | ApiError): Promise<any> {
    try {
      return Promise.resolve(
        this.errorInterceptors.reduce((acc, interceptor) => {
          return interceptor(acc);
        }, error),
      );
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Make an API request
   * @param endpointUrl Endpoint URL to call (will be appended to baseUrl)
   * @param requestData Request data/body
   * @param options Additional options using the standard RequestInit interface
   * @returns Promise that resolves with the API response
   */
  async request<
    RequestDataType extends Record<string, any>,
    ResponseType = any,
  >(
    endpointUrl: string,
    requestData: RequestDataType,
    options: ApiRequestOptions = {},
  ): Promise<ResponseType> {
    try {
      const webSource = sessionStorage.getItem("source");
      const {
        method = "POST",
        headers = { "Content-Type": "application/json" },
        ...restOptions
      } = options;

      // Build the full URL
      // ${this.baseUrl}
      const url = `${endpointUrl}`;

      const enhancedData: RequestDataType & StandardRequestProps = {
        ...requestData,
        source: webSource || "urwifi",
        platform: "web",
      };

      const authState = store.getState().auth as AuthState;
      const user = authState?.user;

      if (user) {
        if (user.appUserId && !enhancedData.appUserId) {
          enhancedData.appUserId = user.appUserId;
        }
        if (user.userId && !enhancedData.userId) {
          enhancedData.userId = user.userId;
        }
      }

      // Convert headers to Record type if it's Headers object
      const headerRecord: Record<string, string> = {};

      // Handle different types of headers input
      if (headers instanceof Headers) {
        headers.forEach((value, key) => {
          headerRecord[key] = value;
        });
      } else if (typeof headers === "object") {
        Object.assign(headerRecord, headers);
      }

      // verifyAndLogin/addUser return a bearer token; attach it to every
      // request after login so the backend can authenticate the caller.
      // Matches the same logic in general.services.js's apidispatcher.
      const authToken = (authState as any)?.auth?.token;
      if (authToken && !headerRecord["Authorization"]) {
        headerRecord["Authorization"] = `Bearer ${authToken}`;
      }

      // Build the request config
      let config: RequestConfig = {
        url,
        method: method as string,
        headers: headerRecord,
        data: enhancedData,
        ...restOptions,
      };

      // Process request interceptors
      config = this.processRequestInterceptors(config);

      // Make the actual fetch request
      const isBodyless = ["GET", "HEAD"].includes(config.method.toUpperCase());
      const response = await fetch(config.url, {
        method: config.method,
        headers: config.headers,
        ...(isBodyless ? {} : { body: JSON.stringify(config.data) }),
        ...restOptions,
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new ApiError(
          `HTTP error ${response.status}`,
          response.status,
          await response.json(),
        );
      }

      // Parse the response
      const responseData = (await response.json()) as ResponseType;

      // Process response interceptors
      return this.processResponseInterceptors(responseData);
    } catch (error) {
      throw new ApiError(error.message, error.status, error);
      // Process error interceptors and reject
      // return this.processErrorInterceptors(error as Error).then(
      //     result => Promise.resolve(result),
      //     error => Promise.reject(error)
      // );
    }
  }
}

/**
 * Custom API error class
 */
class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// Export the class and error
export default new ApiService();
export { ApiService, ApiError };
