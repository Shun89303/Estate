import { View, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { MessageCircle, Coins } from "lucide-react-native";
import BodyText from "@/components/common/typography/BodyText";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";

interface PropertyCTAButtonsProps {
	reserveCoins: number;
	onConsultationPress: () => void;
	onReservePress: () => void;
	containerStyle?: ViewStyle;
	consultButtonStyle?: ViewStyle;
	reserveButtonStyle?: ViewStyle;
	consultIconColor?: string;
	reserveIconColor?: string;
	consultTextColor?: string;
	reserveTextColor?: string;
}

export default function PropertyCTAButtons({
	reserveCoins,
	onConsultationPress,
	onReservePress,
	containerStyle,
	consultButtonStyle,
	reserveButtonStyle,
	consultIconColor = lightColors.bigTitleText,
	reserveIconColor = "#fff",
	consultTextColor = lightColors.bigTitleText,
	reserveTextColor = lightColors.background,
}: PropertyCTAButtonsProps) {
	return (
		<View style={[styles.container, containerStyle]}>
			<TouchableOpacity
				style={[styles.button, styles.consultButton, consultButtonStyle]}
				onPress={onConsultationPress}
			>
				<MessageCircle size={moderateScale(18)} color={consultIconColor} />
				<BodyText
					variant="normal"
					style={[styles.consultText, { color: consultTextColor }]}
				>
					Consultation
				</BodyText>
			</TouchableOpacity>
			<TouchableOpacity
				style={[styles.button, styles.reserveButton, reserveButtonStyle]}
				onPress={onReservePress}
			>
				<Coins size={moderateScale(18)} color={reserveIconColor} />
				<BodyText
					variant="normal"
					style={[styles.reserveText, { color: reserveTextColor }]}
				>
					Reserve {reserveCoins} Coins
				</BodyText>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.md,
		backgroundColor: lightColors.background,
		gap: spacing.md,
	},
	button: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: spacing.sm,
		paddingVertical: spacing.md,
		borderRadius: scaleSize(15),
	},
	consultButton: {
		backgroundColor: lightColors.background,
		borderWidth: scaleSize(1),
		borderColor: lightColors.mutedBorder,
	},
	reserveButton: {
		backgroundColor: lightColors.brand,
	},
	consultText: {
		marginBottom: 0,
		fontWeight: "700",
	},
	reserveText: {
		marginBottom: 0,
		fontWeight: "700",
	},
});
