import LandingHeroV2 from "@/components/shared/others/LandingHeroV2";
import { Button } from "@/components/ui/button";
import useDynamicImages from "@/hooks/useDynamicImages";
import { cn } from "@/lib/utils";
import { CallMadeIcon, HandThumbUp, WifiIcon } from "@/services";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import useLocalPlan from "@/hooks/useLocalPlan";
import { filterPlans } from "@/general/common.funcitons";
import { useEffect, useState } from "react";
import InternetPackageCardLandingPage from "@/components/shared/cards/InternetPackageCardLandingPage";
import { useNavigate } from "react-router-dom";
import { commercialRoutes } from "@/services";

function ProductRouters() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const routerImg = useDynamicImages("product-routers", "router");
  const newDeviceImg = useDynamicImages("product-routers", "new-device");
  const { t } = useTranslation();
  const { packages } = useSelector((state) => state.plan);
  const { cart, userCountry } = useSelector((state) => state.cart);
  const { process, fetchPriorityPlans } = useLocalPlan();
  const [plans, setPlans] = useState([]);
  const hero = t("productRouters.hero", { returnObjects: true }) || {};
  const about = t("productRouters.about", { returnObjects: true }) || {};
  const features = t("productRouters.features", { returnObjects: true }) || [];
  const enquireButton = t("productRouters.enquireButton") || "";
  const plansSection = t("productRouters.plans", { returnObjects: true }) || {};
  const primeFeatures =
    t("productRouters.primeFeatures", { returnObjects: true }) || {};
  const steps = t("productRouters.steps", { returnObjects: true }) || {};

  // Fetch priority plans on mount when user country is available
  useEffect(() => {
    if (userCountry?.country) {
      fetchPriorityPlans();
    }
  }, [userCountry?.country]);

  // Filter packages for Router/Pocket WiFi device types
  useEffect(() => {
    const routerPlans = filterPlans(packages, ["D", "R"]);
    setPlans(routerPlans);
  }, [packages]);

  return (
    <div className="overflow-hidden w-full">
      <LandingHeroV2
        splitHero
        backgroundColor="#54A5D5"
        showAppInstall
        title={hero.title}
        subtitle={hero.subtitle}
        image={routerImg}
      />

      <section className="px-4 md:px-10 lg:px-16 py-14 md:py-20 bg-white">
        <div className="containerX flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          <div className="w-full lg:w-1/2">
            <img
              src={routerImg}
              alt="Yoowifi Router"
              className="w-full h-full min-h-[320px] md:min-h-[420px] rounded-3xl object-cover border border-neutral-200"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black-900 leading-tight">
              {about.title}
            </h2>
            <p className="mt-4 text-black-600 leading-relaxed">
              {about.description}
            </p>
            <div className="mt-8 space-y-4">
              {Array.isArray(features) &&
                features.map((feature, index) => {
                  const featureImg = useDynamicImages(
                    "product-routers",
                    feature.image,
                  );
                  console.log("featueImg", featureImg);
                  return (
                    <div className="flex items-center gap-3" key={index}>
                      <div className="w-10 h-10 rounded-full bg-main-10 flex items-center justify-center shrink-0">
                        <img
                          src={featureImg}
                          alt={feature.text}
                          className={
                            index === 1 || index === 3 ? "w-5 h-5" : "w-8 h-8"
                          }
                        />
                      </div>
                      <p className="text-black-700">{feature.text}</p>
                    </div>
                  );
                })}
            </div>
            <Button
              className="mt-8 w-fit"
              onClick={() => navigate(commercialRoutes.contact.path)}
            >
              {enquireButton}
            </Button>
          </div>
        </div>
      </section>

      {/* <section className="px-4 md:px-10 lg:px-16 py-14 md:py-20 bg-neutral-50">
        <div className="containerX">
          <h2 className="text-3xl md:text-4xl font-bold text-black-900 text-center">{plansSection.title}</h2>
          <p className="text-center text-black-600 mt-3">{plansSection.description}</p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.isArray(plans) && plans.map((plan, index) => <InternetPackageCardLandingPage key={index} data={plan} flow="PR" />)}
          </div>
          <div className="flex justify-center mt-10">
            <Button onClick={() => navigate(commercialRoutes.contact.path)}>{enquireButton}</Button>
          </div>
        </div>
      </section> */}

      <section className="px-4 md:px-10 lg:px-16 py-14 md:py-20 bg-white">
        <div className="containerX">
          <h2 className="text-3xl md:text-4xl font-bold text-black-900 text-center">
            {primeFeatures.title}
          </h2>
          <p className="text-center text-black-600 mt-3">
            {primeFeatures.description}
          </p>
        </div>
        <div className="containerX flex flex-col lg:flex-row gap-8 lg:gap-12 mt-10">
          <div className="w-full lg:w-1/2">
            <img
              src={newDeviceImg}
              alt="Prime Features"
              className="w-full h-full min-h-[360px] md:min-h-[460px] rounded-3xl object-cover border border-neutral-200"
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-4 md:gap-5">
            {Array.isArray(primeFeatures.cards) &&
              primeFeatures.cards.map((card, index) => {
                const cardImg = useDynamicImages("product-routers", card.image);
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-neutral-200 p-5 md:p-6 bg-neutral-50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-main-10 flex items-center justify-center shrink-0">
                        <img
                          src={cardImg}
                          alt={card.title}
                          className="w-5 h-5"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-black-900">
                          {card.title}
                        </h3>
                        <p className="mt-1 text-black-600">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      <section className="px-4 md:px-10 lg:px-16 py-14 md:py-20 bg-neutral-50">
        <div className="containerX">
          <h2 className="text-3xl md:text-4xl font-bold text-black-900 text-center">
            {steps.title}
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {Array.isArray(steps.items) &&
              steps.items.map((description, index) => (
                <article
                  key={index}
                  className={cn(
                    "rounded-2xl bg-white border border-neutral-200 p-6 shadow-card-secondary",
                  )}
                >
                  <div className="flex justify-center mb-1">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-neutral-200 bg-white">
                      <p className="text-main-600 text-3xl font-extrabold">
                        {index + 1}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-black-600 leading-relaxed">
                    {description}
                  </p>
                </article>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductRouters;
