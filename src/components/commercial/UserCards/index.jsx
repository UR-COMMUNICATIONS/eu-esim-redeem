import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import MyAccount from "@/components/shared/others/MyAccount";
import { commercialRoutes } from "@/services";
import { useNavigate } from "react-router-dom";
import { useOrderLogic } from "@/hooks/useOrderLogic";
import CartPaymentCard from "@/components/shared/cards/CartPaymentCard";
import { useSelector } from "react-redux";
import Loader from "@/components/shared/Loader";
import { useState, useEffect } from "react";
import { decryptData } from "@/general/encryption";
import { useDisApi } from "@/general";

const UserCards = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cards, handlePaymentCardSelect } = useOrderLogic();
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  // const [cards, setCards] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // const getUserCardsEnc = useDisApi({
  //   apiCall: "getUserCardsEnc",
  //   setCallBack: (res) => {
  //     setIsLoading(false)
  //     if (res?.status?.result) {
  //       let decCards = decryptData(res.data);
  //       if (Array.isArray(decCards)) {
  //         const filteredCards = decCards.filter(
  //           (i) => i.pgw === "2c2p" || i.pgw === "crpc",
  //         );
  //         setCards(filteredCards);
  //       }
  //     } else {
  //       setCards([]);
  //     }
  //   },
  // });

  // useEffect(() => {
  //   console.log("user", user);
  //   // setOrders(user.address);
  //   getUserCardsEnc({ userId: user?.userId });
  // }, []);

  return (
    <>
      {/* <MyAccount /> */}
      <div className="flex-1 bg-[#FAFAFA] rounded-[8px] pt-6 px-4 animate-fadeIn">
        <h1 className="text-[24px] text-[#191919] mb-4 font-bold px-3 border-b border-[#E0E0E0] pb-4">
          {t(`myAccount.myCards`)}
        </h1>
        {isLoading ? (
          <div className="flex flex-col gap-6 items-center justify-center h-full w-full">
            <Loader
              type="Oval"
              color="#f24144"
              secondaryColor="#f24144"
              height={"18vw"}
              width={"18vw"}
              className="max-h-[100px] max-w-[100px] min-h-[60px] min-w-[60px]"
              wrapperStyle={{
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </div>
        ) : cards?.length > 0 ? (
          <div className="sm:flex gap-4 mt-8 flex-wrap">
            {cards.map((item, index) => (
              <div className="mb-4 w-full sm:w-[48%]" key={index}>
                <CartPaymentCard
                  wrapperClass={
                    cart?.paymentCard?.cardId == item?.cardId
                      ? "bg-[#f24144]"
                      : ""
                  }
                  item={item}
                  onClick={() => handlePaymentCardSelect(item)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            {t(`myAccount.noCardsFound`)}
          </p>
        )}

        <div className="my-12 flex md:justify-start justify-center">
          {/* <Button
            variant="secondary"
            className="!h-11 md:!h-[52px] w-44 text-white hover:bg-[#f24144] border-[#f24144] bg-[#f24144] mt-8"
            onClick={() => navigate(commercialRoutes.addNewCards.path)}
          >
            {t("myAccount.addNewCards")}
          </Button> */}
        </div>
      </div>
    </>
  );
};

export default UserCards;
