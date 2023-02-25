import Compass from "./Compass";

export default function CircleCompass() {
  const circleWidth = "120";
  const radius = 55;

  const dashArray = radius * Math.PI * 2;
  // const dashOffset = dashArray - dashArray * 0.66;
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
          className="fill-none stroke-black"
        />

        <text
          x={"45%"}
          y={"15%"}
          dy={"0.4em"}
          textAnchor="start"
          className="text-[1.4rem]"
        >
          N
        </text>
        <text
          x={"45%"}
          y={"83%"}
          dy={"0.4em"}
          textAnchor="start"
          className="text-[1.4rem]"
        >
          S
        </text>
        <text
          x={"10%"}
          y={"50%"}
          dy={"0.4em"}
          textAnchor="start"
          className="text-[1.4rem]"
        >
          W
        </text>
        <text
          x={"80%"}
          y={"50%"}
          dy={"0.4em"}
          textAnchor="start"
          className="text-[1.4rem]"
        >
          E
        </text>
      </svg>
    </>
  );
}
