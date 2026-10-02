import { countryOptions } from "@/constants/planTypes";
import { countryservice } from "@/general";
import { setCartData } from "@/store/module/cart/cartSlice";
import { setPocketWifiCartData } from "@/store/module/pocketWifi/slice";
import { setRouterCartData } from "@/store/module/router/slice";
import { setSimCartData } from "@/store/module/sim/slice";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/store/module/auth/slice";
import { countries } from "@/general/Arrays";
import { APP_SOURCE } from "@/constants/app";

function useSetLocalData(layout) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  function parseHttpHeaders(httpHeaders) {
    return httpHeaders
      .split("\n")
      .map((x) => x.split(/: */, 2))
      .filter((x) => x[0])
      .reduce((ac, x) => {
        ac[x[0]] = x[1];
        return ac;
      }, {});
  }

  const getHeaders = () => {
    // fetch(window.location.href)
    //   .then((response) => {
    //     console.log('Response Status:', response.status);
    //     let reqHeaders = {}
    //     // Log all response headers
    //     console.log('Response Headers Fetch:', response);
    //     response.headers.forEach((value, key) => {
    //       // console.log(`${key}: ${value}`);
    //       reqHeaders[key] = value
    //     });
    //     console.log('reqHeaders', reqHeaders);
    //     // Example: Access a specific header
    //     const customHeader = response.headers.get('cloudfront-viewer-country');
    //     console.log('Custom Response Header:', customHeader);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching:', error);
    //   });
    // fetch('http://localhost:5003/')
    //   .then((response) => response.json())
    //   .then((data) => console.log('dataaaaaaaaaaa', data.headers));
    // window.logRequestHeaders();
    // fetch('https://yoowifi.id/headers')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Server Headers :', data);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching headers:', error);
    //   });
    // var req = new XMLHttpRequest();
    // req.open('GET', document.location, false);
    // req.send(null);
    // var headers = parseHttpHeaders(req.getAllResponseHeaders());
    // console.log('XML headers', headers)
    // const customHeader = response.headers.get('X-Custom-Header');
  };

  const setLocalData = () => {
    const pocketWifiData = localStorage.getItem("pocket_wifi_cart");
    const routerData = localStorage.getItem("router_cart");
    const simData = localStorage.getItem("sim_cart");

    if (pocketWifiData && layout === "pocketWifi") {
      const data = JSON.parse(pocketWifiData);
      dispatch(setPocketWifiCartData(data));
    } else {
      localStorage.removeItem("pocket_wifi_cart");
    }

    if (routerData && layout === "router") {
      const data = JSON.parse(routerData);
      dispatch(setRouterCartData(data));
    } else {
      localStorage.removeItem("router_cart");
    }

    if (simData && layout === "sim") {
      const data = JSON.parse(simData);
      dispatch(setSimCartData(data));
    } else {
      localStorage.removeItem("sim_cart");
    }
  };

  const setOriginCountry = () => {
    //  https://ipinfo.io/175.141.173.182?token=d41cc9005132d7
    //  {
    //   "ip": "175.141.173.182",
    //   "city": "Johor Bahru",
    //   "region": "Johor",
    //   "country": "MY",
    //   "loc": "1.4655,103.7578",
    //   "org": "AS4788 TM TECHNOLOGY SERVICES SDN. BHD.",
    //   "postal": "80500",
    //   "timezone": "Asia/Kuala_Lumpur"
    // }

    if (window.location.href.includes("localhost")) {
      const countryObj = {
        ip: "175.141.173.182",
        city: "Johor Bahru",
        region: "Johor",
        country: "SG",
        loc: "1.4655,103.7578",
        org: "AS4788 TM TECHNOLOGY SERVICES SDN. BHD.",
        postal: "80500",
        timezone: "Asia/Kuala_Lumpur",
      };
      sessionStorage.setItem("i18next", countryOptions[countryObj?.country]);
      sessionStorage.setItem("user_country", JSON.stringify(countryObj));
      sessionStorage.setItem("source", APP_SOURCE);
      sessionStorage.setItem("user_language", "en");
      dispatch(setCartData({ userCountry: countryObj }));
    } else {
      fetch(window.location.href)
        .then((response) => {
          let resHeaders = {};
          response.headers.forEach((value, key) => {
            resHeaders[key] = value;
          });
          console.log("resHeaders", resHeaders);
          // Example: Access a specific header
          const host = response.headers.get("domain");
          const country = response.headers.get("cloudfront-viewer-country");
          console.log("cloudfront-viewer-country:", country);
          if (host?.toLowerCase().includes("yoowifi.jp")) {
            const newResp = { country: "JP" };
            sessionStorage.setItem("user_language", "jp");
            sessionStorage.setItem("i18next", "jp");
            sessionStorage.setItem("user_country", JSON.stringify(newResp));
            dispatch(setCartData({ userCountry: newResp }));
          } else if (host?.toLowerCase().includes("yoowifi.my")) {
            const newResp = { country: "MY" };
            sessionStorage.setItem("user_language", "en");
            sessionStorage.setItem("i18next", "en");
            sessionStorage.setItem("user_country", JSON.stringify(newResp));
            dispatch(setCartData({ userCountry: newResp }));
          } else if (host?.toLowerCase().includes("yoowifi.id")) {
            const newResp = { country: "ID" };
            sessionStorage.setItem("user_language", "id");
            sessionStorage.setItem("i18next", "id");
            sessionStorage.setItem("user_country", JSON.stringify(newResp));
            dispatch(setCartData({ userCountry: newResp }));
          } else if (host?.toLowerCase().includes("yoowifi.th")) {
            const newResp = { country: "TH" };
            sessionStorage.setItem("user_language", "th");
            sessionStorage.setItem("i18next", "th");
            sessionStorage.setItem("user_country", JSON.stringify(newResp));
            dispatch(setCartData({ userCountry: newResp }));
          } else if (
            host?.toLowerCase().includes("yoowifi.com") &&
            country === "ID"
          ) {
            const newResp = { country: "ID" };
            sessionStorage.setItem("user_language", "id");
            sessionStorage.setItem("i18next", "id");
            sessionStorage.setItem("user_country", JSON.stringify(newResp));
            dispatch(setCartData({ userCountry: newResp }));
          } else if (
            host?.toLowerCase().includes("yoowifi.com") &&
            country === "PH"
          ) {
            const newResp = { country: "PH" };
            sessionStorage.setItem("user_language", "en");
            sessionStorage.setItem("i18next", "en");
            sessionStorage.setItem("user_country", JSON.stringify(newResp));
            dispatch(setCartData({ userCountry: newResp }));
          } else if (country) {
            const newResp = Object.keys(countryOptions)
              .filter((val) => val !== "SG")
              .includes(country)
              ? { country }
              : { country: "SG" };
            console.log("cloudfront newResp", newResp);
            if (newResp.country === "PH") {
              sessionStorage.setItem("i18next", "en");
              sessionStorage.setItem("user_language", "en");
            } else {
              sessionStorage.setItem(
                "i18next",
                countryOptions[newResp?.country],
              );
              sessionStorage.setItem(
                "user_language",
                countryOptions[newResp?.country],
              );
            }
            sessionStorage.setItem("user_country", JSON.stringify(newResp));
            dispatch(setCartData({ userCountry: newResp }));
          } else {
            console.log("INSIDE COUNTRY SERVICE");
            // if (window.location.href.includes("localhost")) {
            //   console.log("localhost");
            //   const countryObj = {
            //     ip: "175.141.173.182",
            //     city: "Johor Bahru",
            //     region: "Johor",
            //     country: "SG",
            //     loc: "1.4655,103.7578",
            //     org: "AS4788 TM TECHNOLOGY SERVICES SDN. BHD.",
            //     postal: "80500",
            //     timezone: "Asia/Kuala_Lumpur",
            //   };
            //   sessionStorage.setItem(
            //     "i18next",
            //     countryOptions[countryObj?.country]
            //   );
            //   sessionStorage.setItem("user_country", JSON.stringify(countryObj));
            //   dispatch(setCartData({ userCountry: countryObj }));
            // }
            // else {
            countryservice("/general/originCountry")
              .then((res) => {
                console.log("counResp :", res);
                // const newResp = ['TH', 'PH', 'MY', 'ID', 'VN'].includes(res?.country) ? res : { ...res, country: 'SG' }
                const newResp = Object.keys(countryOptions)
                  .filter((val) => val !== "SG")
                  .includes(res?.country)
                  ? res
                  : { ...res, country: "SG" };
                console.log("newResp", newResp);
                if (newResp.country === "PH") {
                  sessionStorage.setItem("i18next", "en");
                } else {
                  sessionStorage.setItem(
                    "i18next",
                    countryOptions[newResp?.country],
                  );
                }
                sessionStorage.setItem("user_country", JSON.stringify(newResp));
                dispatch(setCartData({ userCountry: newResp }));
              })
              .catch((error) => {
                console.log("COUNTRY API EXCEPTION", error);
              });
            // }
          }
        })
        .catch((error) => {
          console.error("Error fetching:", error);
        });
    }
  };

  const getReactCountries = () => {
    if (cart.reactCountries?.length === 0) {
      // dispatch(setCartData({ reactCountries: trasnlatedCountries }));
      const reactCountries = countries.map((cou) => ({
        ...cou,
        iso2: cou.countryCode,
        name: cou.countryName,
      }));
      console.log("reactCountries", reactCountries);
      dispatch(setCartData({ reactCountries: reactCountries }));

      // GetCountries()
      //   .then((res) => {
      //     dispatch(setCartData({ reactCountries: res }));
      //   })
      //   .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    const userCountry = JSON.parse(sessionStorage.getItem("user_country"));
    const userData = JSON.parse(localStorage.getItem("user_data"));
    console.log("userCountry", userCountry);
    // console.log("userData", userData);

    // dispatch(setUserData(userData?.userId ? userData : null));
    dispatch(setUserData(userData));
    dispatch(setCartData({ userCountry: userCountry }));
    if (!userCountry) {
      setOriginCountry();
    }
    setLocalData();
    // getHeaders();
    getReactCountries();
  }, []);

  return;
}

export default useSetLocalData;
