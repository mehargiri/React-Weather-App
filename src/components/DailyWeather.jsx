import { useRef, useEffect, useState } from "react";
import LeftArrow from "./svgIcons/LeftArrow";
import RightArrow from "./svgIcons/RightArrow";

export default function DailyWeather() {
  const array = Array.from({ length: 10 }, (_, index) => ({
    index: index,
    title: `Tue ${index + 1}`,
    icon: "☁️",
    tempMax: "8",
    tempMin: "6",
    desc: "Cloudy",
  }));

  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <section className="mt-2">
      <h1 className="mx-12 border-b-2 border-slate-500 pb-2 text-2xl">Daily</h1>
      <div className="mt-1 flex w-full">
        <LeftArrow
          onClick={movePrev}
          disabled={isDisabled("prev") || windowWidth >= 1100}
          className="h-16 w-16 px-4"
        />
        <div
          className="w-full snap-x snap-mandatory overflow-hidden scroll-smooth"
          ref={carousel}
        >
          <div className="flex">
            {array.map((item) => {
              return (
                <div
                  key={item.index}
                  className="flex min-w-[7rem] snap-start flex-col items-center border-slate-300 p-2 hover:cursor-pointer hover:border-2"
                >
                  <p className="text-2xl">{item.title}</p>
                  <p className="text-3xl">{item.icon}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl">{item.tempMax}&deg;</p>
                    <p className="text-xl">{item.tempMin}&deg;</p>
                  </div>
                  <p className="text-[1.1rem]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
        <RightArrow
          onClick={moveNext}
          disabled={isDisabled("next") || windowWidth >= 1100}
          className="h-16 w-16 px-4"
        />
      </div>
    </section>
  );
}
