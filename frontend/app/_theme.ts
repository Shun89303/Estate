export const lightColors = {
	appBackground: "#F3F4F7",
	background: "#fff",
	text: "#000000",
	primaryPurple: "#9D59EF",
	primaryGold: "#BF8F5B",
	primaryGray: "#727683",
	primaryOrange: "#F59E0B",
	primaryGreen: "#4CA154",
	secondaryGold: "#FEF3E8",
	secondaryGray: "#ABADB5",
	secondaryGreen: "#EFF9F0",
	primaryBlack: "#131620",
	primaryRed: "#DA4138",
	darkRed: "#FBECEB",
	primaryBackground: "#FDF6EB",
	border: "#E3D8CA",
	surface: "#FFF",
	elevated: "#FFFFFF",
	textPrimary: "#131620",
	textSecondary: "#727683",
	textTertiary: "#ABADB5",
	primaryMute: "#EAECF0",
	secondaryMute: "hsla(240, 11%, 97%, 1.00)",
	darkGold: "hsla(26, 17%, 92%, 1)",
	darkerGold: "hsla(25, 28%, 87%, 1)",
	darkerGoldBorder: "hsla(29, 11%, 85%, 1)",
	coinGoldBG: "#FDF5EB",
	coinGoldBorder: "rgba(249, 229, 200, 1)",
};

export const darkColors = {
	appBackground: "hsla(225, 15%, 12%, 1.00)",
	background: "#121212",
	text: "#ffffff",
	primaryPurple: "#9D59EF",
	primaryGold: "#BF8F5B",
	primaryGray: "#727683",
	primaryOrange: "#F59E0B",
	primaryGreen: "#4CA154",
	secondaryGold: "#FEF3E8",
	secondaryGray: "#ABADB5",
	secondaryGreen: "#EFF9F0",
	primaryBlack: "#131620",
	primaryRed: "#DA4138",
	darkRed: "#FBECEB",
	primaryBackground: "#FDF6EB",
	border: "#E3D8CA",
	surface: "#FFF",
	elevated: "#FFFFFF",
	textPrimary: "#131620",
	textSecondary: "#727683",
	textTertiary: "#ABADB5",
	primaryMute: "#EAECF0",
	secondaryMute: "#F5F5F7",
	darkGold: "hsla(26, 17%, 92%, 1)",
	darkerGold: "hsla(25, 28%, 87%, 1)",
	darkerGoldBorder: "hsla(29, 11%, 85%, 1)",
	coinGoldBG: "rgba(253, 245, 235, 1)",
	coinGoldBorder: "rgba(249, 229, 200, 1)",
};

export type ThemeColors = typeof lightColors;

const themes = {
	light: lightColors,
	dark: darkColors,
};

export default themes;

// Color discovery:
// gold bg color = primaryGold + 10,
// gold border color = primaryGold + 50
// gold icon bg color = primaryGold + 20
// gray border color = primaryGray + 50
// gray bg color = primaryGray + 10
