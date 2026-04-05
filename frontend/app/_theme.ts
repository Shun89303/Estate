export const lightColors = {
	appBackground: "hsla(225, 20.0%, 96.1%, 1.00)",
	background: "#fff",
	text: "#000000",
};

export const darkColors = {
	appBackground: "hsla(225, 15%, 12%, 1.00)",
	background: "#121212",
	text: "#ffffff",
};

export type ThemeColors = typeof lightColors;

const themes = {
	light: lightColors,
	dark: darkColors,
};

export default themes;
