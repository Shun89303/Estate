import { View, StyleSheet, TouchableOpacity } from "react-native";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";
import { Coins } from "lucide-react-native";

interface ReserveSheetContentProps {
	propertyTitle: string;
	cost: number;
	currentBalance: number;
	onConfirm: () => void;
	onQuickTopUp: () => void;
	onCancel: () => void;
}

export default function ReserveSheetContent({
	propertyTitle,
	cost,
	currentBalance,
	onConfirm,
	onQuickTopUp,
	onCancel,
}: ReserveSheetContentProps) {
	const hasEnoughBalance = currentBalance >= cost;

	return (
		<View style={styles.container}>
			<Title variant="page" style={styles.title}>
				Reserve Property
			</Title>
			<BodyText variant="normal" style={styles.property}>
				{propertyTitle}
			</BodyText>

			<View style={styles.row}>
				<BodyText variant="normal">Cost:</BodyText>
				<View style={styles.costRow}>
					<Coins size={moderateScale(16)} color={lightColors.brand} />
					<BodyText variant="normal" style={styles.costText}>
						{cost} coins
					</BodyText>
				</View>
			</View>

			<View style={styles.row}>
				<BodyText variant="normal">Your Balance:</BodyText>
				<View style={styles.balanceRow}>
					<Coins size={moderateScale(16)} color={lightColors.brand} />
					<BodyText variant="normal" style={styles.balanceText}>
						{currentBalance} coins
					</BodyText>
				</View>
			</View>

			{!hasEnoughBalance && (
				<BodyText variant="small" style={styles.warning}>
					Insufficient balance. Please top up.
				</BodyText>
			)}

			<View style={styles.buttonRow}>
				<TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
					<BodyText variant="normal" style={styles.cancelText}>
						Cancel
					</BodyText>
				</TouchableOpacity>

				{hasEnoughBalance ? (
					<TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
						<BodyText variant="normal" style={styles.confirmText}>
							Confirm Reserve
						</BodyText>
					</TouchableOpacity>
				) : (
					<TouchableOpacity style={styles.topUpButton} onPress={onQuickTopUp}>
						<BodyText variant="normal" style={styles.topUpText}>
							Quick Top Up
						</BodyText>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { padding: spacing.lg },
	title: { textAlign: "center", marginBottom: spacing.md },
	property: { textAlign: "center", marginBottom: spacing.lg },
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: spacing.md,
	},
	costRow: { flexDirection: "row", alignItems: "center", gap: scaleSize(4) },
	costText: { fontWeight: "600" },
	balanceRow: { flexDirection: "row", alignItems: "center", gap: scaleSize(4) },
	balanceText: { fontWeight: "600" },
	warning: {
		color: lightColors.danger,
		textAlign: "center",
		marginBottom: spacing.md,
	},
	buttonRow: { flexDirection: "row", gap: spacing.md, marginTop: spacing.md },
	cancelButton: {
		flex: 1,
		paddingVertical: spacing.md,
		borderRadius: scaleSize(8),
		alignItems: "center",
		borderWidth: scaleSize(1),
		borderColor: lightColors.mutedBorder,
	},
	cancelText: { color: lightColors.bigTitleText },
	confirmButton: {
		flex: 1,
		paddingVertical: spacing.md,
		borderRadius: scaleSize(8),
		alignItems: "center",
		backgroundColor: lightColors.brand,
	},
	confirmText: { color: "#fff", fontWeight: "600" },
	topUpButton: {
		flex: 1,
		paddingVertical: spacing.md,
		borderRadius: scaleSize(8),
		alignItems: "center",
		backgroundColor: lightColors.brand,
	},
	topUpText: { color: "#fff", fontWeight: "600" },
});
