import { View, StyleSheet, FlatList } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowDownCircle, ArrowUpCircle, Coins } from "lucide-react-native";
import BackButton from "@/components/common/navigation/BackButton";
import {
	BodyText,
	NormalTitle,
	PageTitle,
} from "@/components/atoms/Typography";
import { useTheme } from "@/hooks/useTheme";
import FilterSection from "@/components/common/utils/FilterSection";
import EmptyState from "@/components/common/state/EmptyState";
import globalStyles from "@/styles/styles";
import { MOCK_COIN_HISTORY } from "@/mock/coinHistory";

export default function CoinHistory() {
	const colors = useTheme();
	const [activeFilter, setActiveFilter] = useState<string>("All");

	const filterOptions = [
		"All",
		"Top Up",
		"Room Reserve",
		"Property Reserve",
		"Business Reserve",
		"Unlock",
		"Refund",
	];

	const filteredHistory =
		activeFilter === "All"
			? MOCK_COIN_HISTORY
			: MOCK_COIN_HISTORY.filter((h) => h.type === activeFilter);

	const mainBoxes = [
		{
			icon: ArrowUpCircle,
			value: "+30",
			title: "Earned / Bought",
			color: colors.primaryGreen,
			textColor: colors.primaryGray,
			bgColor: colors.primaryGreen + "20",
			borderColor: colors.primaryGreen + "50",
		},
		{
			icon: ArrowDownCircle,
			value: "-10",
			title: "Spent",
			color: colors.primaryOrange,
			textColor: colors.primaryGray,
			bgColor: colors.primaryOrange + "20",
			borderColor: colors.primaryOrange + "50",
		},
		{
			icon: Coins,
			value: "20",
			title: "Balance",
			color: colors.primaryGold,
			textColor: colors.primaryGray,
			bgColor: colors.primaryGold + "20",
			borderColor: colors.primaryGold + "50",
		},
	];

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<View style={styles.headerRow}>
				<BackButton />
				<PageTitle style={styles.title}>Coin History</PageTitle>
			</View>

			<View style={styles.boxRow}>
				{mainBoxes.map((box) => (
					<View
						key={box.title}
						style={[
							styles.box,
							{ backgroundColor: box.bgColor, borderColor: box.borderColor },
						]}
					>
						<box.icon size={24} color={box.color} />
						<NormalTitle style={[styles.boxValue, { color: box.color }]}>
							{box.value}
						</NormalTitle>
						<BodyText
							style={[styles.boxTitle, { color: box.textColor, opacity: 0.9 }]}
						>
							{box.title}
						</BodyText>
					</View>
				))}
			</View>

			<FilterSection
				options={filterOptions}
				selected={activeFilter}
				onSelect={setActiveFilter}
				activeBgColor={colors.primaryGold}
				activeTextColor="#fff"
				inactiveBgColor={colors.primaryGray + "10"}
				inactiveTextColor={colors.textPrimary}
				borderRadius={20}
			/>

			{filteredHistory.length === 0 ? (
				<EmptyState
					title="No transactions found"
					message="Try a different filter"
					icon={Coins}
				/>
			) : (
				<FlatList
					data={filteredHistory}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => {
						const isPositive = item.value.startsWith("+");
						return (
							<View style={[styles.card, globalStyles.shadows]}>
								{/* Circular icon background */}
								<View
									style={[
										styles.iconCircle,
										{ backgroundColor: colors.secondaryMute },
									]}
								>
									<Coins
										size={24}
										color={
											isPositive ? colors.primaryGreen : colors.primaryGold
										}
									/>
								</View>
								<View style={styles.cardInfo}>
									<NormalTitle style={styles.cardTitle}>
										{item.title}
									</NormalTitle>
									<View style={styles.cardMetaRow}>
										<BodyText
											style={[styles.cardDate, { color: colors.textSecondary }]}
										>
											{item.date}
										</BodyText>
										<View
											style={[
												styles.typeBadge,
												{ backgroundColor: colors.primaryGold + "20" },
											]}
										>
											<BodyText
												style={[styles.typeText, { color: colors.primaryGold }]}
											>
												{item.type}
											</BodyText>
										</View>
									</View>
								</View>
								<NormalTitle
									style={[
										styles.cardValue,
										{
											color: isPositive
												? colors.primaryGreen
												: colors.primaryGold,
										},
									]}
								>
									{item.value}
								</NormalTitle>
							</View>
						);
					}}
					contentContainerStyle={{ paddingBottom: 20 }}
					showsVerticalScrollIndicator={false}
				/>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16 },
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		marginBottom: 16,
	},
	title: { marginBottom: 0 },
	boxRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
		gap: 12,
	},
	box: {
		flex: 1,
		paddingVertical: 12,
		alignItems: "center",
		borderRadius: 16,
		borderWidth: 1,
	},
	boxValue: {
		fontSize: 18,
		fontWeight: "bold",
		marginVertical: 4,
	},
	boxTitle: {
		fontSize: 12,
		textAlign: "center",
	},
	card: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		borderRadius: 16,
		marginBottom: 12,
		backgroundColor: "#fff",
	},
	iconCircle: {
		width: 44,
		height: 44,
		borderRadius: 22,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
	},
	cardInfo: { flex: 1 },
	cardTitle: { fontSize: 14, fontWeight: "600", marginBottom: 2 },
	cardMetaRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		flexWrap: "wrap",
	},
	cardDate: { fontSize: 11 },
	typeBadge: {
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 12,
	},
	typeText: {
		fontSize: 10,
		fontWeight: "500",
	},
	cardValue: { fontSize: 16, fontWeight: "bold" },
});
