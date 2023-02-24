import React from "react";
import { getIconCode, getImgUrl } from "../utils/helpers";
import { ICONS_DESCRIP_MAP } from "../utils/iconMap";
import Compass from "./svgIcons/Compass";

export default function CurrentWeather({ currentWeather }) {
  const feelsLike =
    (currentWeather.current.maxFeelsLike +
      currentWeather.current.minFeelsLike) /
    2;

  const iconCode = getIconCode(
    currentWeather.current.sunRise,
    currentWeather.current.sunSet,
    currentWeather.timezone,
    currentWeather.current.icon
  );

  const iconDescription = ICONS_DESCRIP_MAP.get(currentWeather.current.icon);

  const iconUrl = getImgUrl(`../assets/${iconCode}-fill.svg`);
  return (
    <section className="mt-5 flex flex-col items-center gap-3">
      <h1 className="text-4xl">
        {currentWeather.place}
        {currentWeather.state ? ", " : ""}
        {currentWeather.state}
        {currentWeather.country ? ", " : ""}
        {currentWeather.country}
      </h1>
      <div className="flex gap-x-5">
        <div className="flex gap-5">
          <img className="h-20 w-20" src={iconUrl} alt="Current Weather Icon" />
          <p className="text-[5.5rem] font-light leading-none">
            {currentWeather.current.currentTemp}&deg;
          </p>
        </div>
        <div className="mt-3 flex flex-col">
          <button className="text-3xl font-semibold">C</button>
          <button className="text-2xl ">F</button>
        </div>
      </div>
      <p className="text-3xl">{iconDescription}</p>
      <div className="flex max-w-xs flex-wrap justify-center gap-x-5">
        <p className="text-xl">Feels Like: {Math.round(feelsLike)}&deg;</p>
        <p className="text-xl">
          Visibility: {Math.round(currentWeather.current.visibility / 1000)} km
        </p>
        <div className="flex items-center gap-2">
          <p className="mr-2 text-xl">Wind:</p>
          <Compass
            className="h-8 w-8"
            amount={currentWeather.current.currentWindDirection}
          />
          <p className="text-xl">
            {Math.round(currentWeather.current.currentWindSpeed)}
            km/h
          </p>
        </div>
        {/* <p className="text-xl">
          Wind Direction: {currentWeather.current.currentWindDirection} &deg;
        </p> */}
      </div>
    </section>
  );
}
