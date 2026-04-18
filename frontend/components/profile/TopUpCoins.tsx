import { useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Coins } from "lucide-react-native";
import { MOCK_ONE_TIME_PACKS, MOCK_SUBSCRIPTIONS } from "@/mock/coinPacks";
import { useAuthStore } from "@/stores/authStore";
import { useCoinStore } from "@/stores/coinStore";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";
import globalStyles from "@/styles/styles";

interface TopUpCoinsProps {
	onClose: () => void;
}

export default function TopUpCoins({ onClose }: TopUpCoinsProps) {
	const { user } = useAuthStore();
	const { coins, addCoins } = useCoinStore();
	const [selectedTab, setSelectedTab] = useState<"oneTime" | "subscriptions">(
		"oneTime",
	);

	const handlePurchase = (
		coinsAmount: number,
		priceDisplay: string,
		isSubscription?: boolean,
	) => {
		if (user?.uid) {
			const note = isSubscription
				? `Purchased ${coinsAmount} Coins (${priceDisplay})`
				: `Purchased ${coinsAmount} Coins (${priceDisplay})`;
			addCoins(user.uid, coinsAmount, note);
		}
		onClose();
	};

	const renderOneTimeCard = (item: (typeof MOCK_ONE_TIME_PACKS)[0]) => (
		<TouchableOpacity
			key={item.title}
			style={[
				styles.card,
				{
					backgroundColor: lightColors.mutedBackgroundWeaker,
					borderColor: lightColors.mutedBorder,
				},
				item.popular && {
					borderColor: lightColors.brand,
					backgroundColor: lightColors.brandBG,
				},
			]}
			onPress={() => handlePurchase(item.coins, item.value, false)}
			activeOpacity={0.7}
		>
			<Coins size={moderateScale(24)} color={lightColors.brand} />
			<View style={styles.cardInfo}>
				<View style={styles.cardTitleRow}>
					<Title variant="small" style={styles.cardTitle}>
						{item.title}
					</Title>
					{item.popular && (
						<View
							style={[
								styles.popularBadge,
								{ backgroundColor: lightColors.brandBG },
							]}
						>
							<BodyText
								variant="small"
								style={{ color: lightColors.brand, fontWeight: "600" }}
							>
								POPULAR
							</BodyText>
						</View>
					)}
				</View>
				<BodyText variant="small" style={styles.cardSubtitle}>
					{item.subtitle}
				</BodyText>
			</View>
			<Title variant="small" style={styles.cardValue}>
				{item.value}
			</Title>
		</TouchableOpacity>
	);

	const renderSubscriptionCard = (item: (typeof MOCK_SUBSCRIPTIONS)[0]) => (
		<TouchableOpacity
			key={item.title}
			style={[
				styles.card,
				{
					backgroundColor: lightColors.mutedBackgroundWeaker,
					borderColor: lightColors.mutedBorder,
				},
				item.vip && {
					backgroundColor: lightColors.brandBG,
					borderColor: lightColors.brand,
				},
			]}
			onPress={() => handlePurchase(item.coinsPerMonth, item.value, true)}
			activeOpacity={0.7}
		>
			<View
				style={[styles.iconContainer, { backgroundColor: lightColors.brandBG }]}
			>
				<item.icon size={moderateScale(24)} color={item.iconColor} />
			</View>
			<View style={styles.cardInfo}>
				<Title variant="small" style={styles.cardTitle}>
					{item.title}
				</Title>
				<BodyText variant="small" style={styles.cardSubtitle}>
					{item.subtitle}
				</BodyText>
			</View>
			<View style={styles.rightContainer}>
				<Title variant="small" style={styles.cardValue}>
					{item.value}
				</Title>
				<BodyText variant="small" style={styles.subValue}>
					{item.subValue}
				</BodyText>
			</View>
		</TouchableOpacity>
	);

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				<Title variant="page">Buy Coins</Title>
				<View style={styles.balanceRow}>
					<BodyText variant="small" style={styles.balanceLabel}>
						Current balance:
					</BodyText>
					<BodyText
						variant="small"
						style={[styles.balanceAmount, { color: lightColors.brand }]}
					>
						{coins} coins
					</BodyText>
				</View>
			</View>

			<View style={styles.toggleContainer}>
				<TouchableOpacity
					style={[
						styles.toggleButton,
						selectedTab === "oneTime" && styles.toggleButtonActive,
					]}
					onPress={() => setSelectedTab("oneTime")}
				>
					<BodyText
						variant="small"
						style={[
							styles.toggleText,
							selectedTab === "oneTime" && styles.toggleTextActive,
						]}
					>
						One-time Packs
					</BodyText>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.toggleButton,
						selectedTab === "subscriptions" && styles.toggleButtonActive,
					]}
					onPress={() => setSelectedTab("subscriptions")}
				>
					<BodyText
						variant="small"
						style={[
							styles.toggleText,
							selectedTab === "subscriptions" && styles.toggleTextActive,
						]}
					>
						Subscriptions
					</BodyText>
				</TouchableOpacity>
			</View>

			{selectedTab === "oneTime"
				? MOCK_ONE_TIME_PACKS.map(renderOneTimeCard)
				: MOCK_SUBSCRIPTIONS.map(renderSubscriptionCard)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: spacing.lg,
	},
	header: {
		alignItems: "center",
		marginBottom: spacing.xl,
	},
	balanceRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: scaleSize(4),
	},
	balanceLabel: {
		color: lightColors.bodyText,
	},
	balanceAmount: {
		fontWeight: "600",
	},
	toggleContainer: {
		flexDirection: "row",
		backgroundColor: lightColors.mutedBackground,
		borderRadius: scaleSize(30),
		padding: scaleSize(4),
		marginBottom: spacing.lg,
	},
	toggleButton: {
		flex: 1,
		alignItems: "center",
		paddingVertical: scaleSize(8),
		borderRadius: scaleSize(30),
	},
	toggleButtonActive: {
		backgroundColor: lightColors.background,
		...globalStyles.shadows,
	},
	toggleText: {
		color: lightColors.bodyText,
	},
	toggleTextActive: {
		color: lightColors.bigTitleText,
		fontWeight: "600",
	},
	card: {
		flexDirection: "row",
		alignItems: "center",
		padding: spacing.md,
		borderRadius: scaleSize(16),
		borderWidth: scaleSize(1),
		marginBottom: spacing.sm,
		gap: spacing.sm,
	},
	cardInfo: {
		flex: 1,
	},
	cardTitleRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: scaleSize(2),
	},
	cardTitle: {
		fontWeight: "600",
	},
	popularBadge: {
		borderRadius: scaleSize(99),
		paddingHorizontal: scaleSize(6),
		paddingVertical: scaleSize(2),
		marginLeft: spacing.sm,
	},
	cardSubtitle: {
		color: lightColors.bodyText,
	},
	cardValue: {
		color: lightColors.brand,
		fontWeight: "bold",
	},
	rightContainer: {
		alignItems: "flex-end",
	},
	subValue: {
		color: lightColors.success,
	},
	iconContainer: {
		width: scaleSize(40),
		height: scaleSize(40),
		borderRadius: scaleSize(12),
		alignItems: "center",
		justifyContent: "center",
	},
});
