import { useRef, useCallback, useState } from "react";
import { Animated } from "react-native";
import CustomBottomSheet from "../common/utils/CustomBottomSheet";
import QuickTopUpContent from "@/components/reserve/QuickTopUpContent";

export function useQuickTopUpSheet() {
	const [visible, setVisible] = useState(false);
	const slideAnim = useRef(new Animated.Value(0)).current;

	const open = useCallback(() => {
		setVisible(true);
		Animated.timing(slideAnim, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true,
		}).start();
	}, []);

	const close = useCallback(() => {
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => setVisible(false));
	}, []);

	const QuickTopUpSheet = () => (
		<CustomBottomSheet
			visible={visible}
			onClose={close}
			slideAnim={slideAnim}
			height={0.85}
		>
			<QuickTopUpContent onClose={close} />
		</CustomBottomSheet>
	);

	return { open, close, QuickTopUpSheet };
}
