import { useState } from "react";

export async function findCity(city) {
  const API_ENDPOINT = "https://geocoding-api.open-meteo.com/v1/search?";
  const params = new URLSearchParams({
    name: city,
    count: 10,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  try {
    const data = await fetch(API_ENDPOINT + params);
    setIsLoading(false);
    if (data.results) {
      const newData = data.results.map((item) => {
        return {
          id: item.id,
          name: item.name,
          state: item.admin1,
          region: item.admin2,
          country: item.country,
          lat: item.latitude,
          long: item.longitude,
        };
      });
      setData(newData);
    }
  } catch (error) {
    setIsLoading(false);
    setIsError(true);
    setError(error);
  }

  return { isLoading, data, isError, error };
}

export async function findWeather(
  lat,
  long,
  name = "",
  state = "",
  country = ""
) {
  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 10);

  const API_ENDPOINT =
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,rain,snowfall,weathercode,visibility,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,rain_sum,snowfall_sum,windspeed_10m_max,winddirection_10m_dominant&timezone=auto&";

  const params = new URLSearchParams({
    latitude: lat,
    longitude: long,
    start_date: currentDate.toISOString().split("T")[0],
    end_date: futureDate.toISOString().split("T")[0],
    current_weather: true,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  try {
    const data = await fetch(API_ENDPOINT + params);
    setIsLoading(false);

    const newData = {
      current: cleanCurrentWeather(data),
      daily: cleanDailyWeather(data),
      hourly: cleanHourlyWeather(data),
      timezone: data.timezone,
      name,
      state,
      country,
    };

    setData(newData);
  } catch (error) {
    setIsLoading(false);
    setIsError(true);
    setError(error);
  }

  return { isLoading, data, isError, error };
}
