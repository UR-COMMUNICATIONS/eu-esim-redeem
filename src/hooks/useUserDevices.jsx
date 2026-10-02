import useUserApi from "./useUserApi";

/**
 * Convenience hook for fetching user devices
 * Uses the generic useUserApi hook internally
 * Follows the same pattern as usePaymentApis and useLocalPlan
 *
 * @returns {Object} Object containing:
 *   - fetchUserDevices: Function to fetch user devices (accepts optional user params and custom payload)
 *   - devices: Array of user devices
 *   - isLoading: Loading state
 *   - error: Error message if any
 */
const useUserDevices = () => {
  const { fetchUserData, data, isLoading, error } = useUserApi("getDevices", {
    responseParser: (res) => res?.devices || [],
    successValidator: (res) =>
      res?.status?.result === true ||
      (res?.devices && Array.isArray(res.devices)),
  });

  return {
    fetchUserDevices: fetchUserData,
    devices: data || [],
    isLoading,
    error,
  };
};

export default useUserDevices;
