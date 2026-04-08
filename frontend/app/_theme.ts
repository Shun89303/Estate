export const lightColors = {
	appBackground: "#F3F4F7",
	background: "#fff",
	text: "#000000",
	primaryGold: "#BF8F5B", // buttons, links, icons
	primaryGray: "#727683",
	primaryGreen: "#4CA154",
	secondaryGold: "#FEF3E8",
	secondaryGray: "#ABADB5",
	secondaryGreen: "#EFF9F0",
	primaryBlack: "#131620",
	primaryRed: "#DA4138",
	primaryBackground: "#FDF6EB", // main screen background
	border: "#E3D8CA", // all borders
	surface: "#F9F4EE", // cards, inputs, modals
	elevated: "#FFFFFF", // dropdowns, popups
	textPrimary: "#131620",
	textSecondary: "#727683",
	textTertiary: "#ABADB5",
	primaryMute: "#EAECF0",
	secondaryMute: "#F5F5F7",
};

export const darkColors = {
	appBackground: "hsla(225, 15%, 12%, 1.00)",
	background: "#121212",
	text: "#ffffff",
	primaryGold: "#BF8F5B", // buttons, links, icons
	primaryGray: "#727683",
	primaryGreen: "#4CA154",
	secondaryGold: "#FEF3E8",
	secondaryGray: "#ABADB5",
	secondaryGreen: "#EFF9F0",
	primaryBlack: "#131620",
	primaryRed: "#DA4138",
	primaryBackground: "#FDF6EB", // main screen background
	border: "#E3D8CA", // all borders
	surface: "#F9F4EE", // cards, inputs, modals
	elevated: "#FFFFFF", // dropdowns, popups
	textPrimary: "#131620",
	textSecondary: "#727683",
	textTertiary: "#ABADB5",
	primaryMute: "#EAECF0",
	secondaryMute: "#F5F5F7",
};

export type ThemeColors = typeof lightColors;

const themes = {
	light: lightColors,
	dark: darkColors,
};

export default themes;
