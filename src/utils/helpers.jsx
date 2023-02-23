export function cleanCurrentWeather({ current_weather, daily, hourly }) {
  const {
    temperature: currentTemp,
    weathercode: icon,
    windspeed: currentWindSpeed,
    winddirection: currentWindDirection,
  } = current_weather;

  const {
    temperature_2m_max: [highTemp],
    temperature_2m_min: [lowTemp],
    apparent_temperature_max: [maxFeelsLike],
    apparent_temperature_min: [minFeelsLike],
  } = daily;

  const { visibility: visible } = hourly;

  const visibility = (visible) => {
    const visibleCurrent = visible.slice(0, 25);
    const sum = visibleCurrent.reduce((a, c) => a + c, 0);
    const avg = sum / visibleCurrent.length;
    return avg;
  };

  return {
    currentTemp: Math.round(currentTemp),
    icon,
    currentWindSpeed: Math.round(currentWindSpeed),
    currentWindDirection: Math.round(currentWindDirection),
    highTemp: Math.round(highTemp),
    lowTemp: Math.round(lowTemp),
    maxFeelsLike: Math.round(maxFeelsLike),
    minFeelsLike: Math.round(minFeelsLike),
    visibility: visibility(visible),
  };
}

export function cleanDailyWeather({ hourly, daily }) {
  const hoursArray = [
    [0, 25],
    [25, 49],
    [49, 73],
    [73, 97],
    [97, 121],
    [121, 145],
    [145, 169],
    [169, 193],
    [193, 217],
    [217, 240],
  ];

  const humidityArray = hoursArray.map((item) => {
    const sliceArray = hourly.relativehumidity_2m.slice(item[0], item[1]);
    const sum = sliceArray.reduce((a, c) => a + c, 0);
    const avg = sum / sliceArray.length;
    return avg;
  });

  return daily.time.map((time, index) => {
    return {
      timeStamp: time,
      icon: daily.weathercode[index],
      highTemp: Math.round(daily.temperature_2m_max[index]),
      lowTemp: Math.round(daily.temperature_2m_min[index]),
      maxFeelsLike: Math.round(daily.apparent_temperature_max[index]),
      minFeelsLike: Math.round(daily.apparent_temperature_min[index]),
      windDirection: daily.winddirection_10m_dominant[index],
      windSpeed: daily.windspeed_10m_max[index],
      snowSum: daily.snowfall_sum[index],
      rainSum: daily.rain_sum[index],
      sunrise: daily.sunrise[index],
      sunset: daily.sunset[index],
      humidity: Math.round(humidityArray[index]),
    };
  });
}

export function cleanHourlyWeather({ hourly }) {
  return hourly.time.map((time, index) => {
    return {
      timeStamp: time,
      icon: hourly.weathercode[index],
      temp: Math.round(hourly.temperature_2m[index]),
      feelsLike: Math.round(hourly.apparent_temperature[index]),
      rain: hourly.rain[index],
      snow: hourly.snowfall[index],
      windDirection: hourly.winddirection_10m[index],
      windSpeed: hourly.windspeed_10m[index],
    };
  });
}
