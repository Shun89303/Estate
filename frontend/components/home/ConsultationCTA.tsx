import { useRouter } from "expo-router";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { BodyText, NormalTitle } from "@/components/atoms/Typography";

export default function ConsultationCTA() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => router.push("/booking")}
				activeOpacity={0.8}
			>
				<View style={styles.row}>
					<View style={styles.textColumn}>
						<NormalTitle style={styles.mainText}>
							Book free consultation
						</NormalTitle>
						<BodyText style={styles.subText}>Talk to our agent today</BodyText>
					</View>
					<ChevronRight size={20} color="#fff" />
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	button: {
		backgroundColor: "#da9a0fff",
		paddingVertical: 14,
		paddingHorizontal: 20,
		borderRadius: 20,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	textColumn: {
		flex: 1,
	},
	mainText: {
		color: "#fff",
		marginBottom: 4,
	},
	subText: {
		color: "rgba(255,255,255,0.8)",
		marginLeft: 12,
	},
});
