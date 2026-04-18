import { useRef, useCallback, useState } from "react";
import { Animated, Alert } from "react-native";
import CustomBottomSheet from "../common/utils/CustomBottomSheet";
import ReserveSheetContent from "@/components/reserve/ReserveSheetContent";
import { useAuthStore } from "@/stores/authStore";
import { useCoinStore, TransactionCategory } from "@/stores/coinStore";

interface UseReserveSheetOptions {
	onQuickTopUp?: () => void;
}

export function useReserveSheet({ onQuickTopUp }: UseReserveSheetOptions = {}) {
	const [visible, setVisible] = useState(false);
	const [options, setOptions] = useState<{
		propertyTitle: string;
		cost: number;
		category: TransactionCategory;
		onSuccess?: () => void;
	} | null>(null);
	const slideAnim = useRef(new Animated.Value(0)).current;
	const { user } = useAuthStore();
	const { coins, deductCoins } = useCoinStore();

	const open = useCallback(
		(reserveOptions: {
			propertyTitle: string;
			cost: number;
			category: TransactionCategory;
			onSuccess?: () => void;
		}) => {
			setOptions(reserveOptions);
			setVisible(true);
			Animated.timing(slideAnim, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start();
		},
		[],
	);

	const close = useCallback(() => {
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => {
			setVisible(false);
			setOptions(null);
		});
	}, []);

	const handleConfirm = async () => {
		if (!options || !user?.uid) return;
		const success = await deductCoins(
			user.uid,
			options.cost,
			options.category,
			`Reserved: ${options.propertyTitle}`,
		);
		if (success) {
			Alert.alert(
				"Success",
				`You have reserved ${options.propertyTitle} for ${options.cost} coins.`,
			);
			options.onSuccess?.();
			close();
		} else {
			Alert.alert("Error", "Insufficient coins. Please top up.");
			close();
		}
	};

	const handleQuickTopUp = () => {
		close();
		if (onQuickTopUp) onQuickTopUp();
	};

	const ReserveSheet = () => (
		<CustomBottomSheet
			visible={visible}
			onClose={close}
			slideAnim={slideAnim}
			height={0.5}
		>
			{options && (
				<ReserveSheetContent
					propertyTitle={options.propertyTitle}
					cost={options.cost}
					currentBalance={coins}
					onConfirm={handleConfirm}
					onQuickTopUp={handleQuickTopUp}
					onCancel={close}
				/>
			)}
		</CustomBottomSheet>
	);

	return { open, close, ReserveSheet };
}
