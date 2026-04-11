import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const guidelineBaseWidth = 375; // iPhone SE/X/11/12 base width

export const scale = (size: number) => (width / guidelineBaseWidth) * size;

export const metrics = {
	// Spacing
	xs: scale(4),
	sm: scale(8),
	md: scale(16),
	lg: scale(24),
	xl: scale(32),
	xxl: scale(48),

	// Font sizes
	fontSmall: scale(12),
	fontRegular: scale(14),
	fontMedium: scale(16),
	fontLarge: scale(20),
	fontXLarge: scale(24),

	// Border radius
	radiusSmall: 4,
	radiusMedium: 8,
	radiusLarge: 12,
	radiusRound: 999,

	// Icon sizes
	iconSmall: scale(16),
	iconMedium: scale(24),
	iconLarge: scale(32),

	// Screen dimensions
	screenWidth: width,
	screenHeight: height,
};
