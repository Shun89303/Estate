import { View, StyleSheet, FlatList } from "react-native";
import { useState, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowDownCircle, ArrowUpCircle, Coins } from "lucide-react-native";
import BackButton from "@/components/common/navigation/BackButton";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";
import FilterSection from "@/components/common/utils/FilterSection";
import EmptyState from "@/components/common/state/EmptyState";
import globalStyles from "@/styles/styles";
import { useCoinStore, Transaction } from "@/stores/coinStore";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";

const FILTER_OPTIONS = [
	"All",
	"Top Up",
	"Room Reserve",
	"Property Reserve",
	"Business Reserve",
	"Unlock",
	"Refund",
];

export default function CoinHistory() {
	const { coins, history } = useCoinStore();
	const [activeFilter, setActiveFilter] = useState<string>("All");

	const filteredHistory = useMemo(() => {
		if (activeFilter === "All") return history;
		return history.filter((tx) => tx.category === activeFilter);
	}, [history, activeFilter]);

	// Calculate totals
	const totals = useMemo(() => {
		let earned = 0;
		let spent = 0;
		history.forEach((tx) => {
			if (tx.amount > 0) earned += tx.amount;
			else spent += Math.abs(tx.amount);
		});
		return { earned, spent, balance: coins };
	}, [history, coins]);

	const mainBoxes = [
		{
			icon: ArrowUpCircle,
			value: `+${totals.earned}`,
			title: "Earned / Bought",
			color: lightColors.success,
			textColor: lightColors.bodyText,
			bgColor: lightColors.successBG,
			borderColor: lightColors.successBorder,
		},
		{
			icon: ArrowDownCircle,
			value: `-${totals.spent}`,
			title: "Spent",
			color: lightColors.loss,
			textColor: lightColors.bodyText,
			bgColor: lightColors.lossBG,
			borderColor: lightColors.lossBorder,
		},
		{
			icon: Coins,
			value: totals.balance.toString(),
			title: "Balance",
			color: lightColors.brand,
			textColor: lightColors.bodyText,
			bgColor: lightColors.brandBG,
			borderColor: lightColors.brandBorder,
		},
	];

	const renderItem = ({ item }: { item: Transaction }) => {
		const isPositive = item.amount > 0;
		const value = isPositive ? `+${item.amount}` : `${item.amount}`;
		const date = new Date(item.date).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
		// Use note as title if available, otherwise fallback
		const displayTitle =
			item.note || (isPositive ? "Coins Purchased" : "Coins Spent");

		return (
			<View style={[styles.card, globalStyles.shadows]}>
				<View
					style={[
						styles.iconCircle,
						{ backgroundColor: lightColors.mutedBackgroundWeaker },
					]}
				>
					<Coins
						size={moderateScale(24)}
						color={isPositive ? lightColors.success : lightColors.brand}
					/>
				</View>
				<View style={styles.cardInfo}>
					<Title variant="small" style={styles.cardTitle}>
						{displayTitle}
					</Title>
					<View style={styles.cardMetaRow}>
						<BodyText variant="small" style={styles.cardDate}>
							{date}
						</BodyText>
						<View
							style={[
								styles.typeBadge,
								{ backgroundColor: lightColors.brandBG },
							]}
						>
							<BodyText
								variant="small"
								style={[styles.typeText, { color: lightColors.brand }]}
							>
								{item.category}
							</BodyText>
						</View>
					</View>
				</View>
				<Title
					variant="small"
					style={[
						styles.cardValue,
						{ color: isPositive ? lightColors.success : lightColors.brand },
					]}
				>
					{value}
				</Title>
			</View>
		);
	};

	return (
		<SafeAreaView
			style={[
				styles.container,
				{ backgroundColor: lightColors.entireAppBackground },
			]}
		>
			<View style={styles.headerRow}>
				<BackButton />
				<Title variant="page" style={styles.title}>
					Coin History
				</Title>
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
						<box.icon size={moderateScale(24)} color={box.color} />
						<Title
							variant="small"
							style={[styles.boxValue, { color: box.color }]}
						>
							{box.value}
						</Title>
						<BodyText
							variant="small"
							style={[styles.boxTitle, { color: box.textColor }]}
						>
							{box.title}
						</BodyText>
					</View>
				))}
			</View>

			<FilterSection
				options={FILTER_OPTIONS}
				selected={activeFilter}
				onSelect={setActiveFilter}
				activeBgColor={lightColors.brand}
				activeTextColor="#fff"
				inactiveBgColor={lightColors.mutedBackgroundWeaker}
				inactiveTextColor={lightColors.bigTitleText}
				borderRadius={scaleSize(20)}
			/>

			{filteredHistory.length === 0 ? (
				<EmptyState title="No transactions found" message="" icon={Coins} />
			) : (
				<FlatList
					data={filteredHistory}
					keyExtractor={(item) => item.id}
					renderItem={renderItem}
					contentContainerStyle={styles.listContent}
					showsVerticalScrollIndicator={false}
				/>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: spacing.lg },
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.sm,
		marginBottom: spacing.md,
	},
	title: { marginBottom: 0 },
	boxRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: spacing.lg,
		gap: spacing.sm,
	},
	box: {
		flex: 1,
		paddingVertical: scaleSize(12),
		alignItems: "center",
		borderRadius: scaleSize(16),
		borderWidth: scaleSize(1),
	},
	boxValue: {
		marginVertical: scaleSize(4),
	},
	boxTitle: {
		textAlign: "center",
	},
	listContent: {
		paddingBottom: spacing.xl,
	},
	card: {
		flexDirection: "row",
		alignItems: "center",
		padding: spacing.sm,
		borderRadius: scaleSize(16),
		marginBottom: spacing.sm,
		backgroundColor: lightColors.background,
	},
	iconCircle: {
		width: scaleSize(44),
		height: scaleSize(44),
		borderRadius: scaleSize(22),
		alignItems: "center",
		justifyContent: "center",
		marginRight: spacing.sm,
	},
	cardInfo: { flex: 1 },
	cardTitle: { marginBottom: scaleSize(2) },
	cardMetaRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: scaleSize(8),
		flexWrap: "wrap",
	},
	cardDate: { color: lightColors.bodyText },
	typeBadge: {
		paddingHorizontal: scaleSize(8),
		paddingVertical: scaleSize(2),
		borderRadius: scaleSize(12),
	},
	typeText: { fontWeight: "500" },
	cardValue: { fontWeight: "bold" },
});
