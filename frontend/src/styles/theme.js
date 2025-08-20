export const theme = {
  colors: {
    primary: '#181A4D', // Main blue color for background and text
    primaryLight: 'rgba(24, 26, 77, 0.5)', // 50% opacity for minor parts
    black: '#1E1E1E', // Black color for text, icons, and footer backgrounds
    white: '#FFFFFF', // White color for background, text, and icons
    grey: '#D3DDE7', // Grey color for smaller backgrounds, placeholder text, dividers
    greyLight: 'rgba(211, 221, 231, 0.5)', // 50% opacity for minor grey parts
    limeGreen: '#D9E73C', // Lime green for visuals
    limeGreenLight: 'rgba(217, 231, 60, 0.5)', // 50% opacity for lime green backgrounds
    limeGreenExtraLight: 'rgba(217, 231, 60, 0.25)', // 25% opacity for lime green visuals
    pink: '#E6BFFF', // Pink for visuals
    pinkLight: 'rgba(230, 191, 255, 0.5)', // 50% opacity for pink backgrounds
    pinkExtraLight: 'rgba(230, 191, 255, 0.25)', // 25% opacity for pink visuals
  },
  typography: {
    fontFamily: '"Roboto", sans-serif', // Main font family
    fontSize: '16px', // Base font size
    fontWeightRegular: 400, // Regular font weight
    fontWeightMedium: 500, // Medium font weight
    fontWeightBold: 700, // Bold font weight
  },
  spacing: (factor) => `${0.25 * factor}rem`, // Spacing utility (e.g., spacing(4) = 1rem)
};