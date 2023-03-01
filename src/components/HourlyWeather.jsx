import { useRef, useEffect, useState } from "react";
import LeftArrow from "./svgIcons/LeftArrow";
import RightArrow from "./svgIcons/RightArrow";
import SnowFlake from "./svgIcons/SnowFlake";
import RainDrop from "./svgIcons/RainDrop";
import {
  convertCMtoInch,
  convertCtoF,
  convertMMtoInch,
  getIconCode,
  getImgUrl,
} from "../utils/helpers";
import { ICONS_DESCRIP_MAP } from "../utils/iconMap";

export default function HourlyWeather({
  hourlyWeather,
  dailyWeather,
  timezone,
  dayIndex,
  imperial,
}) {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const hoursArray = [
    [0, 25],
    [25, 49],
    [49, 73],
    [73, 97],
    [97, 121],
    [121, 145],
    [145, 169],
    [169, 193],
    [193, 217],
    [217, 240],
  ];

  const localTimeNow = new Intl.DateTimeFormat("en-CA", {
    hour: "numeric",
    hour12: false,
    timeZone: timezone,
  }).format(new Date());

  let selectedHourlyWeather = null;

  if (dayIndex === 0) {
    selectedHourlyWeather = hourlyWeather.slice(
      Number(localTimeNow),
      hoursArray[0][1]
    );
  } else {
    selectedHourlyWeather = hourlyWeather.slice(
      hoursArray[dayIndex][0],
      hoursArray[dayIndex][1]
    );
  }

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
      ? carousel.current.scrollWidth
      : 0;
  }, []);

  return (
    <section className="mt-2">
      <h1 className="mx-12 border-b-2 border-slate-500 pb-2 text-2xl">
        Hourly
      </h1>
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
            {selectedHourlyWeather.map((item, index) => {
              const iconCode = getIconCode(
                dailyWeather[dayIndex].sunRise,
                dailyWeather[dayIndex].sunSet,
                timezone,
                item.icon,
                item.timeStamp
              );

              const iconDescription = ICONS_DESCRIP_MAP.get(item.icon);

              const iconUrl = getImgUrl(`./${iconCode}-fill.svg`);

              const localTimeMonth = new Intl.DateTimeFormat("en-CA", {
                month: "short",
                day: "numeric",
              }).format(new Date(item.timeStamp));

              const localTime = new Intl.DateTimeFormat("en-CA", {
                hour: "numeric",
                hour12: true,
              }).format(new Date(item.timeStamp));

              return (
                <div
                  key={index}
                  className="flex min-w-[7.5rem] snap-start flex-col items-center p-2 text-center"
                >
                  <img src={iconUrl} alt="Icon Code" className="h-10 w-10" />
                  <p className="text-2xl">
                    {imperial
                      ? Math.round(convertCtoF(item.temp))
                      : Math.round(item.temp)}
                    &deg;
                  </p>
                  <p className="text-xl">
                    Feels:{" "}
                    {imperial
                      ? Math.round(convertCtoF(item.feelsLike))
                      : Math.round(item.feelsLike)}
                    &deg;
                  </p>
                  <p className="mb-5 mt-2 text-[1.1rem]">{iconDescription}</p>
                  <div className="flex flex-col gap-2">
                    {item.snow !== 0 && (
                      <div className="flex items-center gap-2">
                        <SnowFlake
                          fill={"black"}
                          className="inline-block h-5 w-5"
                        />
                        <p className="text-xl leading-none">
                          {imperial
                            ? convertCMtoInch(item.snow).toFixed(2)
                            : item.snow.toFixed(1)}
                          {imperial ? " in" : " cm"}
                        </p>
                      </div>
                    )}
                    {item.rain !== 0 && (
                      <div className="flex gap-2">
                        <RainDrop
                          fill={"black"}
                          className="inline-block h-5 w-5"
                        />
                        <p className="text-xl leading-none">
                          {imperial
                            ? convertMMtoInch(item.rain).toFixed(2)
                            : item.rain.toFixed(1)}
                          {imperial ? " in" : " mm"}
                        </p>
                      </div>
                    )}
                  </div>
                  <p className="mt-3 text-[1.4rem] font-semibold">
                    {localTimeMonth}
                  </p>
                  <p className="mt-1 text-[1.4rem] font-semibold">
                    {localTime}
                  </p>
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
