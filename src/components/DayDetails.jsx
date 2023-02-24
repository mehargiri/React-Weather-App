import SunRise from "./svgIcons/SunRise";
import SunSet from "./svgIcons/SunSet";

export default function DayDetails({ className, dayIndex, dailyWeather }) {
  const sunrise = new Intl.DateTimeFormat("en-CA", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(dailyWeather[dayIndex].sunRise));

  const sunset = new Intl.DateTimeFormat("en-CA", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(dailyWeather[dayIndex].sunSet));

  return (
    <section
      className={`mx-12 mt-5 border-t-2 border-slate-500 pt-2 ${className}`}
    >
      <div className="flex flex-col gap-3">
        <p className="text-2xl">Sunrise</p>
        <div className="flex items-center gap-2">
          <SunRise className="h-10 w-10" />
          <p className="text-3xl">{sunrise}</p>
        </div>
        <p className="text-2xl">Sunset</p>
        <div className="flex items-center gap-2">
          <SunSet className="h-10 w-10" />
          <p className="text-3xl">{sunset}</p>
        </div>
      </div>
    </section>
  );
}
