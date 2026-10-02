import useUserApi from "./useUserApi";

/**
 * Convenience hook for fetching user orders
 * Uses the generic useUserApi hook internally
 * Follows the same pattern as usePaymentApis and useLocalPlan
 *
 * @returns {Object} Object containing:
 *   - fetchUserOrders: Function to fetch orders (accepts optional user params and custom payload)
 *   - orders: Array of user orders
 *   - isLoading: Loading state
 *   - error: Error message if any
 */
const useUserOrders = () => {
  const { fetchUserData, data, isLoading, error } = useUserApi(
    "getUserOrders",
    {
      responseParser: (res) => res?.orders || [],
      successValidator: (res) =>
        res?.status?.result === true ||
        (res?.orders && Array.isArray(res.orders)),
    },
  );

  return {
    fetchUserOrders: fetchUserData,
    orders: data || [],
    isLoading,
    error,
  };
};

export default useUserOrders;
