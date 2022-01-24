import React from 'react';

const SurveyIcon = ({ fill, stroke, strokeWidth }) => {
  return (
    <svg
      id="survey_icon"
      xmlns="http://www.w3.org/2000/svg"
      width="2rem"
      height="2rem"
      viewBox="0 0 30.74 40"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    >
      <path
        id="survey_icon"
        d="M29.74,1.4H26.13V1a1,1,0,0,0-1-1H5.61a1,1,0,0,0-1,1v.4H1a1,1,0,0,0-1,1V39a1,1,0,0,0,1,1H29.74a1,1,0,0,0,1-1V2.4A1,1,0,0,0,29.74,1.4ZM6.61,3.4V2H24.13v2.8H6.61ZM28.74,38H2V3.4H4.61V5.82a1,1,0,0,0,1,1H25.13a1,1,0,0,0,1-1V3.4h2.61Z
        "
      />
      <circle
        id="survey"
        xmlns="http://www.w3.org/2000/svg"
        id="survey_icon"
        data-name="타원 6"
        cx="6.98"
        cy="14.3"
        r="1.8"
      />
      <circle
        id="survey"
        xmlns="http://www.w3.org/2000/svg"
        id="survey_icon"
        data-name="타원 7"
        cx="6.98"
        cy="22.22"
        r="1.8"
      />
      <circle
        xmlns="http://www.w3.org/2000/svg"
        id="survey_icon"
        data-name="타원 8"
        cx="6.98"
        cy="30.34"
        r="1.8"
      />
    </svg>
  );
};

export default SurveyIcon;
