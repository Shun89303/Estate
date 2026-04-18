import { useRef, useCallback, useState } from "react";
import { Animated } from "react-native";
import TopUpCoins from "@/components/profile/TopUpCoins";
import CustomBottomSheet from "../common/utils/CustomBottomSheet";

export function useTopUpSheet() {
	const [visible, setVisible] = useState(false);
	const slideAnim = useRef(new Animated.Value(0)).current;

	const open = useCallback(() => {
		setVisible(true);
		Animated.timing(slideAnim, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true,
		}).start();
	}, [slideAnim]);

	const close = useCallback(() => {
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => setVisible(false));
	}, [slideAnim]);

	const TopUpSheet = () => (
		<CustomBottomSheet
			visible={visible}
			onClose={close}
			slideAnim={slideAnim}
			height={0.85}
		>
			<TopUpCoins onClose={close} />
		</CustomBottomSheet>
	);

	return { open, close, TopUpSheet };
}
