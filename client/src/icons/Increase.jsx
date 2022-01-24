import React from 'react';

const IncreaseIcon = ({ fill, stroke, strokeWidth }) => {
  return (
    <svg
      id="increase_icon"
      xmlns="http://www.w3.org/2000/svg"
      width="2rem"
      height="2rem"
      viewBox="0 0 21.4 40"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    >
      <path
        id="increase_icon"
        d="M21,19,2.38.41a1.38,1.38,0,0,0-2,0,1.38,1.38,0,0,0,0,2L18,20,.41,37.62a1.38,1.38,0,0,0,0,2,1.39,1.39,0,0,0,2,0L21,21A1.41,1.41,0,0,0,21,19Z"
      />
    </svg>
  );
};

export default IncreaseIcon;
