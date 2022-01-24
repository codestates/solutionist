import React from 'react';

const CheckIcon = ({ fill, stroke, strokeWidth, idx }) => {
  return (
    <svg
      id={`a${idx}`}
      xmlns="http://www.w3.org/2000/svg"
      width="2rem"
      height="2rem"
      viewBox="0 0 24.69 17.12"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    >
      <path
        id={`a${idx}`}
        d="M24.39.29A1,1,0,0,0,23,.29L8.56,14.71,1.71,7.86A1,1,0,0,0,.29,9.27l7.57,7.56a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29L24.39,1.71A1,1,0,0,0,24.39.29Z"
      />
    </svg>
  );
};

export default CheckIcon;
