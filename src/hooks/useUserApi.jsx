import { useDisApi } from "@/general";
import { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";

/**
 * Generic hook for user-related API calls
 * Can handle multiple user APIs like getUserOrders, getUser, getDevices, getUserCardsEnc, etc.
 * Follows the same pattern as usePaymentApis and useLocalPlan
 *
 * @param {string} apiCall - The API call type (e.g., "getUserOrders", "getUser", "getDevices")
 * @param {Object} options - Optional configuration
 * @param {Function} options.responseParser - Custom function to parse response and extract data
 * @param {Function} options.successValidator - Custom function to validate success response
 *
 * @returns {Object} Object containing:
 *   - fetchUserData: Function to fetch user data (accepts optional user params and custom payload)
 *   - data: The fetched data
 *   - isLoading: Loading state
 *   - error: Error message if any
 */
const useUserApi = (apiCall, options = {}) => {
  const { user } = useSelector((state) => state.auth);
  const timeoutRef = useRef(null);
  const { responseParser, successValidator } = options;

  // Internal state management
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create a dynamic API call based on the provided apiCall parameter
  const userApi = useDisApi({
    apiCall: apiCall,
    setCallBack: (res, params) => {
      // Clear timeout if response received
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Detailed response logging
      console.log(`=== ${apiCall?.toUpperCase()} API RESPONSE ===`);
      console.log("Full Response:", res);
      console.log("Response Status:", res?.status);
      console.log("Response Result:", res?.status?.result);
      console.log("Response Message:", res?.status?.message);
      console.log("Response Keys:", res ? Object.keys(res) : "No response");
      console.log("================================");

      // Use custom validator if provided, otherwise use default
      const isValid = successValidator
        ? successValidator(res)
        : res?.status?.result === true || res?.result === true;

      if (isValid) {
        // Use custom parser if provided, otherwise extract data based on common patterns
        const extractedData = responseParser
          ? responseParser(res)
          : extractDataFromResponse(res, apiCall);

        // Update state
        setData(extractedData);
        setError(null);
        setIsLoading(false);

        // Call optional callback if provided (for backward compatibility)
        if (params?.onSuccess) {
          params.onSuccess(extractedData, res);
        }
      } else {
        const errorMsg =
          res?.status?.message || res?.message || `Failed to fetch ${apiCall}`;

        // Update state
        setData(null);
        setError(errorMsg);
        setIsLoading(false);

        // Call optional callback if provided (for backward compatibility)
        if (params?.onError) {
          params.onError(errorMsg, res);
        } else {
          console.warn(`Failed to fetch ${apiCall}. Error:`, errorMsg);
          console.warn("Response structure:", res);
        }
      }
    },
  });

  /**
   * Extract data from response based on common patterns
   * Different APIs return data in different structures
   */
  const extractDataFromResponse = (res, apiCallType) => {
    // Handle different response structures
    if (res?.orders && Array.isArray(res.orders)) {
      return res.orders; // getUserOrders
    }
    if (res?.user) {
      return res.user; // getUser
    }
    if (res?.devices && Array.isArray(res.devices)) {
      return res.devices; // getDevices
    }
    if (res?.data) {
      return res.data; // getUserCardsEnc (encrypted)
    }
    if (res?.cards && Array.isArray(res.cards)) {
      return res.cards; // getUserCards
    }
    if (res?.addresses && Array.isArray(res.addresses)) {
      return res.addresses; // getUserAddresses
    }
    // Return full response if no specific pattern matches
    return res;
  };

  /**
   * Fetch user data using the specified API call
   * @param {Object} options - Optional configuration
   * @param {Object} options.userParams - Override user params (phone, userId, appUserId)
   * @param {Object} options.customPayload - Additional custom payload parameters
   * @param {Function} options.onSuccess - Optional callback when data is fetched successfully (for backward compatibility)
   * @param {Function} options.onError - Optional callback when fetch fails (for backward compatibility)
   * @param {Function} options.onTimeout - Optional callback when request times out (for backward compatibility)
   * @param {number} options.timeout - Timeout in milliseconds (default: 30000)
   */
  const fetchUserData = useCallback(
    (options = {}) => {
      const {
        userParams = null,
        customPayload = {},
        onSuccess = null,
        onError = null,
        onTimeout = null,
        timeout = 30000,
      } = options;

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set loading state
      setIsLoading(true);
      setError(null);

      // Use provided user params or fallback to Redux user state
      const targetUser = userParams || user;

      // Check if user info is required (some APIs might not need it)
      const requiresUserInfo = apiCall !== "addUserProfile"; // Add exceptions as needed

      if (requiresUserInfo && !targetUser?.userId && !targetUser?.appUserId) {
        const errorMsg = "User information not available";
        console.warn("User information not available:", targetUser);
        setError(errorMsg);
        setIsLoading(false);
        if (onError) {
          onError(errorMsg, null);
        }
        return;
      }

      // Prepare base payload with user info
      const basePayload = {};
      if (targetUser?.phoneNumber) {
        basePayload.phone = targetUser.phoneNumber;
      }
      if (targetUser?.userId) {
        basePayload.userId = targetUser.userId;
      }
      if (targetUser?.appUserId) {
        basePayload.appUserId = targetUser.appUserId;
      }

      // Merge with custom payload (custom payload takes precedence)
      const payload = {
        ...basePayload,
        ...customPayload,
        onSuccess,
        onError,
      };

      // Detailed payload logging
      console.log(`=== ${apiCall?.toUpperCase()} API REQUEST ===`);
      console.log("User Object:", targetUser);
      console.log("Request Payload:", {
        ...payload,
        onSuccess: onSuccess ? "[Function]" : null,
        onError: onError ? "[Function]" : null,
      });
      console.log("Phone Number:", targetUser?.phoneNumber);
      console.log("User ID:", targetUser?.userId);
      console.log("App User ID:", targetUser?.appUserId);
      console.log("Custom Payload:", customPayload);
      console.log("================================");

      // Set timeout to handle cases where API call fails silently
      timeoutRef.current = setTimeout(() => {
        const timeoutMsg = "Request timeout. Please try again.";
        console.error(
          `${apiCall?.toUpperCase()} API timeout after`,
          timeout / 1000,
          "seconds",
        );
        setError(timeoutMsg);
        setIsLoading(false);
        if (onTimeout) {
          onTimeout(timeoutMsg);
        } else if (onError) {
          onError(timeoutMsg, null);
        }
      }, timeout);

      userApi(payload);
    },
    [user, userApi, apiCall],
  );

  return {
    fetchUserData,
    data,
    isLoading,
    error,
  };
};

export default useUserApi;
