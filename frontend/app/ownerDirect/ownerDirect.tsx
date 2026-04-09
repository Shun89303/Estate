import { useRouter } from "expo-router";
import { View, Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MOCK_OWNERDIRECT, Property } from "@/mock/ownerDirect";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef, useMemo, useState } from "react";
import BackButton from "@/components/common/BackButton";
import { BodyText, PageTitle, SmallTitle } from "@/components/atoms/Typography";
import { Coins, EyeOff, Lock, LockOpen, Sparkles } from "lucide-react-native";
import { useTheme } from "@/hooks/useTheme";
import OwnerDirectCard from "@/components/ownerDirect/OwnerDirectCard";
import BuyCoins from "@/components/ownerDirect/BuyCoins";

export default function OwnerDirect() {
	const router = useRouter();
	const colors = useTheme();

	const [selectedProperty, setSelectedProperty] = useState<Property | null>(
		null,
	);
	const [unlockedIds, setUnlockedIds] = useState<number[]>([]);
	const [coinBalance, setCoinBalance] = useState(20);

	const bottomSheetRef = useRef<BottomSheet>(null);
	const topupSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["40%"], []);

	const handleCardPress = (item: Property) => {
		const isUnlocked = unlockedIds.includes(item.id);
		if (isUnlocked) {
			router.push(`/ownerDirect/${item.id}`);
		} else {
			setSelectedProperty(item);
			bottomSheetRef.current?.expand();
		}
	};

	const handleTopUpSheet = () => topupSheetRef.current?.expand();

	const handleUnlock = () => {
		if (!selectedProperty) return;
		const cost = selectedProperty.unlockCoins;
		if (coinBalance >= cost) {
			setCoinBalance((prev) => prev - cost);
			setUnlockedIds((prev) => [...prev, selectedProperty.id]);
			bottomSheetRef.current?.close();
		} else {
			alert("Not enough coins. Please top up.");
		}
	};

	const handleAddCoins = (amount: number) => {
		setCoinBalance((prev) => prev + amount);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{/* HEADER */}
			<View style={styles.header}>
				<View style={{ flexDirection: "row", alignItems: "flex-end" }}>
					<BackButton />
					<PageTitle>Owner Direct</PageTitle>
				</View>
				<Pressable
					style={[
						styles.coins,
						{
							backgroundColor: colors.darkGold,
							padding: 10,
							borderWidth: 1,
							borderRadius: 15,
							borderColor: colors.primaryGold,
						},
					]}
					onPress={handleTopUpSheet}
				>
					<Coins size={20} color={colors.primaryGold} />
					<BodyText
						style={{
							marginLeft: 4,
							color: colors.primaryGold,
							fontWeight: "600",
						}}
					>
						{coinBalance}
					</BodyText>
				</Pressable>
			</View>

			<ScrollView contentContainerStyle={{ padding: 16 }}>
				{/* INFO BOX */}
				<View
					style={[
						styles.infoBox,
						{
							backgroundColor: colors.darkGold,
							borderWidth: 1,
							borderColor: colors.primaryGold,
						},
					]}
				>
					<Sparkles size={18} color={colors.primaryGold} />
					<View style={{ flex: 1 }}>
						<SmallTitle>For Agents Only</SmallTitle>
						<BodyText>
							Unlock owner contact info using coins. No commission sharing —
							deal directly with owners.
						</BodyText>
					</View>
				</View>

				{/* CARDS LIST */}
				{MOCK_OWNERDIRECT.map((item) => {
					const isUnlocked = unlockedIds.includes(item.id);
					return (
						<OwnerDirectCard
							key={item.id}
							property={item}
							isUnlocked={isUnlocked}
							onPress={() => handleCardPress(item)}
						/>
					);
				})}
			</ScrollView>

			{/* UNLOCK BOTTOM SHEET */}
			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				snapPoints={snapPoints}
				enablePanDownToClose
			>
				{selectedProperty && (
					<BottomSheetView style={styles.sheetContent}>
						<View style={{ alignItems: "center" }}>
							<View
								style={{
									backgroundColor: colors.secondaryGold,
									padding: 10,
									borderRadius: 99,
								}}
							>
								<Lock size={30} color={colors.primaryGold} />
							</View>
							<SmallTitle style={styles.sheetTitle}>
								Unlock Owner Info
							</SmallTitle>
							<BodyText style={styles.sheetSubtitle}>
								{selectedProperty.title}
							</BodyText>
						</View>

						<View style={styles.sheetBox}>
							<View>
								<BodyText>Owner Name</BodyText>
								<BodyText>Phone Number</BodyText>
							</View>
							<View style={{ alignItems: "flex-end" }}>
								<View style={styles.hiddenRow}>
									<EyeOff size={12} color={colors.textPrimary} />
									<BodyText>Hidden</BodyText>
								</View>
								<View style={styles.hiddenRow}>
									<EyeOff size={12} color={colors.textPrimary} />
									<BodyText>Hidden</BodyText>
								</View>
							</View>
						</View>

						<View
							style={[
								styles.sheetBox,
								{
									backgroundColor: "transparent",
								},
							]}
						>
							<View>
								<BodyText>Cost</BodyText>
								<BodyText>Your Balance</BodyText>
							</View>
							<View style={{ alignItems: "flex-end" }}>
								<View style={styles.hiddenRow}>
									<Coins size={12} color={colors.primaryGold} />
									<BodyText
										style={{
											color: colors.primaryGold,
										}}
									>
										{selectedProperty.unlockCoins} Coins
									</BodyText>
								</View>
								<View style={styles.hiddenRow}>
									<Coins size={12} color={colors.primaryGold} />
									<BodyText>{coinBalance} coins</BodyText>
								</View>
							</View>
						</View>

						<Pressable
							style={[
								styles.unlockBtn,
								{
									backgroundColor: colors.primaryGold,
								},
							]}
							onPress={handleUnlock}
						>
							<LockOpen size={12} color={"#fff"} />
							<BodyText style={{ fontWeight: "600", color: "#fff" }}>
								Unlock for {selectedProperty.unlockCoins} Coins
							</BodyText>
						</Pressable>
					</BottomSheetView>
				)}
			</BottomSheet>

			{/* TOP‑UP BOTTOM SHEET */}
			<BottomSheet
				ref={topupSheetRef}
				index={-1}
				snapPoints={snapPoints}
				enablePanDownToClose
			>
				<BottomSheetView>
					<BuyCoins
						currentBalance={coinBalance}
						onAddCoins={handleAddCoins}
						onClose={() => topupSheetRef.current?.close()}
					/>
				</BottomSheetView>
			</BottomSheet>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 16,
	},
	coins: {
		flexDirection: "row",
		alignItems: "center",
	},
	infoBox: {
		flexDirection: "row",
		gap: 8,
		padding: 12,
		borderRadius: 10,
		marginBottom: 16,
	},
	sheetContent: {
		padding: 16,
		gap: 12,
	},
	sheetTitle: {
		fontWeight: "600",
		fontSize: 16,
		marginBottom: 2,
	},
	sheetSubtitle: {
		fontSize: 12,
		color: "#666",
	},
	sheetBox: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#f1f1f1",
		padding: 12,
		borderRadius: 10,
	},
	hiddenRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
	},
	unlockBtn: {
		marginTop: 8,
		padding: 12,
		borderRadius: 8,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 5,
	},

	subtitle: {
		color: "#666",
		fontSize: 12,
	},
});
