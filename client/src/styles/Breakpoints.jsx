const size = {
  mobile: '360px',
  tablet: '768px',
  laptop: '1024px',
};

export const device = {
  mobile: `(min-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
};
