import React from 'react';

const DecreaseIcon = ({ fill, stroke, strokeWidth }) => {
  return (
    <svg
      id="decrease_icon"
      xmlns="http://www.w3.org/2000/svg"
      width="2rem"
      height="2rem"
      viewBox="0 0 21.4 40"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    >
      <path
        id="decrease_icon"
        d="M3.37,20,21,2.38a1.4,1.4,0,0,0-2-2L.41,19a1.39,1.39,0,0,0,0,2L19,39.59a1.4,1.4,0,0,0,2,0,1.4,1.4,0,0,0,0-2Z"
      />
    </svg>
  );
};

export default DecreaseIcon;
