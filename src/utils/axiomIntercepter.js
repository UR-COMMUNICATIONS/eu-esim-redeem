// src/utils/axiomInterceptor.js
import { hostServices } from "@/general/host.services";
import { Axiom } from "@axiomhq/js";

class AxiomRequestInterceptor {
  constructor(config = {}) {
    this.axiom = new Axiom({
      token: config.token || hostServices.axiomToken,
      orgId: config.orgId || hostServices.axiomOrgId,
    });

    this.dataset = config.dataset || "yooweb-logs";
    this.enabled = true || config.enabled !== false;
    this.logHeaders = config.logHeaders !== false;
    this.logBody = config.logBody !== false;
    this.logResponseBody = config.logResponseBody !== false;
    this.excludeUrls = config.excludeUrls || [];

    this.originalFetch = null;
    this.requestId = 0;
  }

  init() {
    if (!this.enabled) return;

    // Store original fetch
    this.originalFetch = window.fetch;

    // Override fetch
    window.fetch = this.interceptedFetch.bind(this);

    console.log("Axiom fetch interceptor initialized");
  }

  destroy() {
    if (this.originalFetch) {
      window.fetch = this.originalFetch;
      this.originalFetch = null;
    }
  }

  shouldLog(url) {
    // Skip logging for Axiom/ELK API calls to prevent infinite loops
    if (
      url.includes("axiom.co") ||
      url.includes("api.axiom.co") ||
      url.includes("elk.ur-sg.site") ||
      url.includes("amazonaws.com")
    ) {
      return false;
    }

    // Only allow requests to these specific domains
    const allowedDomains = ["coreapi.yoowifi.com", "staging.yoowifi.com"];

    // Check if URL matches one of your allowed domains
    const isAllowedDomain = allowedDomains.some((domain) => {
      return url.includes(domain);
    });

    if (!isAllowedDomain) {
      return false;
    }

    // Check exclude patterns (existing logic) - optional, only if you still want to exclude specific URLs within these domains
    return !this.excludeUrls.some((pattern) => {
      if (typeof pattern === "string") {
        return url.includes(pattern);
      }
      if (pattern instanceof RegExp) {
        return pattern.test(url);
      }
      return false;
    });
  }

  async interceptedFetch(url, options = {}) {
    const requestId = String(Date.now());
    const startTime = Date.now();
    const requestUrl = typeof url === "string" ? url : url.toString();

    // Skip logging if not an allowed domain
    if (!this.shouldLog(requestUrl)) {
      return await this.originalFetch.call(window, url, options);
    }

    // keepalive requests fire during pagehide (tab close). Normal async logging
    // won't survive page teardown, so we fire a separate keepalive log beacon
    // to Axiom/ELK synchronously before passing the request through.
    if (options.keepalive) {
      const bodyParams = await this.extractBodyParams(options.body);
      const logEntry = {
        timestamp: new Date().toISOString(),
        requestId: ++this.requestId,
        method: options.method || "POST",
        url: requestUrl,
        userAgent: navigator.userAgent,
        sessionId: this.getSessionId(),
        userId: bodyParams.userId || null,
        appUserId: bodyParams.appUserId || null,
        platform: bodyParams.platform || null,
        source: bodyParams.source || null,
        beacon: true,
      };
      if (options.body) {
        try {
          logEntry.requestBody = await this.sanitizeBodyExcluding(
            options.body,
            ["userId", "appUserId", "platform", "source"],
          );
        } catch (_) {}
      }
      // Use keepalive so the log survives page teardown too
      try {
        const elkPayload = this.buildELKPayload(logEntry);
        this.originalFetch.call(
          window,
          "https://elk.ur-sg.site/logstash/http/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            keepalive: true,
            body: JSON.stringify(elkPayload),
          },
        );
      } catch (_) {}
      return await this.originalFetch.call(window, url, options);
    }

    // Extract specific fields from request body
    const bodyParams = await this.extractBodyParams(options.body);

