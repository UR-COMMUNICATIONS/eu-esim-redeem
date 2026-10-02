import useUserApi from "./useUserApi";

/**
 * Convenience hook for fetching user profile
 * Uses the generic useUserApi hook internally
 * Follows the same pattern as usePaymentApis and useLocalPlan
 *
 * @returns {Object} Object containing:
 *   - fetchUserProfile: Function to fetch user profile (accepts optional user params and custom payload)
 *   - user: User profile data
 *   - isLoading: Loading state
 *   - error: Error message if any
 */
const useUserProfile = () => {
  const { fetchUserData, data, isLoading, error } = useUserApi("getUser", {
    responseParser: (res) => res?.user || null,
    successValidator: (res) =>
      res?.user !== undefined || res?.status?.result === true,
  });

  return {
    fetchUserProfile: fetchUserData,
    user: data,
    isLoading,
    error,
  };
};

export default useUserProfile;
