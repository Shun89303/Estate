import { View, StyleSheet, Pressable } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { BodyText, NormalTitle, SmallTitle } from "../../atoms/Typography";

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
				<NormalTitle>{title}</NormalTitle>
				{subtitle && <BodyText style={styles.subtitle}>{subtitle}</BodyText>}
			</View>

			{/* RIGHT: See All + Chevron */}
			<Pressable onPress={onPress} style={styles.right}>
				<SmallTitle style={styles.seeAllText}>See All</SmallTitle>
				<ChevronRight size={16} color="#D4AF37" />
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		marginBottom: 8,
	},
	left: {
		flex: 1,
	},
	subtitle: {
		fontSize: 12,
		color: "#666",
		marginTop: 2,
	},
	right: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	seeAllText: {
		color: "#D4AF37", // dark gold
	},
});
