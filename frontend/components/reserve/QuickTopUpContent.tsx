import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Coins } from "lucide-react-native";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";
import SubTitle from "@/components/common/typography/SubTitle";
import { lightColors } from "@/theme/light";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { useAuthStore } from "@/stores/authStore";
import { useCoinStore } from "@/stores/coinStore";

const ONE_TIME_PACKS = [
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

interface QuickTopUpContentProps {
	onClose: () => void;
}

export default function QuickTopUpContent({ onClose }: QuickTopUpContentProps) {
	const { user } = useAuthStore();
	const { addCoins } = useCoinStore();

	const handlePurchase = async (coinsAmount: number) => {
		if (user?.uid) {
			await addCoins(
				user.uid,
				coinsAmount,
				"Top Up",
				`Purchased ${coinsAmount} coins (Quick Top Up)`,
			);
		}
		onClose();
	};

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				<Title variant="page">Quick Top Up</Title>
				<BodyText variant="small" style={styles.subheader}>
					Choose coin pack to continue reservation
				</BodyText>
			</View>
			{ONE_TIME_PACKS.map((item) => (
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
						<BodyText variant="small" style={styles.cardSubtitle}>
							{item.subtitle}
						</BodyText>
					</View>
					<SubTitle variant="large">{item.value}</SubTitle>
				</TouchableOpacity>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { padding: spacing.lg },
	header: { alignItems: "center", marginBottom: spacing.xl },
	subheader: { color: lightColors.bodyText, marginTop: scaleSize(4) },
	card: {
		flexDirection: "row",
		alignItems: "center",
		padding: spacing.md,
		borderRadius: scaleSize(12),
		borderWidth: scaleSize(1),
		marginBottom: spacing.sm,
		gap: scaleSize(10),
	},
	cardInfo: { flex: 1 },
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
	cardSubtitle: { color: lightColors.bodyText },
});
