import { Text, StyleSheet, TextStyle, StyleProp } from "react-native";
import { ReactNode } from "react";
import { fontSizes, spacing, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";

type SubTitleVariant = "small" | "normal" | "large";

interface SubTitleProps {
	children: ReactNode;
	variant?: SubTitleVariant;
	style?: StyleProp<TextStyle>;
	numberOfLines?: number;
	allowFontScaling?: boolean;
	maxFontSizeMultiplier?: number;
}

export default function SubTitle({
	children,
	variant = "normal",
	style,
	numberOfLines,
	allowFontScaling = true,
	maxFontSizeMultiplier = 1.2,
}: SubTitleProps) {
	const variantStyles = {
		small: styles.smallSubtitle,
		normal: styles.normalSubtitle,
		large: styles.largeSubtitle,
	};

	const combinedStyle = StyleSheet.flatten([
		variantStyles[variant],
		{ color: lightColors.subTitleText || "hsla(30, 52%, 55%, 1.00)" },
		style,
	]);

	return (
		<Text
			style={combinedStyle}
			numberOfLines={numberOfLines}
			allowFontScaling={allowFontScaling}
			maxFontSizeMultiplier={maxFontSizeMultiplier}
		>
			{children}
		</Text>
	);
}

const styles = StyleSheet.create({
	smallSubtitle: {
		fontSize: fontSizes.sm,
		fontWeight: "500",
		marginBottom: spacing.xs,
		lineHeight: moderateScale(16),
	},
	normalSubtitle: {
		fontSize: fontSizes.md,
		fontWeight: "500",
		marginBottom: spacing.xs,
		lineHeight: moderateScale(20),
	},
	largeSubtitle: {
		fontSize: fontSizes.lg,
		fontWeight: "500",
		marginBottom: spacing.xs,
		lineHeight: moderateScale(24),
	},
});
