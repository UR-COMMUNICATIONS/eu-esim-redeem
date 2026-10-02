import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { apidispatcher } from "./general.services";
import { modulesURLPath } from "@/constants/urls";
// import { ApiService } from "./apiClient";
import ApiService from "@/general/apiClient";
import { clearInvalidSession } from "@/store/module/auth/slice";

// getUser is the one call type whose whole job is "does this token still
// resolve to a real user" — a truthy response with no `user` field means the
// backend didn't recognize the caller (missing/expired/rejected token), not
// "this particular record wasn't found" the way other endpoints use a falsy
// result. Centralized here (once) rather than repeated in every component
// that calls getUser, since this is a React hook with dispatch access, unlike
// apidispatcher/ApiService.request below, which are plain transport
// functions with no React context to clear session state from.
function handleGetUserResponse(apiCall, res, dispatch) {
  if (apiCall === "getUser" && res && !res.user) {
    clearInvalidSession(dispatch);
  }
}

export function useDisApi({ apiCall, setCallBack }) {
  const dispatch = useDispatch();
  return useCallback(
    (params) => {
      // setCallBack({ isFetch: false, isProcess: true })
      apidispatcher(params, apiCall)
        .then((res) => {
          console.log(`${apiCall?.toUpperCase()} API RES :`, res);
          handleGetUserResponse(apiCall, res, dispatch);
          setCallBack(res, params);
        })
        .catch((error) => {
          console.log(`${apiCall?.toUpperCase()} API EXCEPTION :`, error);
        });
    },
    [apiCall, dispatch],
  );
}

export function useApiService({ apiCall, setCallBack, apiName }) {
  const dispatch = useDispatch();
  return useCallback(
    (params) => {
      ApiService.request(apiCall, params)
        .then((res) => {
          console.log(`${apiName?.toUpperCase()} API RES :`, res);
          handleGetUserResponse(apiName, res, dispatch);
          setCallBack(res, params);
        })
        .catch((error) => {
          console.log(`${apiName?.toUpperCase()} API EXCEPTION :`, error);
        });
    },
    [apiName, dispatch],
  );
}

// export function useSinApi({ apiCall, objName, setCallBack }) {
//     return useCallback((params) => {
//         setCallBack({ isFetch: false, isProcess: true })
//         singenservice(params, apiCall)
//             .then((res) => {
//                 console.log(`${objName?.toUpperCase()} API RES :`, res);
//                 setCallBack(res)
//             })
//             .catch((error) => {
//                 console.log(`${objName?.toUpperCase()} API EXCEPTION :`, error);
//             });
//     }, []);
// }

// export function useGenApi({ apiCall, objName, setCallBack }) {
//     return useCallback(() => {
//         genservice(apiCall)
//             .then((res) => {
//                 console.log(`GET ${objName?.toUpperCase()} API RES :`, res);
//                 setCallBack(res)
//             })
//             .catch((error) => {
//                 console.log(`GET ${objName?.toUpperCase()} API EXCEPTION :`, error);
//             });
//     }, []);
// }

// export function useGetApi({ args, apiCall, objName, setCallBack }) {
//     return useCallback((params) => {
//         setCallBack({ isFetch: false, isProcess: true })
//         let url = `${hostServices.eload}${apiCall}`
//         if (args == 2) {
//             url = `${url}${params.startDate}/${params?.endDate}`
//         }
//         if (args == 3) {
//             if (['topup', 'commission'].includes(objName)) {
//                 url = `${url}${params.id}/${params.startDate}/${params?.endDate}/${objName}`
//             }
//             else {
//                 url = `${url}${params.id}/transactions/${params.startDate}/${params?.endDate}`
//             }
//         }
//         callGetMethod(url)
//             .then((res) => {
//                 console.log(`GET ${objName?.toUpperCase()} API RES :`, res);
//                 setCallBack(res)
//             })
//             .catch((error) => {
//                 console.log(`GET ${objName?.toUpperCase()} API EXCEPTION :`, error);
//             });
//     }, []);
// }
