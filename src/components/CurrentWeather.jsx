import React from "react";

export default function CurrentWeather() {
  return (
    <section className="flex flex-col items-center gap-3">
      <h1 className="text-2xl">Scarborough, Canada</h1>
      <div className="flex gap-x-5">
        <div className="flex gap-5">
          <p className="text-[5.5rem] font-light leading-none">☁️</p>
          <p className="text-[5.5rem] font-light leading-none">4&deg;</p>
        </div>
        <div className="mt-3 flex flex-col">
          <button className="text-3xl font-semibold">C</button>
          <button className="text-2xl ">F</button>
        </div>
      </div>
      <p className="text-3xl">Partly sunny</p>
      <div className="flex max-w-xs flex-wrap justify-center gap-x-5">
        <p>Feels Like: -1&deg;</p>
        <p>Visibility: 16 km</p>
        <p>Wind Speed: 19 km/h</p>
        <p>Wind Direction: 3 SW</p>
      </div>
    </section>
  );
}
