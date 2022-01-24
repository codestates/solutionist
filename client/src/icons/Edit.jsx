import React from 'react';

const ChartIcon = ({ fill, stroke, strokeWidth, idx }) => {
  return (
    <svg
      id="edit_icon"
      xmlns="http://www.w3.org/2000/svg"
      width="2rem"
      height="2rem"
      viewBox="0 0 31.1 26.13"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    >
      <path
        id="edit_icon"
        d="M6.43,22.05,21.84,3.6a.2.2,0,0,0,0-.28L20.21,2a.19.19,0,0,0-.28,0L3.39,21.8a.2.2,0,0,0,.15.33H6.28A.19.19,0,0,0,6.43,22.05Z
        M30.1,24.13H1.54a.17.17,0,0,0-.15.07L.05,25.8a.2.2,0,0,0,.15.33H30.1a1,1,0,0,0,0-2Z"
      />
      <rect
        x="21.19"
        y="0.14"
        width="1.74"
        height="2.5"
        rx="0.19"
        transform="translate(6.86 17.43) rotate(-50.14)"
      />
    </svg>
  );
};

export default ChartIcon;
