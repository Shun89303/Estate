// components/ownerDirect/BuyCoins.tsx
import { View, StyleSheet } from "react-native";
import { BottomSheetScrollView, TouchableOpacity } from "@gorhom/bottom-sheet";
import { Coins } from "lucide-react-native";
import Title from "../common/typography/Title";
import BodyText from "../common/typography/BodyText";
import SubTitle from "../common/typography/SubTitle";
import { lightColors } from "@/theme/light";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { useUserStore } from "@/stores/userStore";

interface BuyCoinsProps {
	onClose: () => void;
}

export default function BuyCoins({ onClose }: BuyCoinsProps) {
	const { addCoins, coins } = useUserStore();

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

	const handlePurchase = (coinsAmount: number) => {
		addCoins(coinsAmount);
		onClose();
	};

	return (
		<BottomSheetScrollView contentContainerStyle={styles.container}>
			<View style={styles.header}>
				<Title>Buy Coins</Title>
				<View style={styles.balanceRow}>
					<BodyText variant="large">Current balance:</BodyText>
					<SubTitle> {coins} coins</SubTitle>
				</View>
			</View>

			{oneTimePacks.map((item) => (
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
					onPress={() => handlePurchase(item.coins)}
					activeOpacity={0.7}
				>
					<Coins size={moderateScale(20)} color={lightColors.brand} />
					<View style={styles.cardInfo}>
						<View style={styles.cardTitleRow}>
							<Title>{item.title}</Title>
							{item.popular && (
								<View style={styles.popularBadge}>
									<SubTitle style={{ marginBottom: 0 }}>POPULAR</SubTitle>
								</View>
							)}
						</View>
					</View>
					<SubTitle variant="large">{item.value}</SubTitle>
				</TouchableOpacity>
			))}
		</BottomSheetScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: spacing.lg,
		// ✅ NO flex:1
	},
	header: {
		alignItems: "center",
		marginBottom: spacing.md,
	},
	balanceRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	card: {
		flexDirection: "row",
		alignItems: "center",
		padding: spacing.md,
		borderRadius: scaleSize(12),
		borderWidth: scaleSize(1),
		marginBottom: spacing.sm,
		gap: scaleSize(10),
	},
	cardInfo: {
		flex: 1,
	},
	cardTitleRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: scaleSize(2),
	},
	popularBadge: {
		backgroundColor: lightColors.brandBG,
		borderRadius: scaleSize(99),
		paddingHorizontal: scaleSize(6),
		paddingVertical: scaleSize(2),
		marginLeft: spacing.sm,
	},
});
