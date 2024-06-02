const Loader = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ? props.width : 100}
    height={props.height ? props.height : 100}
    preserveAspectRatio="xMidYMid"
    style={{
      shapeRendering: "auto",
      display: "block",
      background: "0 0",
      margin: "0px auto",
    }}
    viewBox="0 0 100 100"
  >
    <circle
      cx={50}
      cy={50}
      r={35}
      fill="none"
      stroke="#9f0013"
      strokeDasharray="164.93361431346415 56.97787143782138"
      strokeWidth={10}
    >
      <animateTransform
        attributeName="transform"
        dur="1s"
        keyTimes="0;1"
        repeatCount="indefinite"
        type="rotate"
        values="0 50 50;360 50 50"
      />
    </circle>
  </svg>
)
export {Loader};
