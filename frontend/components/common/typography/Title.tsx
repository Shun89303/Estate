// components/atoms/Title.tsx
import { Text, StyleSheet, TextStyle } from "react-native";
import { ReactNode } from "react";
import { fontSizes, spacing, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";

type TitleVariant = "page" | "normal" | "small";

interface TitleProps {
	children: ReactNode;
	variant?: TitleVariant;
	style?: TextStyle;
	numberOfLines?: number;
	allowFontScaling?: boolean;
	maxFontSizeMultiplier?: number;
}

export default function Title({
	children,
	variant = "normal",
	style,
	numberOfLines,
	allowFontScaling = true,
	maxFontSizeMultiplier = 1.2,
}: TitleProps) {
	const variantStyles = {
		page: styles.pageTitle,
		normal: styles.normalTitle,
		small: styles.smallTitle,
	};

	return (
		<Text
			style={[
				variantStyles[variant],
				{ color: lightColors.bigTitleText },
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
	pageTitle: {
		fontSize: fontSizes.xxxl,
		fontWeight: "bold",
		marginBottom: spacing.sm,
		lineHeight: moderateScale(32),
	},
	normalTitle: {
		fontSize: fontSizes.xl,
		fontWeight: "600",
		marginBottom: spacing.xs,
		lineHeight: moderateScale(24),
	},
	smallTitle: {
		fontSize: fontSizes.md,
		fontWeight: "500",
		marginBottom: spacing.xs,
		lineHeight: moderateScale(20),
	},
});
