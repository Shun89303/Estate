import { useRouter } from "expo-router";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronRight } from "lucide-react-native";
import Title from "../common/typography/Title";
import BodyText from "../common/typography/BodyText";
import { lightColors } from "@/theme/light";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";

export default function ConsultationCTA() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => router.push("/")}
				activeOpacity={0.8}
			>
				<View style={styles.row}>
					<View style={styles.textColumn}>
						<Title
							style={{
								color: lightColors.background,
								marginBottom: 0,
							}}
						>
							Book free consultation
						</Title>
						<BodyText
							style={{
								color: lightColors.background,
								marginLeft: spacing.md,
								marginBottom: 0,
							}}
						>
							Talk to our agent today
						</BodyText>
					</View>
					<ChevronRight
						size={moderateScale(20)}
						color={lightColors.background}
					/>
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: spacing.lg,
	},
	button: {
		backgroundColor: lightColors.brand,
		paddingVertical: scaleSize(14),
		paddingHorizontal: scaleSize(20),
		borderRadius: scaleSize(20),
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	textColumn: {
		flex: 1,
	},
});
