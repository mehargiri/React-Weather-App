import CurrentWeather from "./components/CurrentWeather";
import DailyWeather from "./components/DailyWeather";
import DayCharts from "./components/DayCharts";
import DayDetails from "./components/DayDetails";
import HourlyWeather from "./components/HourlyWeather";

export default function App() {
  return (
    <main className="mx-auto max-w-[1100px] cursor-default py-5">
      <CurrentWeather />
      <DailyWeather />
      <HourlyWeather />
      <div className="flex flex-col sm:flex-row">
        <DayDetails className="min-w-max" />
        <DayCharts />
      </div>
    </main>
  );
}
