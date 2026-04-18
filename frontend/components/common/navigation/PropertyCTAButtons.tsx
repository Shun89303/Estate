import { View, StyleSheet, ViewStyle } from "react-native";
import { MessageCircle, Coins } from "lucide-react-native";
import BodyText from "@/components/common/typography/BodyText";
import RequireAuth from "@/components/common/security/RequireAuth";
import { useReserveSheet } from "@/components/reserve/useReserveSheet";
import { useQuickTopUpSheet } from "@/components/reserve/useQuickTopUpSheet";
import { TransactionCategory } from "@/stores/coinStore";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";

interface PropertyCTAButtonsProps {
	propertyTitle: string;
	reserveCoins: number;
	reserveCategory: TransactionCategory;
	onConsultationPress: () => void;
	containerStyle?: ViewStyle;
	consultButtonStyle?: ViewStyle;
	reserveButtonStyle?: ViewStyle;
	consultIconColor?: string;
	reserveIconColor?: string;
	consultTextColor?: string;
	reserveTextColor?: string;
	onReserveSuccess?: () => void;
}

export default function PropertyCTAButtons({
	propertyTitle,
	reserveCoins,
	reserveCategory,
	onConsultationPress,
	containerStyle,
	consultButtonStyle,
	reserveButtonStyle,
	consultIconColor = lightColors.bigTitleText,
	reserveIconColor = "#fff",
	consultTextColor = lightColors.bigTitleText,
	reserveTextColor = lightColors.background,
	onReserveSuccess,
}: PropertyCTAButtonsProps) {
	const { open: openQuickTopUpSheet, QuickTopUpSheet } = useQuickTopUpSheet();
	const { open: openReserveSheet, ReserveSheet } = useReserveSheet({
		onQuickTopUp: openQuickTopUpSheet,
	});

	const handleReserve = () => {
		openReserveSheet({
			propertyTitle,
			cost: reserveCoins,
			category: reserveCategory,
			onSuccess: () => {
				onReserveSuccess?.();
			},
		});
	};

	return (
		<>
			<View style={[styles.container, containerStyle]}>
				<RequireAuth
					onPress={onConsultationPress}
					message="Please log in to book a consultation."
					style={[styles.button, styles.consultButton, consultButtonStyle]}
				>
					<>
						<MessageCircle size={moderateScale(18)} color={consultIconColor} />
						<BodyText
							variant="normal"
							style={[styles.consultText, { color: consultTextColor }]}
						>
							Consultation
						</BodyText>
					</>
				</RequireAuth>
				<RequireAuth
					onPress={handleReserve}
					message="Please log in to reserve this property."
					style={[styles.button, styles.reserveButton, reserveButtonStyle]}
				>
					<>
						<Coins size={moderateScale(18)} color={reserveIconColor} />
						<BodyText
							variant="normal"
							style={[styles.reserveText, { color: reserveTextColor }]}
						>
							Reserve {reserveCoins} Coins
						</BodyText>
					</>
				</RequireAuth>
			</View>
			<ReserveSheet />
			<QuickTopUpSheet />
		</>
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
