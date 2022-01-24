import React from 'react';

const ChartIcon = ({ fill, stroke, strokeWidth, idx }) => {
  return (
    <svg
      id="chart_icon"
      xmlns="http://www.w3.org/2000/svg"
      width="2rem"
      height="2rem"
      viewBox="0 0 32 32"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    >
      <path
        id="chart_icon"
        d="M31,30H2V1A1,1,0,0,0,0,1V31a1,1,0,0,0,1,1H31a1,1,0,0,0,0-2Z
        M4.9,20.3a1,1,0,0,0,.71-.3l6.12-6.12,4.38,4.38a1,1,0,0,0,1.41,0L28.64,7.14a1,1,0,1,0-1.41-1.41L16.81,16.14l-4.28-4.28a.83.83,0,0,0-.08-.12,1,1,0,0,0-1.41,0L4.19,18.59A1,1,0,0,0,4.9,20.3Z"
      />
    </svg>
  );
};

export default ChartIcon;
