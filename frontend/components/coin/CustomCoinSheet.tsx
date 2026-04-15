import {
	View,
	StyleSheet,
	Animated,
	TouchableWithoutFeedback,
	Pressable,
	Dimensions,
} from "react-native";
import { X } from "lucide-react-native";
import { lightColors } from "@/theme/light";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import Title from "@/components/common/typography/Title";
import BuyCoins from "@/components/ownerDirect/BuyCoins";
import globalStyles from "@/styles/styles";

const { height: screenHeight } = Dimensions.get("window");

interface CustomCoinSheetProps {
	visible: boolean;
	onClose: () => void;
	slideAnim: Animated.Value;
}

export default function CustomCoinSheet({
	visible,
	onClose,
	slideAnim,
}: CustomCoinSheetProps) {
	if (!visible) return null;

	return (
		<>
			{/* Backdrop */}
			<TouchableWithoutFeedback onPress={onClose}>
				<Animated.View
					style={[
						styles.backdrop,
						{
							opacity: slideAnim.interpolate({
								inputRange: [0, 1],
								outputRange: [0, 0.5],
							}),
						},
					]}
				/>
			</TouchableWithoutFeedback>

			{/* Sheet Container */}
			<Animated.View
				style={[
					styles.sheetContainer,
					{
						transform: [
							{
								translateY: slideAnim.interpolate({
									inputRange: [0, 1],
									outputRange: [screenHeight, 0],
								}),
							},
						],
						height: screenHeight * 0.55,
					},
				]}
			>
				<View style={styles.sheetHandle} />
				<BuyCoins onClose={onClose} />
			</Animated.View>
		</>
	);
}

const styles = StyleSheet.create({
	backdrop: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "#000",
	},
	sheetContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: lightColors.background,
		borderTopLeftRadius: scaleSize(20),
		borderTopRightRadius: scaleSize(20),
		...globalStyles.shadows,
	},
	sheetHandle: {
		width: scaleSize(40),
		height: scaleSize(4),
		backgroundColor: lightColors.mutedBorder,
		borderRadius: scaleSize(2),
		alignSelf: "center",
		marginTop: spacing.sm,
		marginBottom: spacing.md,
	},
	header: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		paddingHorizontal: spacing.lg,
		marginBottom: spacing.md,
	},
	headerTitle: {
		marginBottom: 0,
	},
	closeButton: {
		padding: spacing.sm,
	},
});
