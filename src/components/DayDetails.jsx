import SunRise from "./svgIcons/SunRise";
import SunSet from "./svgIcons/SunSet";

export default function DayDetails({ className }) {
  const sunRiseTime = "6:57";
  const sunSetTime = "6:02";
  return (
    <section
      className={`mx-12 mt-5 border-t-2 border-slate-500 pt-2 ${className}`}
    >
      <div className="flex flex-col gap-3">
        <p className="text-2xl">Sunrise</p>
        <div className="flex items-center gap-2">
          <SunRise className="h-10 w-10" />
          <p className="text-3xl">{sunRiseTime} AM</p>
        </div>
        <p className="text-2xl">Sunset</p>
        <div className="flex items-center gap-2">
          <SunSet className="h-10 w-10" />
          <p className="text-3xl">{sunSetTime} PM</p>
        </div>
      </div>
    </section>
  );
}
