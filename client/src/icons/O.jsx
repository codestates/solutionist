import React from 'react';

const OIcon = ({ fill, stroke, strokeWidth }) => {
  return (
    <svg
      id="O_icon"
      xmlns="http://www.w3.org/2000/svg"
      width="2rem"
      height="2rem"
      viewBox="0 0 250 250"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    >
      <path
        id="O_icon"
        d="M125,250A125,125,0,1,1,250,125h0A125.15,125.15,0,0,1,125,250Zm0-220a95,95,0,1,0,95,95A95,95,0,0,0,125,30Z"
      />
    </svg>
  );
};

export default OIcon;
