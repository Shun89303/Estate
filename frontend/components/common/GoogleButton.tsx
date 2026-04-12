import { TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { lightColors } from "@/theme/light";
import { spacing, scaleSize } from "@/utils/metrics";
import SubTitle from "./typography/SubTitle";

interface GoogleButtonProps {
	onPress: () => void;
}

export default function GoogleButton({ onPress }: GoogleButtonProps) {
	return (
		<TouchableOpacity
			style={styles.button}
			onPress={onPress}
			activeOpacity={0.8}
		>
			<AntDesign name="google" size={scaleSize(20)} color="#DB4437" />
			<SubTitle
				variant="normal"
				style={{ color: lightColors.bigTitleText, marginBottom: 0 }}
			>
				Continue with Google
			</SubTitle>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: lightColors.mutedBorder,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.lg,
		borderRadius: scaleSize(12),
		gap: spacing.sm,
		width: "100%",
	},
});
