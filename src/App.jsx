import { useEffect, useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import DailyWeather from "./components/DailyWeather";
import DayCharts from "./components/DayCharts";
import DayDetails from "./components/DayDetails";
import HourlyWeather from "./components/HourlyWeather";
import SearchResult from "./components/SearchResult";
import { findCity, findWeather } from "./utils/api";

export default function App() {
  const [cityName, setCityName] = useState("");
  const [cityList, setCityList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [foundWeather, setFoundWeather] = useState(false);
  const [debounceCityName, setDebounceCityName] = useState("");
  const [dayIndex, setDayIndex] = useState(null);

  const [weather, setWeather] = useState({
    current: {},
    daily: [],
    hourly: [],
    place: "",
    state: "",
    country: "",
    timezone: "",
  });

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceCityName(cityName), 500);
    return () => clearTimeout(timeout);
  }, [cityName]);

  useEffect(() => {
    async function fetchData() {
      if (debounceCityName !== "") {
        setIsLoading(true);
        const { data, error } = await findCity(debounceCityName);
        setIsLoading(false);

        if (error !== null) {
          console.log(error);
          return;
        }

        if (Array.isArray(data)) {
          setCityList([...data]);
          setNoResults(false);
        } else {
          setNoResults(true);
        }
      } else {
        setCityList([]);
      }
    }
    fetchData();
  }, [debounceCityName]);

  const getWeather = async (lat, long, place, state, country) => {
    setIsLoadingWeather(true);
    const { error, data } = await findWeather(lat, long, place, state, country);
    setIsLoadingWeather(false);

    if (error !== null) {
      console.log(error);
      return;
    }

    setWeather((prev) => ({
      ...prev,
      current: { ...data.current },
      daily: [...data.daily],
      hourly: [...data.hourly],
      place: data.place,
      state: data.state,
      country: data.country,
      timezone: data.timezone,
    }));
    setFoundWeather(true);
  };

  const createCities = (list) => {
    const cities = [];
    if (isLoading) {
      cities.push(
        <SearchResult key="isLoading" text="Loading City Names ... " />
      );
      return cities;
    }

    if (noResults) {
      cities.push(
        <SearchResult
          key="noResult"
          noResults={noResults}
          text="Sorry! No cities found!"
        />
      );
    } else {
      list.forEach((item) => {
        cities.push(
          <SearchResult
            key={item.id}
            data={item}
            text=""
            getWeather={getWeather}
            changeCityList={setCityList}
            setCityName={setCityName}
          />
        );
      });
    }
    return cities;
  };

  const setDayIndexDailyWeather = (value) => {
    setDayIndex(value);
  };

  return (
    <main className="mx-auto max-w-[1100px] cursor-default py-5">
      <div className="relative mx-auto max-w-xl sm-max:mx-8">
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          className={`w-full rounded-xl border border-gray-500 py-3 px-8 text-2xl drop-shadow-xl ${
            cityList.length > 0 ? "rounded-br-none rounded-bl-none" : ""
          }`}
          placeholder="Enter a city name..."
        />
        {cityList.length > 0 && (
          <div className="absolute flex w-full flex-col rounded-xl rounded-tl-none rounded-tr-none border border-t-0 border-slate-500">
            {createCities(cityList)}
          </div>
        )}
      </div>

      {isLoadingWeather && (
        <p className="mt-5 text-center text-3xl">Loading weather data...</p>
      )}

      {foundWeather && cityList.length === 0 && (
        <>
          <CurrentWeather currentWeather={weather} />
          <DailyWeather
            dailyWeather={weather.daily}
            hourlyWeather={weather.hourly}
            timezone={weather.timezone}
            setDayIndex={setDayIndexDailyWeather}
            datyIndex={dayIndex}
          />
          {dayIndex !== null && (
            <>
              <HourlyWeather
                hourlyWeather={weather.hourly}
                dailyWeather={weather.daily}
                timezone={weather.timezone}
                dayIndex={dayIndex}
              />
              <div className="flex flex-col sm:flex-row">
                <DayDetails
                  className="min-w-max"
                  dayIndex={dayIndex}
                  dailyWeather={weather.daily}
                />
                <DayCharts dayIndex={dayIndex} dailyWeather={weather.daily} />
              </div>
            </>
          )}
        </>
      )}
    </main>
  );
}