    // Create base log entry with request data
    const logEntry = {
      timestamp: new Date().toISOString(),
      requestId: bodyParams.requestId || requestId,
      method: options.method || "GET",
      url: requestUrl,
      userAgent: navigator.userAgent,
      sessionId: this.getSessionId(),
      // Add extracted body parameters as individual fields
      userId: bodyParams.userId || null,
      appUserId: bodyParams.appUserId || null,
      platform: bodyParams.platform || null,
      source: bodyParams.source || null,
    };

    // Add request headers if enabled (safely)
    if (this.logHeaders && options.headers) {
      try {
        logEntry.requestHeaders = this.sanitizeHeaders(options.headers);
      } catch (error) {
        console.warn("Failed to log request headers:", error);
      }
    }

    // Add request body if enabled (safely) - Optional: log remaining body fields excluding the extracted ones
    if (this.logBody && options.body) {
      try {
        logEntry.requestBody = await this.sanitizeBodyExcluding(options.body, [
          "userId",
          "appUserId",
          "platform",
          "source",
        ]);
      } catch (error) {
        console.warn("Failed to log request body:", error);
      }
    }

    try {
      // Make the actual request with proper context and error handling
      const response = await this.originalFetch.call(window, url, options);
      const endTime = Date.now();

      // Add response data to the same log entry
      logEntry.status = response.status;
      logEntry.statusText = response.statusText;
      logEntry.duration = endTime - startTime;
      logEntry.success = true;

      // Add response headers if enabled (safely)
      if (this.logHeaders) {
        try {
          logEntry.responseHeaders = this.sanitizeResponseHeaders(
            response.headers,
          );
        } catch (error) {
          console.warn("Failed to log response headers:", error);
        }
      }

      // Add response body if enabled (safely)
      if (this.logResponseBody) {
        await this.addResponseBodyToLog(logEntry, response);
      } else {
        // Log the combined entry
        this.logToAxiomAsync(logEntry);
      }

      // Return the original response without modification
      return response;
    } catch (error) {
      const endTime = Date.now();

      // Add error data to the same log entry
      logEntry.status = null;
      logEntry.statusText = null;
      logEntry.duration = endTime - startTime;
      logEntry.success = false;
      logEntry.error = error.message;
      logEntry.errorStack = error.stack;

      // Log the combined entry with error
      this.logToAxiomAsync(logEntry);

      // Re-throw the original error without modification
      throw error;
    }
  }

  // Method to extract specific parameters from request body
  async extractBodyParams(body) {
    const params = {
      userId: null,
      appUserId: null,
      platform: null,
      source: null,
      requestId: null,
    };

    if (!body) return params;

    try {
      let bodyData = null;

      if (typeof body === "string") {
        try {
          bodyData = JSON.parse(body);
        } catch {
          // If it's not JSON, might be form data or other format
          return params;
        }
      } else if (body instanceof FormData) {
        bodyData = {};
        for (const [key, value] of body.entries()) {
          bodyData[key] = value;
        }
      } else if (body instanceof URLSearchParams) {
        bodyData = {};
        for (const [key, value] of body.entries()) {
          bodyData[key] = value;
        }
      } else if (typeof body === "object") {
        bodyData = body;
      }

      // Extract the specific fields we want
      if (bodyData && typeof bodyData === "object") {
        params.userId = bodyData.userId || bodyData.user_id || null;
        params.appUserId = bodyData.appUserId || bodyData.app_user_id || null;
        params.platform = bodyData.platform || null;
        params.source = bodyData.source || null;
        params.requestId = bodyData.requestId || null;
      }
    } catch (error) {
      console.warn("Failed to extract body params:", error);
    }

    return params;
  }

  // Method to sanitize body while excluding specific fields (safely, without consuming original)
  async sanitizeBodyExcluding(body, excludeFields = []) {
    if (!body) return null;

    try {
      let bodyData = null;

      if (typeof body === "string") {
        try {
          bodyData = JSON.parse(body);
        } catch {
          return body.length > 5000
            ? body.substring(0, 5000) + "...[TRUNCATED]"
            : body;
        }
      } else if (body instanceof FormData) {
        // FormData is safe to read multiple times
        bodyData = {};
        for (const [key, value] of body.entries()) {
          if (!excludeFields.includes(key)) {
            bodyData[key] = value;
          }
        }
      } else if (body instanceof URLSearchParams) {
        // URLSearchParams is safe to read multiple times
        bodyData = {};
        for (const [key, value] of body.entries()) {
          if (!excludeFields.includes(key)) {
            bodyData[key] = value;
          }
        }
      } else if (
        typeof body === "object" &&
        body !== null &&
        !(body instanceof ReadableStream) &&
        !(body instanceof ArrayBuffer) &&
        !(body instanceof Blob)
      ) {
        // Only process plain objects, avoid streams/binary data
        bodyData = { ...body }; // Create copy to avoid modifying original
        excludeFields.forEach((field) => {
          delete bodyData[field];
          delete bodyData[field.replace(/([A-Z])/g, "_$1").toLowerCase()]; // Also remove snake_case variants
        });
      } else {
        // Skip body logging for streams/binary data to avoid consumption
        return "[STREAM_OR_BINARY_DATA]";
      }

      if (bodyData && typeof bodyData === "object") {
        const sanitized = this.redactSensitiveFields(bodyData);
        const jsonString = JSON.stringify(sanitized);
        return jsonString.length > 5000
          ? jsonString.substring(0, 5000) + "...[TRUNCATED]"
          : jsonString;
      }

      return bodyData;
    } catch (error) {
      return "[BODY_PARSE_ERROR]";
    }
  }

  // Add response body to existing log entry (safely cloning the response)
  async addResponseBodyToLog(logEntry, response) {
    try {
      // Clone the response so we can read the body without consuming the original
      const responseClone = response.clone();

      // Get content type to determine how to parse the body
      const contentType = response.headers.get("content-type") || "";

      let responseBody = null;

      // Parse body based on content type
      if (contentType.includes("application/json")) {
        try {
          const jsonData = await responseClone.json();
          responseBody = this.sanitizeResponseBody(jsonData);
        } catch (error) {
          responseBody = "[JSON_PARSE_ERROR]";
        }
      } else if (contentType.includes("text/")) {
        try {
          const textData = await responseClone.text();
          responseBody =
            textData.length > 5000
              ? textData.substring(0, 5000) + "...[TRUNCATED]"
              : textData;
        } catch (error) {
          responseBody = "[TEXT_PARSE_ERROR]";
        }
      } else if (
        contentType.includes("application/xml") ||
        contentType.includes("text/xml")
      ) {
        try {
          const xmlData = await responseClone.text();
          responseBody =
            xmlData.length > 5000
              ? xmlData.substring(0, 5000) + "...[TRUNCATED]"
              : xmlData;
        } catch (error) {
          responseBody = "[XML_PARSE_ERROR]";
        }
      } else {
        // For binary or unknown content types
        responseBody = `[BINARY_DATA: ${contentType}]`;
      }

      // Add the response body to the log entry
      logEntry.responseBody = responseBody;
    } catch (error) {
      console.warn("Failed to clone/parse response body:", error);
      logEntry.responseBody = "[RESPONSE_BODY_ERROR]";
    } finally {
      // Always log the combined entry, even if body parsing failed
      this.logToAxiomAsync(logEntry);
    }
  }

  // Async logging that doesn't block the main request — sends to both Axiom and ELK
  logToAxiomAsync(logEntry) {
    // Use setTimeout to ensure logging doesn't block the request
    setTimeout(async () => {
      try {
        await this.axiom.ingest(this.dataset, [logEntry]);
      } catch (error) {
        console.error("Failed to log to Axiom:", error);
      }
    }, 0);

    // Also send to ELK
    this.logToELKAsync(logEntry);
  }

  // Synchronous logging (kept for compatibility)
  async logToAxiom(logEntry) {
    try {
      await this.axiom.ingest(this.dataset, [logEntry]);
    } catch (error) {
      console.error("Failed to log to Axiom:", error);
    }
  }

  // Build ELK-compatible payload matching mobile app format
  buildELKPayload(logEntry) {
    const requestBody = logEntry.requestBody
      ? (() => {
          try {
            return JSON.parse(logEntry.requestBody);
          } catch {
            return logEntry.requestBody;
          }
        })()
      : {};

    const responseBody = logEntry.responseBody
      ? (() => {
          try {
            return JSON.parse(logEntry.responseBody);
          } catch {
            return logEntry.responseBody;
          }
        })()
      : {};

    const requestType = logEntry.url
      ? logEntry.url.substring(logEntry.url.lastIndexOf("/") + 1)
      : "NA";

    return {
      requestId: String(logEntry.requestId || "NA"),
      sessionId: logEntry.sessionId || "NA",
      appUserId: String(logEntry.appUserId || "NA"),
      email: logEntry.userId || "NA",
      source: logEntry.source || "NA",
      platform: logEntry.platform || "NA",
      requestType,
      url: logEntry.url || "NA",
      request: requestBody,
      response: logEntry.success
        ? {
            respObject: responseBody,
            statusCode: logEntry.status,
            durationMs: logEntry.duration,
            isJsonResponse: true,
          }
        : {
            status: {
              result: false,
              custError: true,
              message: logEntry.error || "Request failed",
              error: logEntry.error,
            },
            durationMs: logEntry.duration,
          },
      requestStringified: JSON.stringify(requestBody),
      responseStringified: JSON.stringify(responseBody),
    };
  }

  // Send log to ELK asynchronously
  logToELKAsync(logEntry) {
    setTimeout(async () => {
      try {
        const elkPayload = this.buildELKPayload(logEntry);
        await this.originalFetch.call(
          window,
          "https://elk.ur-sg.site/logstash/http/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(elkPayload),
          },
        );
      } catch (error) {
        console.error("Failed to log to ELK:", error);
      }
    }, 0);
  }

  sanitizeHeaders(headers) {
    const sanitized = {};
    const sensitiveHeaders = [
      "authorization",
      "cookie",
      "x-api-key",
      "x-auth-token",
    ];

    try {
      if (headers instanceof Headers) {
        for (const [key, value] of headers.entries()) {
          const lowerKey = key.toLowerCase();
          sanitized[key] = sensitiveHeaders.includes(lowerKey)
            ? "[REDACTED]"
            : value;
        }
      } else if (typeof headers === "object" && headers !== null) {
        Object.entries(headers).forEach(([key, value]) => {
          const lowerKey = key.toLowerCase();
          sanitized[key] = sensitiveHeaders.includes(lowerKey)
            ? "[REDACTED]"
            : value;
        });
      }

      // Convert to JSON string to avoid column explosion in Axiom
      return JSON.stringify(sanitized);
    } catch (error) {
      return JSON.stringify({ error: "Failed to sanitize headers" });
    }
  }

  sanitizeResponseHeaders(headers) {
    const sanitized = {};
    try {
      if (headers && typeof headers.entries === "function") {
        for (const [key, value] of headers.entries()) {
          sanitized[key] = value;
        }
      }

      // Convert to JSON string to avoid column explosion in Axiom
      return JSON.stringify(sanitized);
    } catch (error) {
      return JSON.stringify({ error: "Failed to sanitize response headers" });
    }
  }

  sanitizeResponseBody(data) {
    try {
      // Convert response body to JSON string to avoid column explosion in Axiom
      // This prevents hitting the 257 column limit by storing as a single field
      if (typeof data === "string") {
        return data.length > 5000
          ? data.substring(0, 5000) + "...[TRUNCATED]"
          : data;
      }

      if (typeof data === "number" || typeof data === "boolean") {
        return data;
      }

      // For objects and arrays, first redact sensitive fields, then stringify
      const sanitized = this.redactSensitiveFields(data);
      const jsonString = JSON.stringify(sanitized);

      // Truncate if too large (keep under 10KB)
      return jsonString.length > 10000
        ? jsonString.substring(0, 10000) + "...[TRUNCATED]"
        : jsonString;
    } catch (error) {
      return "[RESPONSE_SANITIZATION_ERROR]";
    }
  }

  redactSensitiveFields(obj) {
    return obj;
  }

  getSessionId() {
    try {
      // Get or create a session ID
      let sessionId = sessionStorage.getItem("axiom_session_id");
      if (!sessionId) {
        sessionId =
          "sess_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem("axiom_session_id", sessionId);
      }
      return sessionId;
    } catch {
      // Fallback if sessionStorage is not available
      return "sess_" + Date.now() + "_fallback";
    }
  }
}

export default AxiomRequestInterceptor;
