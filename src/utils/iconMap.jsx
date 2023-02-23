export const ICONS_MAP = new Map();

const addMap = (weatherCodes, iconCode) => {
  weatherCodes.forEach((item) => ICONS_MAP.set(item, iconCode));
};

addMap([0, 1], [100, 150]);
addMap([2], [103, 153]);
addMap([3], [104]);
addMap([45, 48], [501]);
addMap([51, 53, 55, 56, 57], [309]);
addMap([61], [305]);
addMap([63], [306]);
addMap([65], [307]);
addMap([66, 67], [313]);
addMap([71], [400]);
addMap([73], [401]);
addMap([75], [402]);
addMap([77], [407, 457]);
addMap([80, 81], [300, 350]);
addMap([82], [301, 351]);
addMap([85, 86], [406, 456]);
addMap([95], [302]);
addMap([96, 99], [304]);

export const ICONS_DESCRIP_MAP = new Map();

const WeatherCodeList = [
  0, 1, 2, 3, 45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77,
  80, 81, 82, 85, 86, 95, 96, 99,
];

const weatherDescripList = [
  "Clear Sky",
  "Mainly Clear",
  "Partly Cloudy",
  "Overcast",
  "Fog",
  "Rime Fog",
  "Light Drizzle",
  "Moderate Drizzle",
  "Heavy Drizzle",
  "Light Freezing Drizzle",
  "Heavy Freezing Drizzle",
  "Light Rain",
  "Moderate Rain",
  "Heavy Rain",
  "Light Freezing Rain",
  "Heavy Freezing Rain",
  "Light Snow Fall",
  "Moderate Snow Fall",
  "Heavy Snow Fall",
  "Snow Grains",
  "Light Rain Showers",
  "Moderate Rain Showers",
  "Heavy Rain Showers",
  "Light Snow Showers",
  "Heavy Snow Showers",
  "Thunderstorm",
  "Thunderstorm with light hail",
  "Thunderstorm with heavy hail",
];

WeatherCodeList.forEach((item, index) => {
  ICONS_DESCRIP_MAP.set(item, weatherDescripList[index]);
});
