import React from 'react';

const ShareIcon = ({ fill, stroke, strokeWidth }) => {
  return (
    <svg
      id="share_icon"
      xmlns="http://www.w3.org/2000/svg"
      width="2rem"
      height="2rem"
      viewBox="0 0 28.83 32.22"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    >
      <path
        id="share_icon"
        d="M23.83,22.22a5,5,0,0,0-3.69,1.66L9.71,17.73a4.67,4.67,0,0,0,0-3.24L20.14,8.34A5,5,0,1,0,18.83,5a4.85,4.85,0,0,0,.3,1.62L8.69,12.77a5,5,0,1,0,0,6.68l10.44,6.16a4.79,4.79,0,0,0-.3,1.61,5,5,0,1,0,5-5ZM23.83,2a3,3,0,1,1-3,3A3,3,0,0,1,23.83,2ZM5,19.11a3,3,0,1,1,3-3A3,3,0,0,1,5,19.11ZM23.83,30.22a3,3,0,1,1,3-3A3,3,0,0,1,23.83,30.22Z"
      />
    </svg>
  );
};

export default ShareIcon;
