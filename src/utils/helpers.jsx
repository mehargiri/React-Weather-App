import { ICONS_MAP } from "./iconMap";

export function cleanCurrentWeather({ current_weather, daily, hourly }) {
  const {
    temperature: currentTemp,
    weathercode: icon,
    windspeed: currentWindSpeed,
    winddirection: currentWindDirection,
  } = current_weather;

  const {
    apparent_temperature_max: [maxFeelsLike],
    apparent_temperature_min: [minFeelsLike],
    sunrise: [sunRise],
    sunset: [sunSet],
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
    maxFeelsLike: Math.round(maxFeelsLike),
    minFeelsLike: Math.round(minFeelsLike),
    visibility: visibility(visible),
    sunRise,
    sunSet,
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
      sunRise: daily.sunrise[index],
      sunSet: daily.sunset[index],
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

export function getImgUrl(path) {
  const imgUrl = new URL(path, import.meta.url).href;
  return imgUrl;
}

export function getIconCode(
  sunRiseTime,
  sunSetTime,
  timezone,
  icon,
  localTime = ""
) {
  const sunRiseTimeHours = new Intl.DateTimeFormat("en-CA", {
    hour: "numeric",
    hour12: false,
  }).format(new Date(sunRiseTime));

  const sunSetTimeHours = new Intl.DateTimeFormat("en-CA", {
    hour: "numeric",
    hour12: false,
  }).format(new Date(sunSetTime));

  let localTimeHour;
  if (localTime === "") {
    localTimeHour = new Intl.DateTimeFormat("en-CA", {
      hour: "numeric",
      hour12: false,
      timeZone: timezone,
    }).format(new Date());
  } else {
    localTimeHour = new Intl.DateTimeFormat("en-CA", {
      hour: "numeric",
      hour12: false,
    }).format(new Date(localTime));
  }

  const iconArray = ICONS_MAP.get(icon);
  if (iconArray.length !== 1) {
    return localTimeHour > sunRiseTimeHours && localTimeHour < sunSetTimeHours
      ? iconArray[0].toString()
      : iconArray[1].toString();
  } else {
    return iconArray[0].toString();
  }
}

export function convertUTCtoISOTimezone(date, timezone) {
  const year = Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    timeZone: timezone,
  }).format(date);
  const month = Intl.DateTimeFormat("en-CA", {
    month: "2-digit",
    timeZone: timezone,
  }).format(date);
  const day = Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    timeZone: timezone,
  }).format(date);
  return `${year}-${month}-${day}`;
}

export function convertCtoF(value) {
  const result = value * (9 / 5) + 32;
  return result;
}

export function convertKMHtoMPH(value) {
  const result = value / 1.609344;
  return result;
}

export function convertMMtoInch(value) {
  const result = value / 25.4;
  return result;
}

export function convertCMtoInch(value) {
  const result = value / 2.54;
  return result;
}

export function convertMtoMiles(value) {
  const result = value / 1609;
  return result;
}

export function convertMtoKM(value) {
  const result = value / 1000;
  return result;
}
