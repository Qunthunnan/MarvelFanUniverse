const Error = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={200}
    height={200}
    preserveAspectRatio="xMidYMid"
    style={{
      margin: 0,
      display: "block",
      shapeRendering: "auto",
      backgroundPositionX: 0,
      backgroundPositionY: 0,
      backgroundSize: "auto",
      backgroundOrigin: "padding-box",
      backgroundClip: "border-box",
      background: "#fff",
      width: 200,
      height: 200,
      animation: "none",
    }}
    viewBox="0 0 100 100"
    {...props}
  >
    <g
      className="ldl-scale"
      style={{
        transformOrigin: "50px 50px",
        transform: "matrix(.8,0,0,.8,0,0)",
        animation: "none",
      }}
    >
      <g className="ldl-ani">
        <linearGradient
          id="a"
          x1={36.618}
          x2={51.618}
          y1={37.807}
          y2={85.807}
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            stopColor="#e15c64"
            style={{
              strokeWidth: 1,
              stopColor: "#b20015",
              animation: "none",
            }}
          />
          <stop
            offset={1}
            stopColor="#b0484f"
            style={{
              strokeWidth: 1,
              stopColor: "#9f0013",
              animation: "none",
            }}
          />
        </linearGradient>
        <g
          className="ldl-layer"
          style={{
            transformOrigin: "50px 50px",
            transform: "matrix(1.00333,0,0,1.00333,0,0)",
            animationDuration: "1s",
            animationTimingFunction: "linear",
            animationDelay: "-.666667s",
            animationIterationCount: "infinite",
            animationDirection: "normal",
            animationFillMode: "forwards",
            animationPlayState: "paused",
            animationName: "animate",
            animationTimeline: "auto",
            animationRangeStart: "normal",
            animationRangeEnd: "normal",
            transformBox: "view-box",
            animation: "none",
          }}
        >
          <path
            fill="url(#a)"
            stroke="#323232"
            strokeMiterlimit={10}
            strokeWidth={3.5}
            d="M44.859 16.397 9.485 77.667c-2.285 3.957.571 8.904 5.141 8.904h70.748c4.57 0 7.425-4.947 5.141-8.904l-35.374-61.27c-2.285-3.957-7.997-3.957-10.282 0z"
            className="ldl-ani"
            style={{
              strokeWidth: "3.5px",
              stroke: "#323232",
              fill: "url(#a)",
              animation: "none",
            }}
          />
        </g>
        <g className="ldl-layer">
          <g className="ldl-ani">
            <g
              className="ldl-layer"
              style={{
                transformOrigin: "50px 50px",
                transform: "matrix(.935119,0,0,.935119,0,0)",
                animationDuration: "1s",
                animationTimingFunction: "linear",
                animationDelay: "-.833333s",
                animationIterationCount: "infinite",
                animationDirection: "normal",
                animationFillMode: "forwards",
                animationPlayState: "paused",
                animationName: "animate",
                animationTimeline: "auto",
                animationRangeStart: "normal",
                animationRangeEnd: "normal",
                transformBox: "view-box",
                animation: "none",
              }}
            >
              <path
                fill="#fff"
                d="m53.4 68.511.6 3.906a4.048 4.048 0 0 1-8 1.23 4.183 4.183 0 0 1 0-1.229l.6-3.906a3.44 3.44 0 0 1 6.8-.001z"
                className="ldl-ani"
                style={{
                  strokeWidth: 1,
                  fill: "#fff",
                  animation: "none",
                }}
              />
            </g>
          </g>
        </g>
        <g className="ldl-layer">
          <g className="ldl-ani">
            <g
              className="ldl-layer"
              style={{
                transformOrigin: "50px 50px",
                transform: "matrix(.91,0,0,.91,0,0)",
                animationDuration: "1s",
                animationTimingFunction: "linear",
                animationDelay: "-1s",
                animationIterationCount: "infinite",
                animationDirection: "normal",
                animationFillMode: "forwards",
                animationPlayState: "paused",
                animationName: "animate",
                animationTimeline: "auto",
                animationRangeStart: "normal",
                animationRangeEnd: "normal",
                transformBox: "view-box",
                animation: "none",
              }}
            >
              <path
                fill="#fff"
                d="m54 40.417-1.2 17.28a2.807 2.807 0 0 1-5.6 0L46 40.417a4.01 4.01 0 1 1 8 0z"
                className="ldl-ani"
                style={{
                  strokeWidth: 1,
                  fill: "#fff",
                  animation: "none",
                }}
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)
export default Error
