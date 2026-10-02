import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ErrorIcon, PlusIcon, SuccessIcon } from "@/services";
import {
  removeUserLocation,
  setAddressData,
  setUserData,
  setUserLocation,
} from "@/store/module/auth/slice";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import UserLocationCard from "../cards/UserLocationCard";
import { useTranslation } from "react-i18next";
import { apidispatcher, useDisApi } from "@/general";
import { setCartData } from "@/store/module/cart/cartSlice";
import { PhoneInput } from "react-international-phone";
import Loader from "../Loader";
import CustomDropdown from "../CustomDropdown";

const defaultAddress = {
  id: null,
  fullName: "",
  addressOne: "",
  addressTwo: "",
  country: "",
  zipCode: "",
  contact: {
    code: "",
    number: "",
  },
  city: "",
  state: "",
  checkIndate: "",
  roomNumber: "",
  type: "",
  default: false,
};

function DeliveryAddress({
  // handleSelect = () => { },
  selectedItem = {},
  ...props
}) {
  const { user, userLocations, addressCountry } = useSelector(
    (state) => state.auth,
  );
  const { cart } = useSelector((state) => state.cart);
  // const { phoneNumber } = user
  // const codeNumber = phoneNumber?.split('-')
  const [isAddressNotAdded, setIsAddressNotAdded] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [process, setProcess] = useState({
    title: "",
    alertMessage: "",
    alertType: "",
    isProcessing: false,
    isSuccess: false,
  });
  // const [address, setAddress] = useState({ ...defaultAddress, contact: { code: codeNumber[0], number: codeNumber[1] } })
  const [address, setAddress] = useState(defaultAddress);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const adsRef = useRef();

  const handleContinue = () => {
    setProcess({
      ...process,
      isProcessing: false,
      isSuccess: false,
      title: "",
      alertType: "",
      alertMessage: "",
    });
  };

  const getUser = useDisApi({
    apiCall: "getUser",
    setCallBack: (res) => {
      if (res?.user) {
        dispatch(setUserData(res?.user));
      }
    },
  });

  const addAddress = useDisApi({
    apiCall: "addAddress",
    setCallBack: (res) => {
      if (res?.status?.result) {
        getUser({ userId: user.userId });
        setProcess({
          ...process,
          isProcessing: false,
          isSuccess: true,
          title: t("process.success"),
          alertType: "success",
          // alertMessage: res?.status?.message,
          alertMessage: t("process.addeddAddress"),
        });
        setIsAddressNotAdded(true);
        setAddress(defaultAddress);
      } else {
        setProcess({
          ...process,
          isProcessing: false,
          isSuccess: true,
          title: t("process.failed"),
          alertType: "error",
          // alertMessage: res?.status?.message,
          alertMessage: t("process.FailedAddress"),
        });
      }
    },
  });

  const deleteAddress = useDisApi({
    apiCall: "deleteAddress",
    setCallBack: (res) => {
      // if (res?.status?.result) {
      //   let mutatedAdressess = [...user.address]
      //   console.log('before adressess', adressess);
      //   let index = mutatedAdressess.findIndex(ads => ads.id == item.id)
      //   console.log('index', index);
      //   mutatedAdressess.splice(index, 1)
      //   console.log('after adressess', mutatedAdressess);
      //   dispatch(setUserData({
      //     ...user,
      //     address: [...mutatedAdressess]
      //   }))
      // }
      if (res?.status?.result) {
        getUser({ userId: user.userId });
        setProcess({
          ...process,
          isProcessing: false,
          isSuccess: true,
          title: t("process.success"),
          alertType: "success",
          // alertMessage: res?.status?.message,
          alertMessage: t("process.deletedAddress"),
        });
      } else {
        setProcess({
          ...process,
          isProcessing: false,
          isSuccess: true,
          title: t("process.failed"),
          alertType: "error",
          alertMessage: res?.status?.message,
        });
      }
    },
  });

  const handleSelect = (event, selectedItem, action) => {
    event.stopPropagation();
    if (action === "remove") {
      setProcess({ ...process, isProcessing: true, isSuccess: true });
      dispatch(setCartData({ shippingAddress: null }));
      adsRef.current = selectedItem.id;
      deleteAddress({ userId: user.userId, id: selectedItem.id });
    } else {
      dispatch(setCartData({ shippingAddress: selectedItem }));
      setIsAddressNotAdded(true);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "contact") {
      setAddress({
        ...address,
        contact: {
          code: "+" + value?.country?.dialCode || "",
          number: value.number,
        },
      });
    } else {
      setAddress({ ...address, [name]: value });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!address.fullName.trim()) errors.fullName = t("formErrors.fullName");
    if (!address.contact.number?.trim()?.length)
      errors.phone = t("formErrors.phone");
    if (!address.country) errors.country = t("formErrors.country");
    // if (!address.city) errors.state = "State selection is required.";
    if (activeTab === "home" && !address.addressOne.trim())
      errors.addressOne = t("formErrors.addressOne");
    if (activeTab === "home" && !address.addressTwo.trim())
      errors.addressTwo = t("formErrors.addressTwo");
    // if (!address.state.trim()) errors.province = "Province is required.";
    if (!address.zipCode.trim()) errors.zipCode = t("formErrors.zipCode");

    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors).join("\n");
      alert(errorMessages);
      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    setProcess({ ...process, isProcessing: true, isSuccess: true });
    const { contact, country, city } = address;
    let request = {
      ...address,
      userId: user?.userId,
      contact:
        contact.code + "-" + contact.number.substring(contact.code.length),
      country: country,
      city: city.name,
    };
    addAddress(request);
  };

  const handleAddressForm = () => {
    dispatch(setCartData({ shippingAddress: null }));
    setIsAddressNotAdded(false);
  };

  useEffect(() => {
    getUser({ userId: user.userId });
  }, []);

  return (
    <div className="">
      <h2 className="text-base sm:text-lg ">
        {t("extraText.deliveryAddress")}
      </h2>
      <div
        className={cn(
          "flex flex-col gap-6",
          userLocations?.length > 0 ? "mt-6" : "",
        )}
      >
        {user?.address?.map((item, index) => (
          <UserLocationCard
            {...props}
            wrapperClass={
              selectedItem?.id === item?.id
                ? "border-main-600"
                : "border-neutral-400"
            }
            handleSelect={handleSelect}
            key={index}
            item={item}
          />
        ))}
      </div>
      {!isAddressNotAdded && (
        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col px-4 sm:px-5 md:px-6 py-5 sm:py-6 md:py-8 border border-main-600 rounded-xl gap-6 mt-6"
        >
          <div className="">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black-900">
              {t("extraText.addAddress")}
            </h3>
            <div className="w-full flex gap-4 mt-5 mb-4 sm:mb-8 md:mb-12">
              <Button
                className="w-full sm:max-w-[200px] text-sm font-semibold hover:bg-secondary-500 hover:text-black-900"
                type="button"
                variant={activeTab === "home" ? "secondary" : "outline"}
                onClick={() => setActiveTab("home")}
              >
                {t("buttonText.homeorAddress")}
              </Button>
              <Button
                className="w-full sm:max-w-[200px] text-sm font-semibold hover:bg-secondary-500 hover:text-black-900"
                type="button"
                variant={activeTab === "hotel" ? "secondary" : "outline"}
                onClick={() => setActiveTab("hotel")}
              >
                {t("buttonText.hotel")}
              </Button>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black-900">
              {t("extraText.addressDetails")}
            </h3>
            <div className="flex flex-col gap-2 sm:gap-4 mt-2 sm:mt-6 md:mt-8">
              <Input
                type="text"
                label={t("form.fullName")}
                placeholder={t("form.enterNameHere")}
                name="fullName"
                value={address.fullName}
                onChange={handleChange}
                required
              />
              <div className="flex flex-col gap-2">
                <span className="label">{t("form.phoneNumber")}</span>
                <PhoneInput
                  placeholder={t("form.phoneNumber")}
                  defaultCountry={cart?.userCountry?.country?.toLowerCase()}
                  value={address.contact.number}
                  className={cn(
                    "text-sm md:text-base !mt-0 font-normal !leading-normal w-full bg-white",
                  )}
                  onChange={(value, obj) =>
                    handleChange({
                      target: {
                        name: "contact",
                        value: { number: value, country: obj.country },
                      },
                    })
                  }
                  style={{
                    "--react-international-phone-flag-background-color":
                      "transparent rounded-[20px]",
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="label">{t("form.country")}</span>
                <CustomDropdown
                  defaultValue={addressCountry}
                  onChange={(countryObj) => {
                    addressCountry;
                    dispatch(setAddressData(countryObj));
                    handleChange({
                      target: {
                        name: "country",
                        value: countryObj?.countryCode,
                      },
                    });
                  }}
                />
              </div>
              {/* <div className="flex flex-col gap-2">
                <span className="label">{t("form.state")}</span>
                <StateSelect
                  name="country"
                  countryid={address.country?.id}
                  defaultValue={address.city}
                  onChange={(value) =>
                    handleChange({ target: { name: "city", value: value } })
                  }
                  containerClassName="country-select bg-neutral-50"
                  inputClassName="!border-none !outline-none bg-transparent"
                  placeHolder={t("form.selectState")}
                />
              </div> */}

              {/* ///////////////////////////////input State/////////////////////////////////////////////// */}

              <div className="flex flex-col gap-2">
                <span className="label">{t("form.state")}</span>
                <Input
                  type="text"
                  name="city"
                  value={address.city || ""}
                  onChange={handleChange}
                  placeholder={t("form.selectState")}
                />
              </div>

              {activeTab === "home" && (
                <>
                  <Input
                    label={t("form.address")}
                    placeholder={t("form.enterFullAddress")}
                    name="addressOne"
                    value={address.addressOne}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label={t("form.apartment")}
                    placeholder={t("form.enterApartmentDetails")}
                    name="addressTwo"
                    value={address.addressTwo}
                    onChange={handleChange}
                    required
                  />
                </>
              )}
              <Input
                label={t("form.province")}
                placeholder={t("form.enterProvince")}
                name="state"
                value={address.state}
                onChange={handleChange}
              />
              <Input
                type="number"
                label={t("form.postalCode")}
                placeholder={t("form.enterPostalCode")}
                name="zipCode"
                value={address.zipCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4 sm:mt-8 md:mt-12 flex justify-end">
              <Button type="submit">{t("buttonText.saveAddress")}</Button>
            </div>
          </div>
        </form>
      )}
      {isAddressNotAdded && (
        <button
          type="button"
          className="flex items-center gap-2 text-base font-semibold text-main-600 mt-6"
          onClick={handleAddressForm}
        >
          <PlusIcon color="#D81F22" />
          <span>{t("extraText.addNewAddress")}</span>
        </button>
      )}
      <Dialog open={process.isSuccess} onOpenChange={handleContinue}>
        <DialogContent
          showCloseIcon={true}
          className="w-[calc(100vw-32px)] max-w-[540px] h-auto min-h-[286px] sm:min-h-[438px] rounded-xl md:rounded-3xl flex flex_center flex-col px-4 md:px-8 lg:px-[60px] pt-10 md:pt-[60px] pb-6 md:pb-[60px] gap-6 md:gap-12 bg-main-50"
        >
          {process.isProcessing ? (
            <div className="flex flex-col gap-6 items-center justify-center h-full w-full">
              <Loader
                type="Oval"
                color="white"
                height={"18vw"}
                width={"18vw"}
                className="max-h-[100px] max-w-[100px] min-h-[60px] min-w-[60px]"
                wrapperStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
              <div className="text-center flex flex-col gap-3 sm:gap-4">
                <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-700">
                  {t("process.processing")}
                </DialogTitle>
                <p className="text-base text-black-700">
                  {t("process.processMessage")}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-center">
                {process.alertType === "success" ? (
                  <SuccessIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />
                ) : (
                  <ErrorIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />
                )}
              </div>
              <div className="text-center flex flex-col gap-3 sm:gap-4">
                <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-700">
                  {process.title}
                </DialogTitle>
                <p className="text-base text-black-700">
                  {process.alertMessage}
                </p>
              </div>
              <DialogClose
                onClick={handleContinue}
                className="px-10 py-4 bg-main-600 text-white rounded-xl max-w-max mx-auto outline-none border-none"
              >
                {t("orderSummary.continue")}
              </DialogClose>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DeliveryAddress;
