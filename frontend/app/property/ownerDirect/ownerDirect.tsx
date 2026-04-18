import { useState, useRef } from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	FlatList,
	Pressable,
	Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MOCK_OWNERDIRECT, Property } from "@/mock/ownerDirect";
import BackButton from "@/components/common/navigation/BackButton";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";
import { Coins, EyeOff, Lock, LockOpen, Sparkles } from "lucide-react-native";
import { lightColors } from "@/theme/light";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { useCoinStore } from "@/stores/coinStore";
import { useAuthStore } from "@/stores/authStore";
import { useCoinBalance } from "@/components/coin/useCoinBalance";
import OwnerDirectCard from "@/components/ownerDirect/OwnerDirectCard";
import EmptyState from "@/components/common/state/EmptyState";
import CustomBottomSheet from "@/components/common/utils/CustomBottomSheet";

export default function OwnerDirect() {
	const router = useRouter();
	const { user } = useAuthStore();
	const { coins: coinBalance, deductCoins } = useCoinStore();
	const { CoinButton, CoinBottomSheet } = useCoinBalance();

	const [selectedProperty, setSelectedProperty] = useState<Property | null>(
		null,
	);
	const [unlockedIds, setUnlockedIds] = useState<number[]>([]);
	const [showUnlockSheet, setShowUnlockSheet] = useState(false);
	const slideAnim = useRef(new Animated.Value(0)).current;

	const openUnlockSheet = (property: Property) => {
		setSelectedProperty(property);
		setShowUnlockSheet(true);
		Animated.timing(slideAnim, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true,
		}).start();
	};

	const closeUnlockSheet = () => {
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => {
			setShowUnlockSheet(false);
			setSelectedProperty(null);
		});
	};

	const handleUnlock = async () => {
		if (!selectedProperty || !user?.uid) return;
		const cost = selectedProperty.unlockCoins;
		const success = await deductCoins(
			user.uid,
			cost,
			"Unlock",
			`Unlocked: ${selectedProperty.title}`,
		);
		if (success) {
			setUnlockedIds((prev) => [...prev, selectedProperty.id]);
			closeUnlockSheet();
		} else {
			alert("Not enough coins. Please top up.");
		}
	};

	const handleCardPress = (item: Property) => {
		const isUnlocked = unlockedIds.includes(item.id);
		if (isUnlocked) {
			router.push(`/property/ownerDirect/${item.uniqueCode}`);
		} else {
			openUnlockSheet(item);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View style={styles.headerLeft}>
					<BackButton />
					<Title variant="page" style={styles.headerTitle}>
						Owner Direct
					</Title>
				</View>
				<CoinButton />
			</View>

			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View
					style={[
						styles.infoBox,
						{
							backgroundColor: lightColors.brandBG,
							borderColor: lightColors.brandBorder,
						},
					]}
				>
					<Sparkles size={moderateScale(18)} color={lightColors.brand} />
					<View style={{ flex: 1 }}>
						<Title variant="small">For Agents Only</Title>
						<BodyText variant="small">
							Unlock owner contact info using coins. No commission sharing —
							deal directly with owners.
						</BodyText>
					</View>
				</View>

				<FlatList
					scrollEnabled={false}
					data={MOCK_OWNERDIRECT}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<OwnerDirectCard
							property={item}
							isUnlocked={unlockedIds.includes(item.id)}
							onPress={() => handleCardPress(item)}
						/>
					)}
					ListEmptyComponent={<EmptyState title="No properties found" />}
				/>
			</ScrollView>

			{/* Unlock Bottom Sheet */}
			<CustomBottomSheet
				visible={showUnlockSheet}
				onClose={closeUnlockSheet}
				slideAnim={slideAnim}
				height={0.55}
			>
				{selectedProperty && (
					<View style={styles.sheetContent}>
						<View style={{ alignItems: "center" }}>
							<View style={styles.lockIconContainer}>
								<Lock size={moderateScale(30)} color={lightColors.brand} />
							</View>
							<Title variant="page" style={styles.sheetTitle}>
								Unlock Owner Info
							</Title>
							<BodyText variant="normal" style={styles.sheetSubtitle}>
								{selectedProperty.title}
							</BodyText>
						</View>

						<View style={styles.sheetBox}>
							<View>
								<BodyText variant="small">Owner Name</BodyText>
								<BodyText variant="small">Phone Number</BodyText>
							</View>
							<View style={{ alignItems: "flex-end" }}>
								<View style={styles.hiddenRow}>
									<EyeOff
										size={moderateScale(12)}
										color={lightColors.bodyText}
									/>
									<BodyText variant="small">Hidden</BodyText>
								</View>
								<View style={styles.hiddenRow}>
									<EyeOff
										size={moderateScale(12)}
										color={lightColors.bodyText}
									/>
									<BodyText variant="small">Hidden</BodyText>
								</View>
							</View>
						</View>

						<View style={[styles.sheetBox, styles.sheetBoxTransparent]}>
							<View>
								<BodyText variant="small">Cost</BodyText>
								<BodyText variant="small">Your Balance</BodyText>
							</View>
							<View style={{ alignItems: "flex-end" }}>
								<View style={styles.hiddenRow}>
									<Coins size={moderateScale(12)} color={lightColors.brand} />
									<BodyText
										variant="small"
										style={{ color: lightColors.brand }}
									>
										{selectedProperty.unlockCoins} Coins
									</BodyText>
								</View>
								<View style={styles.hiddenRow}>
									<Coins size={moderateScale(12)} color={lightColors.brand} />
									<BodyText variant="small">{coinBalance} coins</BodyText>
								</View>
							</View>
						</View>

						<Pressable
							style={[styles.unlockBtn, { backgroundColor: lightColors.brand }]}
							onPress={handleUnlock}
						>
							<LockOpen size={moderateScale(12)} color="#fff" />
							<BodyText variant="normal" style={styles.unlockBtnText}>
								Unlock for {selectedProperty.unlockCoins} Coins
							</BodyText>
						</Pressable>
					</View>
				)}
			</CustomBottomSheet>

			<CoinBottomSheet />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: lightColors.entireAppBackground },
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.sm,
		backgroundColor: lightColors.background,
	},
	headerLeft: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
	headerTitle: { marginBottom: 0 },
	scrollContent: { padding: spacing.lg, paddingBottom: spacing.xl },
	infoBox: {
		flexDirection: "row",
		gap: spacing.sm,
		padding: spacing.md,
		borderRadius: scaleSize(10),
		marginBottom: spacing.lg,
		borderWidth: scaleSize(1),
	},
	sheetContent: { padding: spacing.lg, gap: spacing.md },
	lockIconContainer: {
		backgroundColor: lightColors.brandBG,
		padding: spacing.lg,
		borderRadius: scaleSize(99),
		marginBottom: spacing.sm,
	},
	sheetTitle: { marginBottom: spacing.xs },
	sheetSubtitle: { textAlign: "center", color: lightColors.bodyText },
	sheetBox: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: lightColors.mutedBackgroundWeaker,
		padding: spacing.md,
		marginVertical: spacing.md,
		borderRadius: scaleSize(10),
	},
	sheetBoxTransparent: { backgroundColor: "transparent" },
	hiddenRow: { flexDirection: "row", alignItems: "center", gap: scaleSize(5) },
	unlockBtn: {
		paddingVertical: spacing.md,
		borderRadius: scaleSize(8),
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: scaleSize(5),
	},
	unlockBtnText: { fontWeight: "600", color: "#fff", marginBottom: 0 },
});
