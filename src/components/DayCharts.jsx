import CircleBar from "./svgIcons/CircleBar";
import ThermoMeter from "./svgIcons/Thermometer";
import Compass from "./svgIcons/Compass";
import CircleCompass from "./svgIcons/CircleCompass";

export default function DayCharts({ dayIndex, dailyWeather }) {
  return (
    <section className="mx-12 mt-5 flex flex-wrap justify-between gap-5 border-t-2 border-slate-500 xsm:flex-col xsm:items-center sm:w-full">
      <div className="mt-5">
        <p className="mb-3 text-center text-2xl">Humidity</p>
        <CircleBar percent={dailyWeather[dayIndex].humidity} />
      </div>
      <div className="relative mt-5 ml-5 flex flex-col items-center gap-1">
        <p className="text-center text-2xl">Feels Like</p>
        <p className="text-xl">
          Max: {dailyWeather[dayIndex].maxFeelsLike}&deg;
        </p>
        <ThermoMeter fill={"black"} className="h-24 w-24" />
        <p className="text-xl">
          Min: {dailyWeather[dayIndex].minFeelsLike}&deg;
        </p>
      </div>
      <div className="relative mt-5 mr-5 flex flex-col items-center gap-3">
        <p className="text-2xl">Wind</p>
        <CircleCompass />
        <Compass
          className="absolute top-20 left-10 h-16 w-16"
          amount={`${dailyWeather[dayIndex].windDirection}`}
        />
        <p className="text-2xl">
          {Math.round(dailyWeather[dayIndex].windSpeed)} km/h
        </p>
      </div>
    </section>
  );
}
