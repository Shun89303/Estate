import {
	View,
	TouchableWithoutFeedback,
	Animated,
	StyleSheet,
	Dimensions,
} from "react-native";
import { spacing, scaleSize } from "@/utils/metrics";
import { lightColors } from "@/theme/light";
import globalStyles from "@/styles/styles";

const { height: screenHeight } = Dimensions.get("window");

interface CustomBottomSheetProps {
	visible: boolean;
	onClose: () => void;
	slideAnim: Animated.Value;
	children: React.ReactNode;
	height?: number; // percentage of screen height (0-1)
}

export default function CustomBottomSheet({
	visible,
	onClose,
	slideAnim,
	children,
	height = 0.85,
}: CustomBottomSheetProps) {
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
						height: screenHeight * height,
					},
				]}
			>
				<View style={styles.sheetHandle} />
				{children}
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
});
