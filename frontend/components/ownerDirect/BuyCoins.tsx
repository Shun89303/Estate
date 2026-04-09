import { useTheme } from "@/hooks/useTheme";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { BodyText, SmallTitle } from "../atoms/Typography";
import { Coins } from "lucide-react-native";

export default function BuyCoins({
	currentBalance,
	onAddCoins,
	onClose,
}: {
	currentBalance: number;
	onAddCoins: (amount: number) => void;
	onClose: () => void;
}) {
	const colors = useTheme();
	const oneTimePacks = [
		{ title: "10 Coins", subtitle: "฿9.9/coin", value: "฿99", coins: 10 },
		{
			title: "30 Coins",
			subtitle: "฿8.3/coin",
			value: "฿249",
			coins: 30,
			popular: true,
		},
		{ title: "50 Coins", subtitle: "฿7.9/coin", value: "฿399", coins: 50 },
		{ title: "100 Coins", subtitle: "฿6.9/coin", value: "฿699", coins: 100 },
		{ title: "200 Coins", subtitle: "฿5.9/coin", value: "฿1199", coins: 200 },
	];

	const handlePurchase = (coins: number) => {
		onAddCoins(coins);
		onClose();
	};

	return (
		<View style={styles.container}>
			<View
				style={{
					alignItems: "center",
				}}
			>
				<SmallTitle style={styles.headerTitle}>Buy Coins</SmallTitle>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<BodyText
						style={{
							marginBottom: 16,
						}}
					>
						Current balance:
					</BodyText>
					<BodyText
						style={{
							marginBottom: 16,
							color: colors.primaryGold,
							fontWeight: "700",
						}}
					>
						{" "}
						{currentBalance} coins
					</BodyText>
				</View>
			</View>
			<ScrollView showsVerticalScrollIndicator={false}>
				{oneTimePacks.map((item) => (
					<TouchableOpacity
						key={item.title}
						style={[
							styles.card,
							{
								backgroundColor: colors.secondaryGray + 10,
								borderColor: colors.primaryGray + 80,
							},
							item.popular && {
								borderColor: colors.primaryGold,
								backgroundColor: colors.primaryGold + 15,
							},
						]}
						onPress={() => handlePurchase(item.coins)}
					>
						<Coins size={20} color={colors.primaryGold} />
						<View style={styles.cardInfo}>
							<View style={styles.cardTitleRow}>
								<SmallTitle style={styles.title}>{item.title}</SmallTitle>
								{item.popular && (
									<View style={styles.popularBadge}>
										<BodyText style={styles.popularBadgeText}>POPULAR</BodyText>
									</View>
								)}
							</View>
						</View>
						<SmallTitle
							style={{
								fontWeight: "700",
								color: colors.primaryGold,
							}}
						>
							{item.value}
						</SmallTitle>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	headerTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 4,
	},
	card: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		borderRadius: 12,
		borderWidth: 1,
		marginBottom: 10,
		gap: 10,
	},
	coinIcon: {
		marginRight: 12,
		fontSize: 20,
	},
	cardInfo: {
		flex: 1,
	},
	cardTitleRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 2,
	},
	title: {
		fontWeight: "700",
		fontSize: 14,
	},
	popularBadge: {
		backgroundColor: "#f59e0b",
		borderRadius: 4,
		paddingHorizontal: 6,
		paddingVertical: 2,
		marginLeft: 8,
	},
	popularBadgeText: {
		color: "#fff",
		fontSize: 10,
	},
});
