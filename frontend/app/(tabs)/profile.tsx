import { Href, useRouter } from "expo-router";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useMemo, useCallback } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import TopUpCoins from "@/components/profile/TopUpCoins";
import { requireAuth } from "@/utils/requireAuth";
import { useAuthStore } from "@/stores/authStore";
import BackButton from "@/components/common/BackButton";
import {
	BodyText,
	NormalTitle,
	PageTitle,
	SmallTitle,
} from "@/components/atoms/Typography";
import NotificationBell from "@/components/common/NotificationBell";
import { useTheme } from "@/hooks/useTheme";
import {
	ChevronRight,
	User,
	Settings,
	HelpCircle,
	LogOut,
	Coins,
	Building2,
	LucideIcon,
} from "lucide-react-native";
import globalStyles from "@/styles/styles";

type MenuItem = {
	id: string;
	label: string;
	icon: LucideIcon;
	route: Href;
	requiresAuth: boolean;
};

export default function Profile() {
	const router = useRouter();
	const colors = useTheme();
	const logout = useAuthStore((s) => s.logout);
	const bottomSheetRef = useRef<BottomSheet>(null);
	const logoutSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["50%", "70%", "100%"], []);

	const handleOpenSheet = useCallback(() => {
		bottomSheetRef.current?.expand();
	}, []);

	const openLogoutSheet = useCallback(() => {
		bottomSheetRef.current?.close();
		logoutSheetRef.current?.expand();
	}, []);

	const menuItems: MenuItem[] = [
		{
			id: "editProfile",
			label: "Edit Profile",
			icon: User,
			route: "/profile/editProfile",
			requiresAuth: true,
		},
		{
			id: "settings",
			label: "Settings",
			icon: Settings,
			route: "/profile/settings",
			requiresAuth: false,
		},
		{
			id: "help",
			label: "Help & Support",
			icon: HelpCircle,
			route: "/profile/help",
			requiresAuth: false,
		},
	];

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.appBackground }]}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* HEADER */}
				<View style={styles.header}>
					<View style={styles.leftHeader}>
						<BackButton />
						<PageTitle style={{ color: colors.textPrimary }}>Profile</PageTitle>
					</View>
					<NotificationBell />
				</View>

				{/* PROFILE INFO */}
				<View style={styles.profileSection}>
					<View
						style={[
							styles.avatarContainer,
							{ backgroundColor: colors.darkGold },
						]}
					>
						<User size={48} color={colors.primaryGold} />
					</View>
					<NormalTitle style={{ marginTop: 8, color: colors.textPrimary }}>
						Myanmar User
					</NormalTitle>
					<BodyText style={{ color: colors.textSecondary, marginTop: 4 }}>
						+95 9 xxx xxx xxx
					</BodyText>
				</View>

				{/* COIN BALANCE CARD */}
				<View
					style={[
						styles.card,
						{ backgroundColor: colors.background, ...globalStyles.shadows },
					]}
				>
					<View style={styles.coinRow}>
						<View style={styles.coinLeft}>
							<Coins size={32} color={colors.primaryGold} />
							<View>
								<BodyText
									style={{ color: colors.textSecondary, marginBottom: 2 }}
								>
									Coin Balance
								</BodyText>
								<NormalTitle
									style={{ fontWeight: "bold", color: colors.primaryGold }}
								>
									20
								</NormalTitle>
							</View>
						</View>
						<View style={styles.coinActions}>
							<TouchableOpacity
								onPress={() => router.push("/profile/coinHistory")}
							>
								<BodyText
									style={{ color: colors.primaryGray, fontWeight: "600" }}
								>
									History
								</BodyText>
							</TouchableOpacity>
							<TouchableOpacity onPress={handleOpenSheet}>
								<BodyText
									style={{ color: colors.primaryGold, fontWeight: "600" }}
								>
									Top Up →
								</BodyText>
							</TouchableOpacity>
						</View>
					</View>
				</View>

				{/* AGENT / OWNER CARD */}
				<TouchableOpacity
					style={[
						styles.card,
						{
							backgroundColor: colors.darkGold,
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							borderWidth: 1,
							borderColor: colors.darkerGoldBorder,
						},
					]}
					onPress={() => router.push("/profile/appAd")}
				>
					<View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
						<View
							style={[
								styles.iconCircle,
								{ backgroundColor: colors.darkerGold },
							]}
						>
							<Building2 size={24} color={colors.primaryGold} />
						</View>
						<View>
							<NormalTitle style={{ color: colors.textPrimary }}>
								Are you an Agent or Owner?
							</NormalTitle>
							<BodyText style={{ color: colors.textSecondary, marginTop: 2 }}>
								Post your property & find buyers
							</BodyText>
						</View>
					</View>
					<ChevronRight size={20} color={colors.primaryGold} />
				</TouchableOpacity>

				{/* MENU ITEMS */}
				<View style={styles.menuContainer}>
					{menuItems.map((item) => (
						<TouchableOpacity
							key={item.id}
							style={[
								styles.menuCard,
								{ backgroundColor: colors.background, ...globalStyles.shadows },
							]}
							onPress={() => {
								if (item.requiresAuth) {
									requireAuth(() => router.push(item.route));
								} else {
									router.push(item.route);
								}
							}}
						>
							<View style={styles.menuCardContent}>
								<View
									style={[
										styles.menuIconCircle,
										{ backgroundColor: colors.secondaryMute },
									]}
								>
									<item.icon size={20} color={colors.primaryGold} />
								</View>
								<SmallTitle
									style={{ color: colors.textPrimary, marginLeft: 12 }}
								>
									{item.label}
								</SmallTitle>
							</View>
							<ChevronRight size={20} color={colors.textSecondary} />
						</TouchableOpacity>
					))}

					{/* Logout Card (separate with red) */}
					<TouchableOpacity
						style={[
							styles.menuCard,
							{ backgroundColor: colors.background, ...globalStyles.shadows },
						]}
						onPress={openLogoutSheet}
					>
						<View style={styles.menuCardContent}>
							<View
								style={[
									styles.menuIconCircle,
									{ backgroundColor: colors.darkRed },
								]}
							>
								<LogOut size={20} color={colors.primaryRed} />
							</View>
							<BodyText style={{ color: colors.primaryRed, marginLeft: 12 }}>
								Log Out
							</BodyText>
						</View>
						<ChevronRight size={20} color={colors.textSecondary} />
					</TouchableOpacity>
				</View>
				{/* BOTTOM SHEETS (unchanged) */}
				<BottomSheet
					ref={bottomSheetRef}
					snapPoints={snapPoints}
					enablePanDownToClose
					index={-1}
				>
					<BottomSheetView>
						<TopUpCoins />
					</BottomSheetView>
				</BottomSheet>
				<BottomSheet
					ref={logoutSheetRef}
					snapPoints={["30%"]}
					index={-1}
					enablePanDownToClose
				>
					<BottomSheetView>
						<View style={styles.logoutSheet}>
							<NormalTitle
								style={{
									color: colors.textPrimary,
									marginBottom: 20,
									textAlign: "center",
								}}
							>
								Are you sure you want to log out of your account?
							</NormalTitle>
							<View style={styles.logoutButtons}>
								<TouchableOpacity
									style={[
										styles.logoutCancel,
										{ backgroundColor: colors.secondaryMute },
									]}
									onPress={() => logoutSheetRef.current?.close()}
								>
									<BodyText style={{ color: colors.textPrimary }}>
										Cancel
									</BodyText>
								</TouchableOpacity>
								<TouchableOpacity
									style={[
										styles.logoutConfirm,
										{ backgroundColor: colors.primaryRed },
									]}
									onPress={() => {
										logoutSheetRef.current?.close();
										logout();
										router.push("/auth/login");
									}}
								>
									<BodyText style={{ color: "#fff" }}>Log Out</BodyText>
								</TouchableOpacity>
							</View>
						</View>
					</BottomSheetView>
				</BottomSheet>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		marginBottom: 55,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 24,
	},
	leftHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	profileSection: {
		alignItems: "center",
		marginBottom: 24,
	},
	avatarContainer: {
		width: 100,
		height: 100,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	card: {
		padding: 16,
		borderRadius: 16,
		marginBottom: 16,
	},
	coinRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	coinLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	coinActions: {
		flexDirection: "row",
		gap: 16,
	},
	iconCircle: {
		width: 48,
		height: 48,
		borderRadius: 15,
		alignItems: "center",
		justifyContent: "center",
	},
	menu: {
		marginTop: 8,
	},
	menuItem: {
		paddingVertical: 16,
		borderBottomWidth: 1,
	},
	menuItemContent: {
		flexDirection: "row",
		alignItems: "center",
	},
	logoutSheet: {
		padding: 20,
	},
	logoutButtons: {
		flexDirection: "row",
		gap: 12,
	},
	logoutCancel: {
		flex: 1,
		padding: 12,
		borderRadius: 8,
		alignItems: "center",
	},
	logoutConfirm: {
		flex: 1,
		padding: 12,
		borderRadius: 8,
		alignItems: "center",
	},
	menuContainer: {
		marginTop: 8,
		gap: 12,
	},
	menuCard: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 16,
		borderRadius: 16,
		marginBottom: 0, // gap handles spacing
	},
	menuCardContent: {
		flexDirection: "row",
		alignItems: "center",
	},
	menuIconCircle: {
		width: 40,
		height: 40,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
});
