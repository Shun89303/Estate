// utils/metrics.ts
import { Dimensions, PixelRatio } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Base design dimensions (e.g., iPhone 14)
const baseWidth = 390;
const baseHeight = 844;

// Scaling factors
const widthScale = screenWidth / baseWidth;
const heightScale = screenHeight / baseHeight;

// Detect tablet (screen width >= 600 or pixel density check)
const isTablet = screenWidth >= 600;

// Tablet scaling factor (optional: reduce scaling for tablets to keep proportions)
const tabletScale = isTablet ? 0.8 : 1;

/**
 * Scale a size (width‑based) – use for horizontal spacing, button widths, etc.
 * @param size - size in dp (from base design)
 * @returns scaled size
 */
export function scaleSize(size: number): number {
	const newSize = size * widthScale * tabletScale;
	return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

/**
 * Scale a size (height‑based) – use for vertical spacing, line heights, etc.
 * @param size - size in dp (from base design)
 * @returns scaled size
 */
export function scaleVertical(size: number): number {
	const newSize = size * heightScale * tabletScale;
	return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

/**
 * Moderate scaling for fonts – limit the maximum scale to avoid huge text on large devices.
 * @param size - base font size
 * @param factor - scaling factor (default 0.5)
 * @returns scaled font size
 */
export function moderateScale(size: number, factor: number = 0.5): number {
	const newSize = size + (scaleSize(size) - size) * factor;
	return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

// Predefined spacing values (based on 8‑point grid)
export const spacing = {
	xs: scaleSize(4),
	sm: scaleSize(8),
	md: scaleSize(12),
	lg: scaleSize(16),
	xl: scaleSize(24),
	xxl: scaleSize(32),
	xxxl: scaleSize(48),
};

// Font size presets (using moderateScale)
export const fontSizes = {
	xs: moderateScale(10),
	sm: moderateScale(12),
	md: moderateScale(14),
	lg: moderateScale(16),
	xl: moderateScale(18),
	xxl: moderateScale(20),
	xxxl: moderateScale(24),
	display: moderateScale(32),
};

// Helper to get screen dimensions
export const getScreenDimensions = () => ({
	width: screenWidth,
	height: screenHeight,
});
export const getIsTablet = () => isTablet;
