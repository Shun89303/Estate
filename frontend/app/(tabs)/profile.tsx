import { Href, useRouter } from "expo-router";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTopUpSheet } from "@/components/profile/useTopUpSheet";
import { useLogoutSheet } from "@/components/profile/useLogoutSheet";
import { requireAuth } from "@/utils/requireAuth";
import { useAuthStore } from "@/stores/authStore";
import { useCoinStore } from "@/stores/coinStore";
import BackButton from "@/components/common/navigation/BackButton";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";
import NotificationBell from "@/components/common/utils/NotificationBell";
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
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";
import RequireAuth from "@/components/common/security/RequireAuth";
import { ImagePicker } from "@/components/common/utils/ImagePicker";

type MenuItem = {
	id: string;
	label: string;
	icon: LucideIcon;
	route: Href;
	requiresAuth: boolean;
};

export default function Profile() {
	const router = useRouter();
	const { user, isGuest, isAuthenticated } = useAuthStore();
	const { coins } = useCoinStore();
	const { open: openTopUpSheet, TopUpSheet } = useTopUpSheet();
	const { open: openLogoutSheet, LogoutSheet } = useLogoutSheet();

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

	const displayName = isAuthenticated
		? user?.name || "Myanmar User"
		: isGuest
			? "Myanmar User"
			: "Myanmar User";
	const displayPhone = isAuthenticated
		? user?.phone || "+95 9 xxx xxx xxx"
		: isGuest
			? "+95 9 xxx xxx xxx"
			: "+95 9 xxx xxx xxx";
	const profileImage = isAuthenticated ? user?.profileImage : null;

	return (
		<SafeAreaView
			style={[
				styles.container,
				{ backgroundColor: lightColors.entireAppBackground },
			]}
		>
			{/* Fixed Header */}
			<View style={styles.header}>
				<View style={styles.leftHeader}>
					<BackButton />
					<Title
						variant="page"
						style={{ marginBottom: 0, color: lightColors.bigTitleText }}
					>
						Profile
					</Title>
				</View>
				<NotificationBell />
			</View>

			{/* Scrollable Content */}
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
				style={{ flex: 1 }}
			>
				{/* PROFILE INFO */}
				<View style={styles.profileSection}>
					<ImagePicker
						imageUri={profileImage}
						backgroundColor={lightColors.brandBG}
						iconColor={lightColors.brand}
						size={100}
						borderRadius={20}
						iconSize={48}
					/>
					<Title variant="normal" style={styles.name}>
						{displayName}
					</Title>
					<BodyText variant="normal" style={styles.phone}>
						{displayPhone}
					</BodyText>
				</View>

				{/* COIN BALANCE CARD */}
				<View
					style={[
						styles.card,
						{
							backgroundColor: lightColors.background,
							...globalStyles.shadows,
						},
					]}
				>
					<View style={styles.coinRow}>
						<View style={styles.coinLeft}>
							<Coins size={moderateScale(32)} color={lightColors.brand} />
							<View>
								<BodyText variant="small" style={styles.coinLabel}>
									Coin Balance
								</BodyText>
								<Title variant="normal" style={styles.coinAmount}>
									{coins}
								</Title>
							</View>
						</View>
						<View style={styles.coinActions}>
							<RequireAuth onPress={() => router.push("/profile/coinHistory")}>
								<BodyText variant="small" style={styles.historyText}>
									History
								</BodyText>
							</RequireAuth>
							<RequireAuth onPress={openTopUpSheet}>
								<BodyText variant="small" style={styles.topUpText}>
									Top Up →
								</BodyText>
							</RequireAuth>
						</View>
					</View>
				</View>

				{/* AGENT / OWNER CARD */}
				<TouchableOpacity
					style={[
						styles.card,
						{
							backgroundColor: lightColors.brandBG,
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							borderWidth: scaleSize(1),
							borderColor: lightColors.brandBorder,
						},
					]}
					onPress={() => router.push("/profile/appAd")}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: spacing.sm,
						}}
					>
						<View
							style={[
								styles.iconCircle,
								{ backgroundColor: lightColors.brandBorder },
							]}
						>
							<Building2 size={moderateScale(24)} color={lightColors.brand} />
						</View>
						<View>
							<Title
								variant="normal"
								style={{ color: lightColors.bigTitleText }}
							>
								Are you an Agent or Owner?
							</Title>
							<BodyText
								variant="small"
								style={{ color: lightColors.bodyText, marginTop: scaleSize(2) }}
							>
								Post your property & find buyers
							</BodyText>
						</View>
					</View>
					<ChevronRight size={moderateScale(20)} color={lightColors.brand} />
				</TouchableOpacity>

				{/* MENU ITEMS */}
				<View style={styles.menuContainer}>
					{menuItems.map((item) => (
						<TouchableOpacity
							key={item.id}
							style={[
								styles.menuCard,
								{
									backgroundColor: lightColors.background,
									...globalStyles.shadows,
								},
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
										{ backgroundColor: lightColors.mutedBackgroundWeaker },
									]}
								>
									<item.icon
										size={moderateScale(20)}
										color={lightColors.brand}
									/>
								</View>
								<Title variant="small" style={styles.menuLabel}>
									{item.label}
								</Title>
							</View>
							<ChevronRight
								size={moderateScale(20)}
								color={lightColors.bodyText}
							/>
						</TouchableOpacity>
					))}

					{/* Logout Card */}
					<TouchableOpacity
						style={[
							styles.menuCard,
							{
								backgroundColor: lightColors.background,
								...globalStyles.shadows,
							},
						]}
						onPress={openLogoutSheet}
					>
						<View style={[styles.menuCardContent]}>
							<View
								style={[
									styles.menuIconCircle,
									{ backgroundColor: lightColors.dangerBG },
								]}
							>
								<LogOut size={moderateScale(20)} color={lightColors.danger} />
							</View>
							<BodyText
								variant="normal"
								style={{ color: lightColors.danger, marginLeft: spacing.sm }}
							>
								Log Out
							</BodyText>
						</View>
						<ChevronRight
							size={moderateScale(20)}
							color={lightColors.bodyText}
						/>
					</TouchableOpacity>
				</View>
				<View style={{ height: scaleSize(80) }} />
			</ScrollView>

			{/* BOTTOM SHEETS */}
			<TopUpSheet />
			<LogoutSheet />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.sm,
		backgroundColor: lightColors.background,
		borderBottomWidth: scaleSize(1),
		borderBottomColor: lightColors.mutedBorder,
	},
	leftHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.sm,
	},
	scrollContent: {
		paddingHorizontal: spacing.lg,
		paddingTop: spacing.md,
		paddingBottom: spacing.xl,
	},
	profileSection: {
		alignItems: "center",
		marginBottom: spacing.lg,
	},
	name: {
		marginTop: spacing.sm,
		marginBottom: 0,
	},
	phone: {
		marginTop: scaleSize(4),
	},
	card: {
		padding: spacing.lg,
		borderRadius: scaleSize(16),
		marginBottom: spacing.lg,
	},
	coinRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	coinLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.sm,
	},
	coinLabel: {
		marginBottom: scaleSize(2),
	},
	coinAmount: {
		fontWeight: "bold",
		color: lightColors.brand,
		marginBottom: 0,
	},
	coinActions: {
		flexDirection: "row",
		gap: spacing.lg,
	},
	historyText: {
		color: lightColors.bodyText,
		fontWeight: "600",
	},
	topUpText: {
		color: lightColors.brand,
		fontWeight: "600",
	},
	iconCircle: {
		width: scaleSize(48),
		height: scaleSize(48),
		borderRadius: scaleSize(15),
		alignItems: "center",
		justifyContent: "center",
	},
	menuContainer: {
		gap: spacing.lg,
	},
	menuCard: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: spacing.lg,
		borderRadius: scaleSize(16),
	},
	menuCardContent: {
		flexDirection: "row",
		alignItems: "center",
	},
	menuIconCircle: {
		width: scaleSize(40),
		height: scaleSize(40),
		borderRadius: scaleSize(12),
		alignItems: "center",
		justifyContent: "center",
	},
	menuLabel: {
		marginLeft: spacing.sm,
		marginBottom: 0,
	},
	logoutIconCircle: {
		width: scaleSize(64),
		height: scaleSize(64),
		borderRadius: scaleSize(15),
		alignItems: "center",
		justifyContent: "center",
		marginBottom: spacing.lg,
		alignSelf: "center",
	},
	logoutTitle: {
		marginBottom: spacing.sm,
		textAlign: "center",
	},
	logoutMessage: {
		textAlign: "center",
		marginBottom: spacing.xl,
		paddingHorizontal: spacing.lg,
	},
	logoutButtons: {
		flexDirection: "row",
		gap: spacing.sm,
	},
	logoutCancel: {
		flex: 1,
		paddingVertical: spacing.md,
		borderRadius: scaleSize(8),
		alignItems: "center",
		borderWidth: scaleSize(1),
	},
	logoutConfirm: {
		flex: 1,
		paddingVertical: spacing.md,
		borderRadius: scaleSize(8),
		alignItems: "center",
	},
	logoutSheet: {
		padding: spacing.lg,
	},
});
