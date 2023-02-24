export default function SearchResult({
  data,
  text,
  getWeather,
  changeCityList,
  setCityName,
}) {
  return text !== "" ? (
    <div className="z-10 flex-grow py-1 px-8 text-lg hover:bg-slate-200 ">
      {text}
    </div>
  ) : (
    <button
      className="z-10 flex-grow py-1 px-8 text-lg hover:bg-slate-200 "
      onClick={() => {
        getWeather(data.lat, data.long, data.place, data.state, data.country);
        changeCityList([]);
        setCityName("");
      }}
    >
      {data.place}
      {data.state ? ", " : ""}
      {data.state}
      {data.region ? ", " : ""}
      {data.region}
      {data.country ? ", " : ""}
      {data.country}
    </button>
  );
}
