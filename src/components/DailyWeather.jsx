import { useRef, useEffect, useState } from "react";
import { getImgUrl } from "../utils/helpers";
import { ICONS_DESCRIP_MAP, ICONS_MAP } from "../utils/iconMap";
import LeftArrow from "./svgIcons/LeftArrow";
import RightArrow from "./svgIcons/RightArrow";
import SnowFlake from "./svgIcons/SnowFlake";
import RainDrop from "./svgIcons/RainDrop";

export default function DailyWeather({ dailyWeather, timezone, setDayIndex }) {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const carousel = useRef(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }
    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  // useEffect(() => {
  //   const handleWindowResize = () => {
  //     setWindowWidth(window.innerWidth);
  //   };

  //   window.addEventListener("resize", handleWindowResize);

  //   return () => {
  //     window.removeEventListener("resize", handleWindowResize);
  //   };
  // });

  // console.log(initialStateStyle);

  return (
    <section className="mt-2">
      <h1 className="mx-12 border-b-2 border-slate-500 pb-2 text-2xl">Daily</h1>
      <div className="mt-1 flex w-full">
        <LeftArrow
          onClick={movePrev}
          disabled={isDisabled("prev")}
          className="h-16 w-16 px-4"
        />
        <div
          className="w-full snap-x snap-mandatory overflow-hidden overflow-x-scroll scroll-smooth"
          ref={carousel}
        >
          <div className="flex">
            {dailyWeather.map((item, index) => {
              const iconCode = ICONS_MAP.get(item.icon)[0];
              const iconUrl = getImgUrl(`../assets/${iconCode}-fill.svg`);
              const iconDescription = ICONS_DESCRIP_MAP.get(item.icon);

              const time = new Date(item.timeStamp);
              const localTime = new Intl.DateTimeFormat("en-CA", {
                weekday: "short",
                month: "short",
                day: "numeric",
                timeZone: timezone,
              }).format(time);

              return (
                <div
                  key={index}
                  className={`flex min-w-[7.5rem] snap-start flex-col items-center gap-2 border-2 border-transparent  p-2 text-center hover:cursor-pointer hover:border-slate-300 `}
                  onClick={() => setDayIndex(index)}
                >
                  <p className="text-xl">{`${localTime}`}</p>
                  <img src={iconUrl} alt="Icon Code" className="h-12 w-12" />
                  <div className="flex items-baseline gap-1">
                    <p className="text-3xl">{item.highTemp}&deg;</p>
                    <p className="text-xl">{item.lowTemp}&deg;</p>
                  </div>
                  <p className="text-[1.1rem]">{iconDescription}</p>
                  <div className="mt-5 flex flex-col gap-2">
                    {item.snowSum !== 0 && (
                      <div className="flex items-center gap-1">
                        <SnowFlake
                          fill={"black"}
                          className="inline-block h-5 w-5"
                        />
                        <p className="text-xl leading-none">
                          {item.snowSum.toFixed(1)} cm
                        </p>
                      </div>
                    )}
                    {item.rainSum !== 0 && (
                      <div className="flex gap-1">
                        <RainDrop
                          fill={"black"}
                          className="inline-block h-5 w-5"
                        />
                        <p className="text-xl leading-none">
                          {item.rainSum.toFixed(1)} mm
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <RightArrow
          onClick={moveNext}
          disabled={isDisabled("next")}
          className="h-16 w-16 px-4"
        />
      </div>
    </section>
  );
}
