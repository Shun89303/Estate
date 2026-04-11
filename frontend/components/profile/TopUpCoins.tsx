import { useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import {
	BodyText,
	NormalTitle,
	PageTitle,
} from "@/components/atoms/Typography";
import { useTheme } from "@/hooks/useTheme";
import { Coins } from "lucide-react-native";
import { MOCK_ONE_TIME_PACKS, MOCK_SUBSCRIPTIONS } from "@/mock/coinPacks";

export default function TopUpCoins() {
	const colors = useTheme();
	const [selectedTab, setSelectedTab] = useState<"oneTime" | "subscriptions">(
		"oneTime",
	);

	const renderOneTimeCard = (item: any) => (
		<TouchableOpacity
			key={item.title}
			style={[
				styles.card,
				{
					backgroundColor: colors.primaryGray + "10",
					borderColor: colors.primaryGray + "50",
				},
				item.popular && {
					borderColor: colors.primaryGold,
					backgroundColor: colors.primaryGold + "10",
				},
			]}
		>
			<Coins size={24} color={colors.primaryGold} style={{ marginRight: 12 }} />
			<View style={{ flex: 1 }}>
				<View style={styles.cardTitleRow}>
					<NormalTitle style={styles.cardTitle}>{item.title}</NormalTitle>
					{item.popular && (
						<View
							style={[
								styles.popularBadge,
								{ backgroundColor: colors.primaryGold + "10" },
							]}
						>
							<BodyText
								style={{
									color: colors.primaryGold,
									fontWeight: "600",
								}}
							>
								POPULAR
							</BodyText>
						</View>
					)}
				</View>
				<BodyText style={styles.cardSubtitle}>{item.subtitle}</BodyText>
			</View>
			<NormalTitle
				style={{
					fontSize: 14,
					fontWeight: "bold",
					color: colors.primaryGold,
				}}
			>
				{item.value}
			</NormalTitle>
		</TouchableOpacity>
	);

	const renderSubscriptionCard = (item: any) => (
		<TouchableOpacity
			key={item.title}
			style={[
				styles.card,
				{
					backgroundColor: colors.primaryGold + 20,
					borderColor: colors.primaryGold + 50,
				},
				item.vip && {
					backgroundColor: colors.primaryPurple + "20",
					borderColor: colors.primaryPurple + "80",
				},
			]}
		>
			<View
				style={[
					styles.iconContainer,
					{ backgroundColor: item.iconColor + "20" },
				]}
			>
				<item.icon size={24} color={item.iconColor} />
			</View>
			<View style={{ flex: 1 }}>
				<NormalTitle style={styles.cardTitle}>{item.title}</NormalTitle>
				<BodyText style={styles.cardSubtitle}>{item.subtitle}</BodyText>
			</View>
			<View style={{ alignItems: "flex-end" }}>
				<NormalTitle
					style={{
						fontSize: 14,
						fontWeight: "bold",
						color: colors.textPrimary,
					}}
				>
					{item.value}
				</NormalTitle>
				{item.subValue && (
					<BodyText
						style={{
							fontSize: 11,
							color: colors.primaryGreen,
						}}
					>
						{item.subValue}
					</BodyText>
				)}
			</View>
		</TouchableOpacity>
	);

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				<PageTitle style={styles.headerTitle}>Buy Coins</PageTitle>
				<View style={styles.balanceRow}>
					<BodyText style={styles.balanceLabel}>Current balance:</BodyText>
					<BodyText
						style={[styles.balanceAmount, { color: colors.primaryGold }]}
					>
						20 coins
					</BodyText>
				</View>
			</View>

			{/* Segmented toggle */}
			<View style={styles.toggleContainer}>
				<TouchableOpacity
					style={[
						styles.toggleButton,
						selectedTab === "oneTime" && styles.toggleButtonActive,
					]}
					onPress={() => setSelectedTab("oneTime")}
				>
					<BodyText
						style={
							selectedTab === "oneTime"
								? [styles.toggleText, styles.toggleTextActive]
								: styles.toggleText
						}
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
						style={
							selectedTab === "subscriptions"
								? [styles.toggleText, styles.toggleTextActive]
								: styles.toggleText
						}
					>
						Subscriptions
					</BodyText>
				</TouchableOpacity>
			</View>

			{/* Cards */}
			{selectedTab === "oneTime"
				? MOCK_ONE_TIME_PACKS.map((item) => renderOneTimeCard(item))
				: MOCK_SUBSCRIPTIONS.map((item) => renderSubscriptionCard(item))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	header: {
		alignItems: "center",
		marginBottom: 24,
	},
	headerTitle: {
		marginBottom: 4,
	},
	balanceText: {
		fontSize: 12,
	},
	toggleContainer: {
		flexDirection: "row",
		backgroundColor: "#f0f0f0",
		borderRadius: 30,
		padding: 4,
		marginBottom: 20,
	},
	toggleButton: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 8,
		borderRadius: 30,
	},
	toggleButtonActive: {
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
	},
	toggleText: {
		fontSize: 14,
		fontWeight: "500",
		color: "#666",
	},
	toggleTextActive: {
		color: "#000",
		fontWeight: "600",
	},
	card: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		borderRadius: 16,
		borderWidth: 1,
		marginBottom: 10,
	},
	cardTitleRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 2,
	},
	cardTitle: {
		fontSize: 14,
		fontWeight: "600",
	},
	popularBadge: {
		borderRadius: 99,
		paddingHorizontal: 6,
		paddingVertical: 2,
		marginLeft: 8,
	},
	cardSubtitle: {
		fontSize: 12,
		color: "#666",
	},
	balanceRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	balanceLabel: {
		fontSize: 12,
	},
	balanceAmount: {
		fontSize: 12,
		fontWeight: "600",
	},
	iconContainer: {
		width: 40,
		height: 40,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
	},
});
