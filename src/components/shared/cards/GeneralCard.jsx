import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "@/services";
import { Trans, useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

const GeneralCard = ({
  value,
  title,
  description,
  buttonText = "View Locations",
  stepsButton,
  onClick = () => {},
  className = "",
  isShowButton = true,
  bullet,
}) => {
  const location = useLocation();

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = (value) => {
    if (value === "si") {
      window.open(
        "https://www.singpost.com/locate-us",
        "_blank",
        "noopener,noreferrer",
      );
    } else if (value == "pi") {
      const isPickDropPage = location?.pathname.endsWith("/pick-drop-location");
      if (isPickDropPage) {
        navigate(`${location.pathname}#view-location`);
      } else {
        navigate(`/pick-drop-location#view-location`);
      }
    }
  };
  return (
    <div
      className={cn(
        "p-6 sm:pl-8 md:pl-10 rounded-2xl bg-neutral-100 h-full flex flex-col justify-between gap-4",
        className,
      )}
    >
      <div>
        <h3 className="text-sm sm:text-base md:text-2xl font-bold text-black-900">
          {title}
        </h3>

        {bullet ? (
          <ul
            className={cn(
              "list-disc pl-5 text-sm sm:text-base md:text-lg text-black leading-[140%] mt-2 sm:mt-3 md:mt-4",
            )}
          >
            {description.split("\n").map((line, idx) => (
              <li key={idx}>
                <Trans
                  i18nKey={line}
                  components={{
                    b: <span className="font-semibold text-black" />,
                  }}
                />
              </li>
            ))}
          </ul>
        ) : Array.isArray(description) ? (
          <div className="mt-2 sm:mt-3 md:mt-4 space-y-4">
            {description.map((item, idx) =>
              item.type === "number" ? (
                <ol
                  key={idx}
                  className="list-decimal pl-5 text-sm sm:text-base md:text-lg text-black-600 leading-[140%] space-y-1"
                >
                  {item.points.map((point, i) => (
                    <li key={i}>
                      <Trans
                        i18nKey={point}
                        components={{
                          b: <span className="font-semibold text-black-600" />,
                        }}
                      />
                    </li>
                  ))}
                </ol>
              ) : (
                <ul
                  key={idx}
                  className="list-disc pl-5 text-sm sm:text-base md:text-lg text-black-600 leading-[140%] space-y-1 ml-6"
                >
                  {item.points.map((point, i) => (
                    <li key={i}>
                      <Trans
                        i18nKey={point}
                        components={{
                          b: <span className="font-semibold text-black-600" />,
                        }}
                      />
                    </li>
                  ))}
                </ul>
              ),
            )}
          </div>
        ) : (
          <p
            className={cn(
              "text-sm sm:text-base md:text-lg text-black-600 leading-[140%] mt-2 sm:mt-3 md:mt-4 whitespace-pre-line",
            )}
          >
            <Trans
              i18nKey={description}
              components={{
                b: <span className="font-semibold text-black-600" />,
              }}
            />
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* <Link
        to={
          pickDropPage
            ? "#view-location"
            : `/pick-drop-location#view-location`
        }
        > */}
        {isShowButton && (
          <Button
            className="p-2.5 sm:px-4 md:px-4 sm:py-3 md:py-4 rounded sm:rounded-xl !text-xs md:!text-base"
            onClick={() => handleClick(value)}
          >
            <span>{buttonText}</span>
            <ArrowUpRightIcon className="w-[14px] h-[14px] md:w-6 md:h-6" />
          </Button>
        )}
        {/* </Link> */}

        {stepsButton && (
          <Link to={stepsButton.to}>
            <Button
              variant="secondary"
              className={
                "p-2.5 py-[11px] sm:px-4 md:px-4 sm:py-[13px] md:py-4 lg:py-[17px] rounded sm:rounded-xl !text-xs md:!text-base"
              }
            >
              {t(`buttonText.viewSteps`) || stepsButton.text}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default GeneralCard;
