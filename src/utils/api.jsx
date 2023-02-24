import {
  cleanCurrentWeather,
  cleanDailyWeather,
  cleanHourlyWeather,
} from "./helpers";

export async function findCity(city) {
  const API_ENDPOINT = "https://geocoding-api.open-meteo.com/v1/search?";
  const params = new URLSearchParams({
    name: city,
    count: 10,
  });

  let data = null;
  let error = null;
  try {
    const response = await fetch(API_ENDPOINT + params);
    const query = await response.json();
    if (query.results) {
      const newData = query.results.map((item) => {
        return {
          id: item.id,
          place: item.name,
          state: item.admin1,
          region: item.admin2,
          country: item.country,
          lat: item.latitude,
          long: item.longitude,
        };
      });
      data = newData;
    }
  } catch (err) {
    error = err;
  }

  return { data, error };
}

export async function findWeather(
  lat,
  long,
  place = "",
  state = "",
  country = ""
) {
  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 9);

  const API_ENDPOINT =
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,rain,snowfall,weathercode,visibility,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,rain_sum,snowfall_sum,windspeed_10m_max,winddirection_10m_dominant&timezone=auto&";

  const params = new URLSearchParams({
    latitude: lat,
    longitude: long,
    start_date: currentDate.toISOString().split("T")[0],
    end_date: futureDate.toISOString().split("T")[0],
    current_weather: true,
  });

  let data = null;
  let error = null;

  // console.log(currentDate.toISOString().split("T"));

  try {
    const response = await fetch(API_ENDPOINT + params);
    const query = await response.json();

    const newData = {
      current: cleanCurrentWeather(query),
      daily: cleanDailyWeather(query),
      hourly: cleanHourlyWeather(query),
      timezone: query.timezone,
      place,
      state,
      country,
    };

    data = newData;
  } catch (err) {
    error = err;
  }

  return { data, error };
}
