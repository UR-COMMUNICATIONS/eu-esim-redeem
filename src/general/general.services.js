import { hostServices } from "./host.services";
import { encryptData } from "./encryption";
import { APP_SOURCE } from "@/constants/app";
import { store } from "@/store";
import { targetCountries } from "@/lib/utils";

export function orignalFormat(date) {
  if (date) {
    // Parse date string (YYYY-MM-DD) and create Date in local timezone
    // This ensures consistency with react-day-picker which uses local timezone
    if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const [year, month, day] = date.split("-").map(Number);
      // Create date at noon local time to avoid any edge cases
      return new Date(year, month - 1, day, 12, 0, 0);
    }
    return new Date(date);
  } else {
    return null;
  }
}

export function dateformat(date, num, format) {
  if (date == null) {
    date = new Date();
    if (!isNaN(num)) {
      date.setDate(date.getDate() - num);
      if (format == "rfcFormat") {
        return date;
      }
    }
    let year = date.getFullYear();
    let month = "" + (date.getMonth() + 1);
    let day = "" + date.getDate();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    if (num === "hms") {
      let hours = "" + date.getHours();
      let minutes = "" + date.getMinutes();
      let seconds = "" + date.getSeconds();
      if (hours.length < 2) hours = "0" + hours;
      if (minutes.length < 2) minutes = "0" + minutes;
      if (seconds.length < 2) seconds = "0" + seconds;
      return (
        [year, month, day].join("-") + " " + [hours, minutes, seconds].join(":")
      );
    } else if (num === "utc") {
      let utcyear = date.getUTCFullYear();
      let utcmonth = "" + (date.getUTCMonth() + 1);
      let utcday = "" + date.getUTCDate();
      let utchours = "" + date.getUTCHours();
      let utcminutes = "" + date.getUTCMinutes();
      let utcseconds = "" + date.getUTCSeconds();
      if (utcmonth.length < 2) utcmonth = "0" + utcmonth;
      if (utcday.length < 2) utcday = "0" + utcday;
      if (utchours.length < 2) utchours = "0" + utchours;
      if (utcminutes.length < 2) utcminutes = "0" + utcminutes;
      if (utcseconds.length < 2) utcseconds = "0" + utcseconds;
      return (
        [utcyear, utcmonth, utcday].join("-") +
        " " +
        [utchours, utcminutes, utcseconds].join(":")
      );
    } else {
      return [year, month, day].join("-");
    }
  } else {
    return date;
  }

  // console.log("DATE FORMAT : ", date);
  // date = new Date()
  // console.log("DATE FORMAT 2: ", date);
  // return format.replace('yyyy', date.getFullYear())
  //   .replace('mm', date.getMonth() + 1)
  //   .replace('dd', date.getDate());

  // if (date == null) {
  //   date = new Date()
  //   return format.replace('yyyy', date.getFullYear())
  //     .replace('mm', date.getMonth() + 1)
  //     .replace('dd', date.getDate());
  // }
  // else {
  //   return date
  // }
}

export function dateExternal(date, days) {
  date = new Date(date);
  if (days >= 0) {
    date.setDate(date.getDate() + days);
  }
  let year = date.getFullYear();
  let month = "" + (date.getMonth() + 1);
  let day = "" + date.getDate();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export const firebaseSignIn = (email, password) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, security: "$*@M@e@D,#1#a#Rng.*%" }),
  };

  return fetch(hostServices.host + "/user/authenticateUser", requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.log("API call error: " + error);
    });

  // return signInWithEmailAndPassword(auth, email, password)
  //   .then((response) => {
  //     return {
  //       user: response.user,
  //       status: {
  //         result: true,
  //         message: 'Action completed successfully'
  //       }
  //     }
  //   })
  //   .catch((error) => {
  //     return {
  //       status: {
  //         result: false,
  //         message: 'Action failed'
  //       }
  //     }
  //   });
};

export const firebaseSignUp = (email, password) => {
  // return createUserWithEmailAndPassword(auth, email, password)
  //   .then((response) => {
  //     return {
  //       user: response.user,
  //       status: {
  //         result: true,
  //         message: 'Action completed successfully'
  //       }
  //     }
  //   })
  //   .catch((error) => {
  //     console.log("error", error.message);
  //     return {
  //       status: {
  //         result: false,
  //         message: 'User created failed'
  //       }
  //     }
  //   });
};

