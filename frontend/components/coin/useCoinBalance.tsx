import { useRef, useCallback, useState } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import { Coins } from "lucide-react-native";
import { lightColors } from "@/theme/light";
import { useUserStore } from "@/stores/userStore";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import SubTitle from "@/components/common/typography/SubTitle";
import CustomCoinSheet from "./CustomCoinSheet";

export function useCoinBalance() {
	const { coins } = useUserStore();
	const [visible, setVisible] = useState(false);
	const slideAnim = useRef(new Animated.Value(0)).current;

	const openSheet = useCallback(() => {
		setVisible(true);
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
		}).start(() => setVisible(false));
	}, []);

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
		<CustomCoinSheet
			visible={visible}
			onClose={closeSheet}
			slideAnim={slideAnim}
		/>
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
