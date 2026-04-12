// components/atoms/BodyText.tsx
import { Text, StyleSheet, TextStyle } from "react-native";
import { ReactNode } from "react";
import { fontSizes, spacing, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";

type BodyTextVariant = "small" | "normal" | "large";

interface BodyTextProps {
	children: ReactNode;
	variant?: BodyTextVariant;
	style?: TextStyle | (TextStyle | false | null | undefined)[];
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

	// Build an array of style objects
	let styleArray: TextStyle[] = [
		variantStyles[variant],
		{ color: lightColors.bodyText || "#717684" },
	];

	if (style) {
		if (Array.isArray(style)) {
			// Filter out falsy values and assert the type is TextStyle[]
			const validStyles = style.filter((s): s is TextStyle => !!s);
			styleArray.push(...validStyles);
		} else {
			styleArray.push(style);
		}
	}

	// Flatten to a single style object
	const finalStyle = StyleSheet.flatten(styleArray);

	return (
		<Text
			style={finalStyle}
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
		fontSize: fontSizes.xs,
		fontWeight: "normal",
		marginBottom: spacing.xs,
		lineHeight: moderateScale(14),
	},
	normalBody: {
		fontSize: fontSizes.sm,
		fontWeight: "normal",
		marginBottom: spacing.xs,
		lineHeight: moderateScale(18),
	},
	largeBody: {
		fontSize: fontSizes.md,
		fontWeight: "normal",
		marginBottom: spacing.xs,
		lineHeight: moderateScale(22),
	},
});
