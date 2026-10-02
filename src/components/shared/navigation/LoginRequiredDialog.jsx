import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { WarningIcon } from "@/services";
import { useTranslation } from "react-i18next";

const DialogHeader = ({ title, text }) => {
  return (
    <div className="flex flex-col gap-1 md:gap-2">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-700 !leading-[1.4] text-center">
        {title}
      </h1>
      <p className="text-sm md:text-base !leading-[1.4] md:!leading-[1.5] text-center text-black-600">
        {text}
      </p>
    </div>
  );
};

const LoginRequiredDialog = ({ isOpen, setIsOpen, setIsAuthDialogOpen }) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent
        showCloseIcon={true}
        className={cn(
          "w-[calc(100vw-32px)] max-w-[540px] h-auto min-h-[286px] sm:min-h-[438px] rounded-xl md:rounded-3xl flex flex_center flex-col px-4 md:px-8 lg:px-[60px] pt-10 md:pt-[60px] pb-6 md:pb-[60px] gap-6 md:gap-12 bg-main-50"
        )}
      >
        <DialogTitle className={"hidden"} />

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center">
            <WarningIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />
          </div>
          <DialogHeader title={t(`login.title`)} text={t(`login.text`)} />
          <div className="flex_center">
            <Button
              onClick={() => {
                setIsOpen(false);
                setIsAuthDialogOpen(true);
              }}
            >
              {t(`buttonText.login`)}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginRequiredDialog;
