import { View, StyleSheet, ViewStyle } from "react-native";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";

type Direction = "row" | "column";

interface ChipListProps {
	items: string[];
	title?: string;
	direction?: Direction;
	icon?: React.ComponentType<{ size?: number; color?: string }>;
	iconColor?: string;
	iconSize?: number;
	textColor?: string;
	backgroundColor?: string;
	chipStyle?: ViewStyle;
	textVariant?: "small" | "normal" | "large";
	titleVariant?: "page" | "normal" | "small";
}

export default function ChipList({
	items,
	title,
	direction = "row",
	icon: Icon,
	iconColor = lightColors.success,
	iconSize = moderateScale(14),
	textColor = lightColors.bigTitleText,
	backgroundColor = lightColors.mutedBackgroundWeaker,
	chipStyle,
	textVariant = "normal",
	titleVariant = "small",
}: ChipListProps) {
	const containerStyle =
		direction === "row" ? styles.rowContainer : styles.columnContainer;

	return (
		<View style={{ marginBottom: spacing.lg }}>
			{title && (
				<Title variant={titleVariant} style={styles.title}>
					{title}
				</Title>
			)}
			<View style={containerStyle}>
				{items.map((item) => (
					<View
						key={item}
						style={[styles.chip, { backgroundColor }, chipStyle]}
					>
						{Icon && <Icon size={iconSize} color={iconColor} />}
						<BodyText
							variant={textVariant}
							style={[styles.text, { color: textColor }]}
						>
							{item}
						</BodyText>
					</View>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		marginBottom: spacing.sm,
	},
	rowContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: spacing.sm,
	},
	columnContainer: {
		flexDirection: "column",
		gap: spacing.sm,
	},
	chip: {
		flexDirection: "row",
		alignItems: "center",
		gap: scaleSize(6),
		paddingVertical: scaleSize(6),
		paddingHorizontal: spacing.sm,
		borderRadius: scaleSize(10),
		alignSelf: "flex-start",
	},
	text: {
		marginBottom: 0,
	},
});
