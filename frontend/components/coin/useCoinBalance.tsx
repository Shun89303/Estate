import { useRef, useMemo, useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Coins } from "lucide-react-native";
import { lightColors } from "@/theme/light";
import { useUserStore } from "@/stores/userStore";
import BuyCoins from "@/components/ownerDirect/BuyCoins";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import SubTitle from "@/components/common/typography/SubTitle";

export function useCoinBalance() {
	const { coins } = useUserStore();
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const snapPoints = useMemo(() => ["40%"], []);

	const openSheet = useCallback(() => bottomSheetRef.current?.present(), []);
	const closeSheet = useCallback(() => bottomSheetRef.current?.dismiss(), []);

	const CoinButton = () => (
		<Pressable
			style={[
				styles.coinButton,
				{
					backgroundColor: lightColors.brandBG,
					borderWidth: scaleSize(1),
					borderRadius: scaleSize(15),
					borderColor: lightColors.brand,
				},
			]}
			onPress={openSheet}
		>
			<Coins size={moderateScale(20)} color={lightColors.brand} />
			<SubTitle style={{ marginLeft: spacing.xs, marginBottom: 0 }}>
				{coins}
			</SubTitle>
		</Pressable>
	);

	const CoinBottomSheet = () => (
		<BottomSheetModal
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			enablePanDownToClose
			backgroundStyle={{ backgroundColor: lightColors.background }}
			handleIndicatorStyle={{ backgroundColor: lightColors.bodyText }}
		>
			<BuyCoins onClose={closeSheet} />
		</BottomSheetModal>
	);

	return { CoinButton, CoinBottomSheet, openSheet, closeSheet };
}

const styles = StyleSheet.create({
	coinButton: {
		flexDirection: "row",
		alignItems: "center",
		padding: spacing.sm,
	},
});
