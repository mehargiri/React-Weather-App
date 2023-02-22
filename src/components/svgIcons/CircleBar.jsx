export default function CircleBar() {
  const circleWidth = "120";
  const radius = 55;
  const percent = 0.66;

  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - dashArray * 0.66;
  return (
    <>
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth={"10px"}
          r={radius}
          className="fill-none stroke-gray-300"
        />

        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth={"10px"}
          r={radius}
          className="fill-none stroke-black"
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        />
        <text
          x={"50%"}
          y={"50%"}
          dy={"0.3em"}
          textAnchor="middle"
          className="text-3xl"
        >
          {percent * 100}%
        </text>
      </svg>
    </>
  );
}
