import CircleBar from "./svgIcons/CircleBar";
import ThermoMeter from "./svgIcons/Thermometer";
import Compass from "./svgIcons/Compass";

export default function DayCharts() {
  return (
    <section className="mx-12 mt-5 flex flex-wrap justify-between gap-5 border-t-2 border-slate-500 sm:w-full">
      <div className="mt-5">
        <p className="mb-3 text-center text-2xl">Precipitation</p>
        <CircleBar />
      </div>
      <div className="mt-5">
        <p className="mb-3 text-center text-2xl">Humidity</p>
        <CircleBar />
      </div>
      <div className="mt-5">
        <p className="mb-3 text-center text-2xl">Feels Like Temp</p>
        <div className="relative flex flex-col items-center">
          <p className="absolute -left-2 text-xl">Max: 4&deg;</p>
          <ThermoMeter fill={"black"} className="h-28 w-28" />
          <p className="absolute -right-2 bottom-5 text-xl">Min: 5&deg;</p>
        </div>
      </div>
      <div className="m-8 mt-5 flex flex-col items-center">
        <p className="text-2xl">Wind</p>
        <Compass fill={"black"} className="h-24 w-24 rotate-0" />
        <p className="text-xl">20 km/h</p>
      </div>
    </section>
  );
}