export function countryservice(path) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify(object)
  };

  return fetch(hostServices.ipinfo, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.log("API call error: " + error);
    });
}

export function genservice(path) {
  const object = {
    security: "$*@M@e@D,#1#a#Rng.*%",
  };
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(object),
  };
  delete object.security;

  return fetch(hostServices.host + path, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.log("API call error: " + error);
    });
}

export function singenservice(object, path) {
  // console.log(path.split('/')[2].toUpperCase() + " OBJECT :", object)
  object.security = "$*@M@e@D,#1#a#Rng.*%";
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(object),
  };
  delete object.security;
  return fetch(hostServices.host + path, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.log("API call error: " + error);
    });

  // return {
  //     status: {
  //         result: true,
  //         message: "Partner added successfully"
  //     }
  // }
}
export function do2c2pPayment(request) {
  return new Promise((resolve, reject) => {
    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...request }),
    };

    fetch(hostServices.paymentBy2c2p, requestOptions)
      .then((response) => response.json())
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
}

export function apidispatcher(object, type) {
  const userCountry = JSON.parse(sessionStorage.getItem("user_country"));
  const localLanguage = sessionStorage.getItem("i18next");
  const userLanguage = sessionStorage.getItem("user_language");

  // console.log("userCountry", userCountry);
  // console.log("localLanguage", localLanguage);
  // console.log("userLanguage", userLanguage);
  // console.log("targetCountries", targetCountries);
  // console.log("lower", targetCountries.includes(userCountry?.country?.toLowerCase()));

  const apiLanguage = targetCountries.includes(
    userCountry?.country?.toLowerCase(),
  )
    ? userLanguage
    : localLanguage;

  // console.log("apiLanguage", apiLanguage);

  const webSource = sessionStorage.getItem("source");
  let obj = {};
  let url = "/jane2/api/apidispatcher";

  switch (type) {
    case "getFPXPaymentStatus":
      obj["requestType"] = "getFPXPaymentStatus";
      obj["invoiceNo"] = object.invoiceNo;
      break;
    case "getFPXPaymentToken":
      obj = { ...obj, ...object };
      obj["requestType"] = "getFPXPaymentToken";
      break;
    case "addUserProfile":
      obj["requestType"] = "addUserProfile";
      obj["userId"] = object.userId;
      obj["firstName"] = object.firstName;
      obj["lastName"] = object.lastName;
      obj["dob"] = object.dob;
      obj["gender"] = object.gender;
      obj["contact"] = object.contact;

      break;
    case "getPaymentToken":
      obj["requestType"] = "getPaymentToken";
      obj["userId"] = object.userId;
      obj["userName"] = object.userName;

      break;

    case "get3DSPaymentToken":
      obj["requestType"] = "get3DSPaymentToken";
      obj["data"] = encryptData({
        userId: object.userId,
        appUserId: object.appUserId,
        userName: object.userName,
        returnUrl: object.returnUrl,
      });
      break;
    case "isUserRegistered":
      obj["requestType"] = "isUserRegistered";
      obj["userId"] = object.userId;

      break;

    case "authenticateForLogin":
      obj["requestType"] = "authenticateForLogin";
      obj["data"] = encryptData({
        userId: object.userId,
        isResend: false,
        requestId: Date.now() + "",
        captchaToken: object.captchaToken,
        fingerPrint: object.fingerPrint,
      });
      // obj['userId'] = object.userId
      // obj['isResend'] = false

      break;

    case "authenticateUser":
      obj["requestType"] = "authenticateUser";
      obj["data"] = encryptData({
        userId: object.userId,
        userName: object.userName,
        phone: object.phone,
        requestId: Date.now() + "",
        captchaToken: object.captchaToken,
        isResend: false,
        fingerPrint: object.fingerPrint,
      });
      // obj['userId'] = object.userId
      // obj['userName'] = object.userName
      // obj['phone'] = object.phone
      // obj['isResend'] = false

      break;

    case "verifyAndLogin":
      obj["requestType"] = "verifyAndLogin";
      obj["userId"] = object.userId;
      obj["passCode"] = object.passCode;

      break;

    case "createUser":
      url = "/yw-services/user/create";

      obj["email"] = object?.email;
      obj["firstName"] = object?.firstName;
      obj["lastName"] = object?.lastName;
      obj["phoneNumber"] = object?.phoneNumber;
      obj["source"] = webSource || APP_SOURCE;
      // if (object?.deviceId) obj["deviceId"] = object.deviceId;
      break;

    case "addUser":
      obj["requestType"] = "addUser";
      obj["userId"] = object?.userId;
      obj["password"] = object?.password;
      obj["fireBaseId"] = object?.fireBaseId;
      obj["firstName"] = object?.firstName;
      obj["lastName"] = object?.lastName;
      obj["dob"] = object?.dob;
      obj["phone"] = object?.phone;
      obj["gender"] = object?.gender;
      obj["platforms"] = object?.platforms;
      obj["socialPlatforms"] = object?.socialPlatforms;
      obj["receiveNews"] = object.receiveNews;
      obj["passCode"] = object?.passCode;
      obj["originCountry"] = object?.originCountry;
      obj["country"] = object?.country;
      obj["language"] = userLanguage;

      break;

    case "addAddress":
      obj["requestType"] = "addAddress";
      obj["userId"] = object.userId;
      obj["fullName"] = object.fullName;
      obj["addressOne"] = object.addressOne;
      obj["addressTwo"] = object.addressTwo;
      obj["contact"] = object.contact;
      obj["country"] = object.country;
      obj["state"] = object.state;
      obj["city"] = object.city;
      obj["zipCode"] = object.zipCode;

      break;

    case "updateAddress":
      obj["requestType"] = "updateAddress";
      obj["fullName"] = object.fullName;
      obj["addressOne"] = object.addressOne;
      obj["addressTwo"] = object.addressTwo;
      obj["country"] = object.country;
      obj["zipCode"] = object.zipCode;
      obj["id"] = object.id;

      break;

    case "deleteAddress":
      obj["requestType"] = "deleteAddress";
      obj["userId"] = object.userId;
      obj["id"] = object.id;

      break;

    case "getUser":
      obj["requestType"] = "getUser";
      obj["userId"] = object.userId;
      // obj['source'] = object.source ? object.source : 'crm'

      break;

    case "updateUserProfile":
      obj["requestType"] = "updateUserProfile";
      obj["userId"] = object.userId;
      obj["firstName"] = object.firstName;
      obj["lastName"] = object.lastName;
      obj["language"] = object.language;
      obj["originCountry"] = object.originCountry;
      obj["contact"] = object.contact;

      break;

    case "getUserCards":
      obj["requestType"] = "getUserCards";
      obj["userId"] = object.userId;

      break;

    case "getUserCardsEnc":
      obj["requestType"] = "getUserCardsEnc";
      obj["userId"] = object.userId;

      break;

    case "addUserCard":
      obj["requestType"] = "addUserCard";
      obj["userId"] = object.userId;
      obj["stripeToken"] = object.stripeToken;

      break;

    case "unassignDevice":
      obj["requestType"] = "unassignDevice";
      obj["userId"] = object.user_id;
      obj["deviceId"] = object.device_id;

      break;

    case "getPlatformPackages":
      obj["requestType"] = "getPlatformPackages";
      obj["source"] = object.source;

      break;

    case "addPlatformPackage":
      obj["requestType"] = "addPlatformPackage";
      obj["packageId"] = object.packageId;
      obj["source"] = "crm";
      break;

    case "addPlanMapping":
      obj["requestType"] = "addPlanMapping";
      obj["planCode"] = object.planCode;
      obj["packageId"] = object.packageId;
      obj["source"] = "crm";
      break;

    case "getPlansMapping":
      obj["requestType"] = "getPlansMapping";
      obj["source"] = object.source;
      break;

    case "planCountries":
      obj["requestType"] = "planCountries";
      obj["planCode"] = object.planCode ? object.planCode : "YSSEAULD1FN";

      break;

    case "planCountriesList":
      obj["requestType"] = "planCountriesList";
      obj["planCode"] = object.planCode ? object.planCode : "YSSEAULD1FN";

      break;

    case "getLocalPlan":
      obj["requestType"] = "getLocalPlan";
      obj["planCode"] = object.planCode;

      break;

    case "invoiceUsers":
      obj["requestType"] = "invoiceUsers";
      url = "/invoice/api/invoice";

      break;

    case "newInvoice":
      obj["requestType"] = "newInvoice";
      obj["userId"] = object.userId; // "nadinewangzy@gmail.com"
      url = "/invoice/api/invoice";

      break;

    case "chargeCustomer":
      obj["requestType"] = "chargeCustomer";
      obj["userId"] = object.userId;
      obj["charges"] = object.charges;
      obj["currency"] = object.currency;
      url = "/invoice/api/apidispatcher";

      break;

    case "getDevicePlans":
      obj["requestType"] = "getDevicePlans";
      obj["source"] = "crm";
      obj["userId"] = object.user_id;
      obj["deviceId"] = object.device_id;
      if (object.deviceType) {
        if (object.deviceType.toUpperCase() == "S") {
          obj["deviceType"] = "S";
        } else if (object.deviceType.toUpperCase() == "R") {
          obj["deviceType"] = "R";
        } else {
          obj["deviceType"] = "D";
        }
      } else {
        obj["deviceType"] = "D";
      }
      // obj['deviceType'] = object.device_type
      break;

    case "getSubPlans":
      obj["requestType"] = "getSubPlans";
      obj["userId"] = object.user_id;
      obj["deviceId"] = object.device_id;

      break;

    case "addSimPlan":
      obj["requestType"] = "addSimPlan";
      obj = { ...obj, ...object };

      break;

    case "addPlan":
      obj["requestType"] = "addPlan";
      obj = { ...obj, ...object };

      // obj['requestSource'] = 'crm'
      // obj['orderId'] = object.order_id
      // obj['user_id'] = object.user_id
      // obj['device_id'] = object.device_id
      // obj['startDate'] = object.startDate
      // obj['endDate'] = object.endDate
      // obj['travelingTo'] = object.travelingTo
      // obj['plan_code'] = object.plan_code
      // obj['card_id'] = object.card_id
      // obj['flow_type'] = object.flow_type
      // obj['token_id'] = object.token_id
      // obj['3dtoken_id'] = object['3dtoken_id']
      // obj['promoCode'] = object.promo_code

      // if (req.body.hasOwnProperty("extendTrip")) {
      //   plan.extendTrip = req.body.extendTrip
      // }
      // if (req.body.supCharges) {
      //   plan.supCharges = true
      // }
      // if (req.body.supNotification) {
      //   plan.supNotification = true
      // }

      url = "/jane2/api/addplan";

      break;

    case "getPickupLocations":
      obj["requestType"] = "getPickupLocations";
      // obj['userId'] = object?.userId || ''
      // obj['countryCode'] = object.countryCode
      obj["cityId"] = object.cityId;
      obj["simEnabled"] = object.simEnabled;
      obj["allLocations"] = true;
      obj["language"] = localLanguage?.toUpperCase() === "JP" ? "JA" : "EN";

      break;

    case "getStates":
      obj["requestType"] = "getStates";
      obj["source"] = "crm";
      obj["userId"] = object.userId;
      obj["countryCode"] = object.countryCode;

      break;

    case "getCities":
      obj["requestType"] = "getCities";
      obj["source"] = "crm";
      obj["userId"] = object.userId;
      obj["countryCode"] = object.countryCode;
      obj["stateCode"] = object.stateCode;

      break;

    case "getAreaCodes":
      obj["requestType"] = "getAreaCodes";
      obj["source"] = "crm";
      obj["userId"] = object.userId;
      obj["cityId"] = object.cityId;

      break;

    case "isDeviceAssigned":
      obj["requestType"] = "isDeviceAssigned";
      obj["source"] = object.source;
      obj["deviceId"] = object.deviceId;

      break;

    case "getTopPriorityPlans":
      // const priorityLanguage = sessionStorage.getItem('i18next');
      obj["requestType"] = "getTopPriorityPlans";
      obj["origin"] = object.origin;
      obj["language"] =
        apiLanguage?.toUpperCase() === "JP" ? "JA" : apiLanguage;
      // obj['language'] = localLanguage?.toUpperCase() === 'JP' ? "JA" : "EN"
      // obj['userId'] = object.userId

      break;

    case "localPlans":
      // const localLanguage = sessionStorage.getItem('i18next');

      obj["requestType"] = "localPlans";
      // obj['source'] = object.source
      obj["origin"] = object.origin;
      obj["userId"] = object.userId;
      obj["travelingTo"] = object.travelingTo;
      if (object.deviceType) {
        obj["deviceType"] = object.deviceType === "S" ? "E" : object.deviceType;
      }
      if (object.promoCode) {
        obj["promoCode"] = object.promoCode; // optional
      }
      // obj['language'] = localLanguage?.toUpperCase() === 'JP' ? "JA" : "EN"
      obj["language"] =
        apiLanguage?.toUpperCase() === "JP" ? "JA" : apiLanguage;
      break;

    case "getPromoDetail":
      obj["requestType"] = "getPromoDetail";
      obj["promoCode"] = object.promoCode;

      break;

    case "getPromoType":
      obj["requestType"] = "getPromoType";
      obj["promoCode"] = object.promoCode;

      break;

    case "updatePromoCode":
      obj["requestType"] = "updatePromoCode";
      obj["userId"] = object.userId;
      obj["deviceId"] = object.deviceId;
      obj["planCode"] = object.promoCode;
      obj["promoCode"] = object.promoCode;

      break;

    case "charge":
      obj["requestType"] = "chargeCustomer";
      obj["userId"] = object.userId;
      obj["orderId"] = object.orderId;
      obj["currency"] = object.currency;
      obj["planCode"] = object.planCode;
      obj["reason"] = object.reason;
      obj["approval"] = object.approval;
      obj["charges"] = object.amount;

      break;

    case "refund":
      obj["requestType"] = "refundCustomer";
      obj["userId"] = object.userId;
      obj["orderId"] = object.orderId;
      obj["currency"] = object.currency;
      obj["planCode"] = object.planCode;
      obj["reason"] = object.reason;
      obj["approval"] = object.approval;
      obj["amount"] = object.amount;

      break;

    case "getPartnerPlan":
      obj["requestType"] = "getPartnerPlan";
      obj["source"] = object.source;
      obj["partnerId"] = object.partnerId;

      break;

    case "getShippingRate":
      // const localLang = sessionStorage.getItem('i18next');

      obj["requestType"] = "getShippingRate";
      obj["source"] = "crm";
      obj["userId"] = object?.userId || "";
      obj["countryCode"] = object.countryCode;
      obj["language"] =
        apiLanguage?.toUpperCase() === "JP" ? "JA" : apiLanguage;
      // obj['language'] = localLanguage?.toUpperCase() === 'JP' ? "JA" : "EN"

      break;

    case "getOriginCountries":
      obj["requestType"] = "getOriginCountries";
      obj["source"] = "crm";
      obj["userId"] = object.userId;
      obj["countryCode"] = object.countryCode;

      break;

    case "cancelPlan":
      obj["requestType"] = "cancelPlan";
      obj["source"] = "crm";
      obj["userId"] = object.user_id;
      obj["deviceId"] = object.device_id;
      obj["planCode"] = object.planCode;
      obj["returnDevice"] = 0;
      if (object.hasOwnProperty("swapDevice")) {
        obj["returnDevice"] = 1;
      }
      break;

    case "endSubscription":
      obj["requestType"] = "endSubscription";
      obj["source"] = "crm";
      obj["userId"] = object.userId;
      obj["deviceId"] = object.deviceId;
      obj["planCode"] = object.planCode;
      obj["cloudOrderId"] = object.cloudOrderId;

      break;

    case "getDevices":
      url = "/jane2/api/getdevices";
      obj["userId"] = object.userId;
      break;

    case "getDeviceCharges":
      obj["requestType"] = "getDeviceCharges";
      obj["source"] = "crm";
      obj["userId"] = object.userId;
      obj["country"] = object.country;

      break;

    case "getPartnerLocations":
      obj["requestType"] = "getPartnerLocations";
      obj["source"] = "crm";
      obj["userId"] = object.userId;

      break;

    case "validatePromoCountry":
      obj["requestType"] = "validatePromoCountry";
      // obj['source'] = 'crm'
      obj["countryList"] = object.countryList;
      obj["promoCode"] = object.promoCode;
      break;

    case "rent-device":
    case "rent":
      obj["requestType"] = "rent-device";
      obj["language"] = localLanguage;
      obj = { ...obj, ...object };
      break;

    case "buy-device":
    case "buy":
      obj["requestType"] = "buy-device";
      obj["language"] = localLanguage;
      obj = { ...obj, ...object };
      break;

    case "buy-sim":
      obj["requestType"] = "buy-sim";
      obj["language"] = localLanguage;
      obj = { ...obj, ...object };
      break;

    case "buy-esim":
      obj["requestType"] = "buy-esim";
      obj["language"] = localLanguage;
      obj = { ...obj, ...object };
      break;

    case "getPlanVariations":
      obj["requestType"] = "getPlanVariations";
      obj["planCode"] = object.planCode;
      if (object.productType) {
        obj["productType"] = object.productType;
      }
      break;

    case "getPaymentStatus":
      obj["requestType"] = "getPaymentStatus";
      obj["invoiceNo"] = object.invoiceNo;
      obj["currency"] = object.currency;

      break;

    case "contactUs":
      obj["requestType"] = "contactUs";
      obj["firstName"] = object.name;
      obj["phone"] = object.phone;
      obj["userId"] = object.email;
      obj["subject"] = object.subject;
      obj["text"] = object.text;
      obj["originCountry"] = object.originCountryName;
      obj["originCountryCode"] = object.originCountryCode;

      break;

    case "activateEsim":
      obj["requestType"] = "activateEsim";
      obj["orderId"] = object.orderId;
      obj["userId"] = object.userId;
      obj["appUserId"] = object.appUserId;

      break;

    case "getUserOrders":
      obj["requestType"] = "getUserOrders";
      obj["phone"] = object.phone;
      obj["userId"] = object.userId;
      obj["appUserId"] = object.appUserId;

      break;
  }

  // Don't override language for updateUserProfile and getUser - use the provided language
  // For getUser, we don't want to send stale sessionStorage language
  if (type !== "updateUserProfile" && type !== "getUser") {
    if (!obj.language || obj.language !== "JA") {
      obj["language"] = localLanguage;
    }
  }

  obj["source"] = webSource || APP_SOURCE;
  obj["platform"] = "web";
  obj = clean(obj);
  let appUserId = object?.appUserId || store.getState().auth?.user?.appUserId;
  if (appUserId) {
    obj["appUserId"] = appUserId;
  }
  // if (obj.requestType === 'get3DSPaymentToken') {
  //     obj.platform = 'app'
  // }
  // obj['appUserId'] = object?.appUserId || store.getState().auth?.user?.appUserId

  console.log(`${hostServices.remote + url}`);
  console.log(`${type?.toUpperCase()} OBJECT`, obj);

  // verifyAndLogin/addUser return a bearer token; attach it to every request
  // after login so the backend can authenticate the caller.
  const headers = { "Content-Type": "application/json" };
  const authToken = store.getState().auth?.auth?.token;
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }
  const requestOptions = {
    method: "POST",
    headers,
    body: JSON.stringify(obj),
  };

  return fetch(hostServices.remote + url, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.log("EXCEPTION FROM SIR IMRAN SIDE: " + error);
    });

  // return fetch(`${obj['requestType'] !== "get3DSPaymentToken" && obj['requestType'] !== "getPaymentStatus"
  //     ? hostServices.remote
  //     : 'https://staging.yoowifi.com'}${url}`,
  //     requestOptions, requestOptions)
  //     .then((response) => response.json())
  //     .catch((error) => {
  //         console.log("EXCEPTION FROM SIR IMRAN SIDE: " + error);
  //     });
}

function clean(obj) {
  for (var key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      // || obj[key].length === 0
      delete obj[key];
    }
  }
  return obj;
}
