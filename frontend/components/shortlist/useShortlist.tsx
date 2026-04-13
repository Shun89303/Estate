import { useRef, useMemo, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Star } from "lucide-react-native";
import { useShortlistStore } from "@/stores/shortlistStore";
import ShortlistBottomSheetContent from "@/components/shortlist/ShortlistBottomSheetContent";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";

export function useShortlist() {
	const { shortlistedItems } = useShortlistStore();
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const snapPoints = useMemo(() => ["50%", "85%"], []);

	const openSheet = useCallback(() => bottomSheetRef.current?.present(), []);
	const closeSheet = useCallback(() => bottomSheetRef.current?.dismiss(), []);

	const ShortlistButton = () => {
		const count = shortlistedItems.length;
		return (
			<TouchableOpacity onPress={openSheet} style={styles.container}>
				<Star size={moderateScale(20)} color={lightColors.bigTitleText} />
				{count > 0 && (
					<View style={styles.badge}>
						<Text style={styles.badgeText}>{count}</Text>
					</View>
				)}
			</TouchableOpacity>
		);
	};

	const ShortlistBottomSheet = () => (
		<BottomSheetModal
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			enablePanDownToClose
			backgroundStyle={{ backgroundColor: lightColors.background }}
			handleIndicatorStyle={{ backgroundColor: lightColors.bodyText }}
		>
			<ShortlistBottomSheetContent onClose={closeSheet} />
		</BottomSheetModal>
	);

	return { ShortlistButton, ShortlistBottomSheet, openSheet, closeSheet };
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
		padding: spacing.sm,
	},
	badge: {
		position: "absolute",
		top: -scaleSize(4),
		right: -scaleSize(4),
		backgroundColor: lightColors.danger,
		borderRadius: scaleSize(10),
		minWidth: scaleSize(18),
		height: scaleSize(18),
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: scaleSize(4),
	},
	badgeText: {
		color: "#fff",
		fontSize: moderateScale(10),
		fontWeight: "bold",
	},
});
