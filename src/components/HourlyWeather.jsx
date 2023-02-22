import { useRef, useEffect, useState } from "react";
import LeftArrow from "./svgIcons/LeftArrow";
import RightArrow from "./svgIcons/RightArrow";
import SnowFlake from "./svgIcons/SnowFlake";
import RainDrop from "./svgIcons/RainDrop";

export default function HourlyWeather() {
  const array = Array.from({ length: 10 }, (_, index) => ({
    index: index,
    icon: "☁️",
    temp: "6",
    feelsLike: "4",
    desc: "Cloudy",
    snow: index + 1,
    rain: "1",
    time: "12",
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
          className="w-full snap-x snap-mandatory overflow-hidden scroll-smooth"
          ref={carousel}
        >
          <div className="flex">
            {array.map((item) => {
              return (
                <div
                  key={item.index}
                  className="flex min-w-[7.5rem] snap-start flex-col items-center p-2"
                >
                  <p className="text-3xl">{item.icon}</p>
                  <p className="text-2xl">{item.temp}&deg;</p>
                  <p className="text-xl">Feels: {item.feelsLike}&deg;</p>
                  <p className="text-[1.1rem]">{item.desc}</p>
                  <div className="mt-5 flex flex-col gap-2">
                    {item.snow !== 0 && (
                      <div className="flex items-center gap-2">
                        <SnowFlake
                          fill={"black"}
                          className="inline-block h-5 w-5"
                        />
                        <p className="text-xl leading-none">{item.snow} cm</p>
                      </div>
                    )}
                    {item.rain !== 0 && (
                      <div className="flex gap-2">
                        <RainDrop
                          fill={"black"}
                          className="inline-block h-5 w-5"
                        />
                        <p className="text-xl leading-none">{item.rain} cm</p>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-2xl">{item.time} am</p>
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

// import { useRef } from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import LeftArrow from "./LeftArrow";
// import RightArrow from "./RightArrow";

// export default function HourlyWeather() {
// 	const array = Array.from({ length: 10 }, (_, index) => ({
// 		index: index,
// 		icon: "I",
// 		temp: "6",
// 		feelsLike: "4",
// 		desc: "Cloudy",
// 		snow: "1cm",
// 		rain: "1mm",
// 	}));

// 	const carouselRef = useRef();
// 	const containerWidth = carouselRef.current?.clientWidth;

// 	const [pos, setPos] = useState(0);
// 	const [style, setStyle] = useState({
// 		transform: `translateX(${pos}px)`,
// 	});

// 	const onBtnClick = (direction) => {
// 		if (direction === "left") {
// 			pos >= -95 ? setPos(0) : setPos((x) => x + 285);
// 		} else {
// 			pos <= -Math.abs(containerWidth * 2 - 95)
// 				? setPos(-630)
// 				: setPos((x) => x - 285);
// 		}
// 	};

// 	useEffect(() => {
// 		setStyle({ transform: `translateX(${pos}px)` });
// 	}, [pos]);

// 	return (
// 		<section>
// 			<h1 className="text-2xl px-16">Daily</h1>
// 			<div className="w-full flex mt-3">
// 				<LeftArrow
// 					onClick={() => onBtnClick("left")}
// 					className="px-4 h-16 w-16"
// 				/>
// 				<div className="overflow-hidden w-full">
// 					<div className="flex" style={style} ref={carouselRef}>
// 						{array.map((item) => {
// 							return (
// 								<div
// 									key={item.index}
// 									className="p-3 pr-12 hover:border-2 hover:cursor-pointer border-slate-300"
// 								>
// 									<p>{item.title}</p>
// 									<p>{item.icon}</p>
// 									<p>{item.temp}&deg;</p>
// 									<p>{item.desc}</p>
// 								</div>
// 							);
// 						})}
// 					</div>
// 				</div>
// 				<RightArrow
// 					onClick={() => onBtnClick("right")}
// 					className="px-4 h-16 w-16"
// 				/>
// 			</div>
// 		</section>
// 	);
// }
