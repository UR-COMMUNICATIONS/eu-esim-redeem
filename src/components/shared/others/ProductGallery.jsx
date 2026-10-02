import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Gallery, Item } from "react-photoswipe-gallery";

function ProductGallery({ items = [] }) {
  const [activeItem, setActiveItem] = useState(items[0]);
  const gallery = [...items]?.slice(1, 5);
  const { t } = useTranslation();
  return (
    <div className="">
      <Gallery>
        <div className="flex flex-col gap-4">
          <Item
            original={activeItem?.url}
            width="620"
            height="460"
            content={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    width: "80%",
                    height: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={activeItem?.url}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                    alt="Thumbnail"
                    loading="lazy"
                    title="thumbnail"
                  />
                </div>
                {activeItem.note ? (
                  <p
                    style={{
                      marginTop: "20px",
                      fontSize: "15px",
                      color: "white",
                      textAlign: "center",
                      maxWidth: "100%",
                      wordWrap: "break-word",
                      lineHeight: "1.5",
                      fontFamily: "DMSans, sans-serif",
                    }}
                  >
                    {/* {activeItem.note} */}
                    {t(`pocketWifi.product.note`)}
                  </p>
                ) : null}
              </div>
            }
          >
            {({ ref, open }) => (
              <div
                ref={ref}
                onClick={open}
                className="w-full md:w-[400px] lg:w-[500px] h-[328px]  sm:h-[420px] lg:h-[532px] bg-neutral-rgb rounded-[20px] flex items-center justify-center cursor-zoom-in"
              >
                <img
                  src={activeItem?.url}
                  alt="thumbnail"
                  loading="lazy"
                  title="thumbnail"
                  className="w-full h-full object-contain rounded-[20px]"
                />
              </div>
            )}
          </Item>

          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {gallery.map((item, index) => (
              <div
                key={index}
                className="w-full aspect-square bg-neutral-100c rounded-lg flex items-center justify-center border border-neutral-500 cursor-pointer px-2 bg-[rgba(207,207,207,0.20)]"
                onClick={() => setActiveItem(item)}
              >
                <img
                  src={item?.url}
                  alt="icon"
                  loading="lazy"
                  title="icon"
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
            {items?.length > 5 && (
              <Item
                original={items[4]?.url}
                width="620"
                height="460"
                content={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "80%",
                        height: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={items[4]?.url}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          borderRadius: "8px",
                        }}
                        alt="Thumbnail"
                        loading="lazy"
                        title="thumbnail"
                      />
                    </div>
                    {items[4]?.note && (
                      <p
                        style={{
                          marginTop: "20px",
                          fontSize: "15px",
                          color: "white",
                          textAlign: "center",
                          maxWidth: "100%",
                          wordWrap: "break-word",
                          lineHeight: "1.5",
                          fontFamily: "DMSans, sans-serif",
                        }}
                      >
                        {/* {items[4].note} */}
                        {t(`pocketWifi.product.note`)}
                      </p>
                    )}
                  </div>
                }
              >
                {({ ref, open }) => (
                  <div
                    className="w-full aspect-square bg-neutral-100c flex items-center justify-center border border-neutral-200 rounded-lg cursor-pointer text-xxs sm:text-xs md:text-base p-0.5"
                    ref={ref}
                    onClick={open}
                  >
                    +{items?.length - 4} {t("extraText.more")}
                  </div>
                )}
              </Item>
            )}
          </div>
        </div>

        {items?.map((item, index) => (
          <Item
            key={index}
            original={item.url}
            width="620"
            height="460"
            content={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    width: "80%",
                    height: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={item.url}
                    alt="Thumbnail"
                    loading="lazy"
                    title="thumbnail"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                {item.note ? (
                  <p
                    style={{
                      marginTop: "20px",
                      fontSize: "15px",
                      color: "white",
                      textAlign: "center",
                      maxWidth: "100%",
                      wordWrap: "break-word",
                      lineHeight: "1.5",
                      fontFamily: "DMSans, sans-serif",
                    }}
                  >
                    {/* {item.note} */}
                    {t(`pocketWifi.product.note`)}
                  </p>
                ) : null}
              </div>
            }
          >
            {({ ref }) => <div ref={ref}></div>}
          </Item>
        ))}
      </Gallery>
    </div>
  );
}

export default ProductGallery;
