import { useState, useRef, useCallback } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Animated,
	Dimensions,
	TouchableWithoutFeedback,
} from "react-native";
import { Star } from "lucide-react-native";
import { useShortlistStore } from "@/stores/shortlistStore";
import ShortlistBottomSheetContent from "@/components/shortlist/ShortlistBottomSheetContent";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";
import globalStyles from "@/styles/styles";

const { height: screenHeight } = Dimensions.get("window");

export function useShortlist() {
	const { shortlistedItems } = useShortlistStore();
	const [showSheet, setShowSheet] = useState(false);
	const slideAnim = useRef(new Animated.Value(0)).current;

	const openSheet = useCallback(() => {
		setShowSheet(true);
		Animated.timing(slideAnim, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true,
		}).start();
	}, []);

	const closeSheet = useCallback(() => {
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => setShowSheet(false));
	}, []);

	const ShortlistButton = () => {
		const count = shortlistedItems.length;
		const hasItems = count > 0;

		return (
			<TouchableOpacity
				onPress={openSheet}
				style={[
					styles.buttonContainer,
					hasItems && styles.buttonWithBackground,
				]}
			>
				<Star
					size={moderateScale(20)}
					color={hasItems ? lightColors.brand : lightColors.bigTitleText}
					fill={hasItems ? lightColors.brand : "transparent"}
				/>
				{hasItems && (
					<View style={[styles.badge, styles.badgeWithGold]}>
						<Text style={styles.badgeText}>{count}</Text>
					</View>
				)}
			</TouchableOpacity>
		);
	};

	const ShortlistBottomSheet = () => (
		<>
			{showSheet && (
				<>
					{/* Backdrop */}
					<TouchableWithoutFeedback onPress={closeSheet}>
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
								height: screenHeight * 0.75,
							},
						]}
					>
						<View style={styles.sheetHandle} />
						<ShortlistBottomSheetContent onClose={closeSheet} />
					</Animated.View>
				</>
			)}
		</>
	);

	return { ShortlistButton, ShortlistBottomSheet, openSheet, closeSheet };
}

const styles = StyleSheet.create({
	buttonContainer: {
		position: "relative",
		padding: spacing.sm,
		borderRadius: scaleSize(8),
	},
	buttonWithBackground: {
		backgroundColor: lightColors.brandBG,
	},
	badge: {
		position: "absolute",
		top: -scaleSize(4),
		right: -scaleSize(4),
		borderRadius: scaleSize(10),
		minWidth: scaleSize(18),
		height: scaleSize(18),
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: scaleSize(4),
	},
	badgeWithGold: {
		backgroundColor: lightColors.brand,
	},
	badgeText: {
		color: "#fff",
		fontSize: moderateScale(10),
		fontWeight: "bold",
	},
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
