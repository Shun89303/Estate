import { View, StyleSheet, Pressable } from "react-native";
import { ChevronRight } from "lucide-react-native";
import Title from "../typography/Title";
import BodyText from "../typography/BodyText";
import SubTitle from "../typography/SubTitle";
import { lightColors } from "@/theme/light";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";

export default function SectionHeader({
	title,
	subtitle,
	onPress,
}: {
	title: string;
	subtitle?: string;
	onPress: () => void;
}) {
	return (
		<View style={styles.container}>
			{/* LEFT: Title + Subtitle */}
			<View style={styles.left}>
				<Title variant="normal" style={{ marginBottom: 0 }}>
					{title}
				</Title>
				{subtitle && (
					<BodyText variant="normal" style={styles.subtitle}>
						{subtitle}
					</BodyText>
				)}
			</View>

			{/* RIGHT: See All + Chevron */}
			<Pressable onPress={onPress} style={styles.right}>
				<SubTitle variant="small" style={{ marginBottom: 0 }}>
					See All
				</SubTitle>
				<ChevronRight size={moderateScale(16)} color={lightColors.brand} />
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: spacing.lg, // was 16
		marginBottom: spacing.sm, // was 8
	},
	left: {
		flex: 1,
	},
	subtitle: {
		marginTop: scaleSize(2), // was 2
	},
	right: {
		flexDirection: "row",
		alignItems: "center",
		gap: scaleSize(4), // was 4
	},
});
