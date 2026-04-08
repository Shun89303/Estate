import { Text, StyleSheet, TextStyle } from "react-native";
import { ReactNode } from "react";
import { useTheme } from "@/hooks/useTheme";

interface TypographyProps {
	children: ReactNode;
	style?: TextStyle;
	numberOfLines?: number;
}

export function PageTitle({ children, style, numberOfLines }: TypographyProps) {
	const color = useTheme();
	return (
		<Text
			style={[
				styles.pageTitle,
				style,
				{
					color: color.textPrimary,
				},
			]}
			numberOfLines={numberOfLines}
		>
			{children}
		</Text>
	);
}

export function NormalTitle({
	children,
	style,
	numberOfLines,
}: TypographyProps) {
	const color = useTheme();
	return (
		<Text
			style={[
				styles.normalTitle,
				style,
				{
					color: color.textPrimary,
				},
			]}
			numberOfLines={numberOfLines}
		>
			{children}
		</Text>
	);
}

export function SmallTitle({
	children,
	style,
	numberOfLines,
}: TypographyProps) {
	const color = useTheme();
	return (
		<Text
			style={[
				styles.smallTitle,
				style,
				{
					color: color.textPrimary,
				},
			]}
			numberOfLines={numberOfLines}
		>
			{children}
		</Text>
	);
}

export function BodyText({ children, style, numberOfLines }: TypographyProps) {
	const color = useTheme();
	return (
		<Text
			style={[
				styles.bodyText,
				style,
				{
					color: color.textSecondary,
				},
			]}
			numberOfLines={numberOfLines}
		>
			{children}
		</Text>
	);
}

const styles = StyleSheet.create({
	pageTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 8,
	},
	normalTitle: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 4,
	},
	smallTitle: {
		fontSize: 14,
		fontWeight: "500",
		marginBottom: 2,
	},
	bodyText: {
		fontSize: 14,
		fontWeight: "normal",
		lineHeight: 20,
	},
});
