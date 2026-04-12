// utils/componentSizes.ts
import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Base guideline (iPhone 12)
const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

// Detect tablet
const isTablet = SCREEN_WIDTH >= 768;

// Separate scaling factors
const sizeFactor = isTablet ? 0.8 : 1; // components (subtle)
const spacingFactor = isTablet ? 1.2 : 1; // spacing (stronger)

// --------------------
// Scaling helpers
// --------------------
export const scale = (size: number) =>
	(SCREEN_WIDTH / guidelineBaseWidth) * size * sizeFactor;

export const verticalScale = (size: number) =>
	(SCREEN_HEIGHT / guidelineBaseHeight) * size * sizeFactor;

// Stronger spacing scale (for margins/paddings)
export const spacingScale = (size: number) =>
	(SCREEN_HEIGHT / guidelineBaseHeight) * size * spacingFactor;

export const moderateScale = (size: number, factor = 0.5) =>
	size + (scale(size) - size) * factor;

// --------------------
// GENERIC METRICS SYSTEM
// --------------------
export const metrics = {
	// Border radii
	borderRadiusSmall: scale(4),
	borderRadiusMedium: scale(8),
	borderRadiusLarge: scale(14),
	borderRadiusXLarge: scale(28),
	borderRadiusXXL: scale(42),

	// Border widths
	borderThin: 1,
	borderMedium: isTablet ? 1.5 : 1,
	borderThick: 2,

	// Icons
	iconExtraSmall: scale(10),
	iconSmall: scale(12),
	iconMedium: scale(16),
	iconMediumLarge: scale(18),
	iconMediumXL: scale(20),
	iconMediumXXL: scale(22),
	iconLarge: scale(24),
	iconXL: scale(28),
	iconXXL: scale(32),

	// Buttons / Thumbnails / Avatars
	buttonSmall: scale(32),
	buttonMedium: scale(44),
	buttonLarge: scale(60),

	thumbnailSmall: scale(32),
	thumbnailMedium: scale(44),
	thumbnailLarge: scale(60),
	thumbnailXLarge: scale(80),
	thumbnailXXL: scale(100),

	avatarSmall: scale(32),
	avatarMedium: scale(44),
	avatarLarge: scale(60),

	// Generic container dimensions
	containerHeightSmall: verticalScale(16),
	containerHeightMedium: verticalScale(24),
	containerHeightLarge: verticalScale(32),

	containerMinWidthSmall: verticalScale(16),
	containerMinWidthMedium: verticalScale(24),
	containerMinWidthLarge: verticalScale(32),

	containerPaddingHorizontalSmall: scale(4),
	containerPaddingHorizontalMedium: scale(8),
	containerPaddingHorizontalLarge: scale(12),
	containerPaddingHorizontalxl: scale(24),
	containerPaddingHorizontalxxl: scale(36),

	// Generic overlay / placeholder size
	overlaySmall: scale(24),
	overlayMedium: scale(44),
	overlayLarge: scale(60),

	// ----------------
	// Spacing (margins & paddings)
	// ----------------
	spacingExtraSmall: spacingScale(4),
	spacingMiniSmall: spacingScale(6),
	spacingSmall: spacingScale(8),
	spacingMedium: spacingScale(12),
	spacingLarge: spacingScale(16),
	spacingExtraLarge: spacingScale(24),

	// ----------------
	// Fonts
	// ----------------
	fontExtraSmall: moderateScale(10),
	fontSmall: moderateScale(12),
	fontMedium: moderateScale(14),
	fontLarge: moderateScale(16),
	fontExtraLarge: moderateScale(20),
	fontxxl: moderateScale(30),

	// --------------------
	// Letter spacing
	// --------------------
	letterSpacing: {
		tight: scale(-0.5),
		small: scale(0),
		normal: scale(0.5),
		medium: scale(1),
		large: scale(1.5),
		extraLarge: scale(2),
	},

	// Line heights
	lineHeightExtraSmall: moderateScale(10) * 1.2,
	lineHeightSmall: moderateScale(12) * 1.2,
	lineHeightMedium: moderateScale(14) * 1.3,
	lineHeightLarge: moderateScale(16) * 1.35,
	lineHeightExtraLarge: moderateScale(20) * 1.4,

	// ----------------
	// Absolute positions
	// ----------------
	topExtraSmall: verticalScale(1),
	topSmall: verticalScale(8),
	topMedium: verticalScale(12),
	topLarge: verticalScale(16),
	topExtraLarge: verticalScale(24),

	bottomExtraSmall: verticalScale(1),
	bottomSmall: verticalScale(8),
	bottomMedium: verticalScale(12),
	bottomLarge: verticalScale(16),
	bottomExtraLarge: verticalScale(24),
	bottomXLarge: verticalScale(30),
	bottomXXL: verticalScale(36),
	bottomXXXL: verticalScale(48),

	leftExtraSmall: scale(1),
	leftSmall: scale(8),
	leftMedium: scale(12),
	leftLarge: scale(16),
	leftExtraLarge: scale(24),

	rightExtraSmall: scale(1),
	rightSmall: scale(8),
	rightMedium: scale(12),
	rightLarge: scale(16),
	rightExtraLarge: scale(24),

	dimensions: {
		width: {
			xs: scale(4),
			sm: scale(8),
			md: scale(12),
			lg: scale(16),
			xl: scale(24),
			xxl: scale(52),
		},
		height: {
			xs: verticalScale(4),
			sm: verticalScale(8),
			md: verticalScale(12),
			lg: verticalScale(16),
			xl: verticalScale(24),
			xxl: verticalScale(52),
		},
	},

	// ----------------
	// Input heights
	// ----------------
	inputHeight: {
		singleLine: verticalScale(40), // normal input
		singleLineMedium: verticalScale(50),
		singleLineLarge: verticalScale(60),
		multiLineSmall: verticalScale(80), // small multiline input
		multiLineLarge: verticalScale(120), // larger multiline input
	},

	// --------------------
	// Checkbox scaling
	// --------------------
	checkboxScale: isTablet ? 1.5 : 1,

	square100: scale(100),

	barWidth: {
		// Default (safe for most charts)
		small: scale(15),

		// Balanced spacing (recommended default)
		medium: scale(20),

		// Thicker bars (better for fewer data points like 7 days)
		large: scale(25),

		// Very thick (dashboard / emphasis)
		xLarge: scale(35),
	},
};
