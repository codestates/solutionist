import React from 'react';

const ListIcon = ({ fill, stroke, strokeWidth }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2rem"
      height="2rem"
      viewBox="0 0 40 29"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    >
      <path
        id="list_icon"
        d="M38.73,3.5H10.6a1.16,1.16,0,0,1-1.27-1,1.16,1.16,0,0,1,1.27-1H38.73A1.15,1.15,0,0,1,40,2.5,1.15,1.15,0,0,1,38.73,3.5Z
        M38.73,15.5H10.6a1.16,1.16,0,0,1-1.27-1,1.16,1.16,0,0,1,1.27-1H38.73a1.15,1.15,0,0,1,1.27,1A1.15,1.15,0,0,1,38.73,15.5Z
        M38.73,27.5H10.6a1.16,1.16,0,0,1-1.27-1,1.16,1.16,0,0,1,1.27-1H38.73a1.15,1.15,0,0,1,1.27,1A1.16,1.16,0,0,1,38.73,27.5Z"
      />
      <circle cx="2.5" cy="2.5" r="2.5" />
      <circle cx="2.5" cy="14.5" r="2.5" />
      <circle cx="2.5" cy="26.5" r="2.5" />
    </svg>
  );
};

export default ListIcon;
