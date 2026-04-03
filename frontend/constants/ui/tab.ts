// src/constants/ui/tab.ts

import { metrics } from "@/utils/metrics";

export const tabUI = {
	// Container
	height: metrics.buttonLarge,
	paddingTop: metrics.spacingMiniSmall,
	paddingBottom: metrics.spacingSmall,

	// Button (touchable area)
	button: {
		paddingVertical: metrics.spacingSmall,
	},

	// Icon
	icon: {
		size: metrics.iconMediumXXL,
	},

	// Label
	label: {
		fontSize: metrics.fontSmall,
		marginTop: metrics.spacingExtraSmall,
		lineHeight: metrics.lineHeightSmall,
	},
};
