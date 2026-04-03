import { Platform, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function useTabBarConfig() {
	const insets = useSafeAreaInsets();
	const { width, height } = useWindowDimensions();
	const isTablet = Math.min(width, height) >= 768;

	const TAB_BAR_HEIGHT = isTablet ? 58 : 50;
	const TAB_ICON_SIZE = isTablet ? 30 : 22;
	const INDICATOR_WIDTH = isTablet ? 32 : 24;
	const INDICATOR_HEIGHT = 3;
	const INDICATOR_BOTTOM_OFFSET = isTablet
		? insets.bottom + 50
		: Platform.OS === "ios"
			? insets.bottom + 45
			: insets.bottom + 45;

	return {
		TAB_BAR_HEIGHT,
		TAB_ICON_SIZE,
		INDICATOR_WIDTH,
		INDICATOR_HEIGHT,
		INDICATOR_BOTTOM_OFFSET,
		isTablet,
		insets,
	};
}
