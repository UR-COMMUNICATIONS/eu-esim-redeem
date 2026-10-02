import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MyAccount from "@/components/shared/others/MyAccount";
import { BackArrowIcon } from "@/services";

function AddNewData() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className=" lg:py-10 flex gap-8 sec_common_user_80">
      <MyAccount />

      <div className="flex-1 bg-[#FAFAFA] rounded-[8px] pt-6 px-4 animate-fadeIn">
        <div className="cursor-pointer" onClick={() => navigate(-1)}>
          <h1 className="flex items-center gap-3 text-[24px] text-[#191919] mb-4 font-bold px-3 border-b border-[#E0E0E0] pb-4">
            <BackArrowIcon className="w-6 h-6" color="black" strokeWidth={1} />
            {t("buttonText.addNew")}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default AddNewData;
