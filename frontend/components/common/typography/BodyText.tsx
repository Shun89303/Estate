// components/atoms/BodyText.tsx
import { Text, StyleSheet, TextStyle } from "react-native";
import { ReactNode } from "react";
import { fontSizes, spacing, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";

type BodyTextVariant = "small" | "normal" | "large";

interface BodyTextProps {
	children: ReactNode;
	variant?: BodyTextVariant;
	style?: TextStyle;
	numberOfLines?: number;
	allowFontScaling?: boolean;
	maxFontSizeMultiplier?: number;
}

export default function BodyText({
	children,
	variant = "normal",
	style,
	numberOfLines,
	allowFontScaling = true,
	maxFontSizeMultiplier = 1.2,
}: BodyTextProps) {
	const variantStyles = {
		small: styles.smallBody,
		normal: styles.normalBody,
		large: styles.largeBody,
	};

	return (
		<Text
			style={[
				variantStyles[variant],
				{ color: lightColors.bodyText || "#717684" },
				style,
			]}
			numberOfLines={numberOfLines}
			allowFontScaling={allowFontScaling}
			maxFontSizeMultiplier={maxFontSizeMultiplier}
		>
			{children}
		</Text>
	);
}

const styles = StyleSheet.create({
	smallBody: {
		fontSize: fontSizes.xs, // 10dp scaled
		fontWeight: "normal",
		marginBottom: spacing.xs, // 4dp
		lineHeight: moderateScale(14),
	},
	normalBody: {
		fontSize: fontSizes.sm, // 12dp scaled
		fontWeight: "normal",
		marginBottom: spacing.xs, // 4dp
		lineHeight: moderateScale(18),
	},
	largeBody: {
		fontSize: fontSizes.md, // 14dp scaled
		fontWeight: "normal",
		marginBottom: spacing.xs, // 4dp
		lineHeight: moderateScale(22),
	},
});
