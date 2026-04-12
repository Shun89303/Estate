import { View, Pressable, Switch, StyleSheet } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/common/navigation/BackButton";
import { useTheme } from "@/hooks/useTheme";
import {
	BodyText,
	NormalTitle,
	PageTitle,
} from "@/components/atoms/Typography";
import { Bell, Moon, Globe, Shield } from "lucide-react-native";
import globalStyles from "@/styles/styles";

export default function Settings() {
	const colors = useTheme();
	const [pushNotifications, setPushNotifications] = useState(true);
	const [darkMode, setDarkMode] = useState(false);

	const handleTogglePush = () => setPushNotifications((prev) => !prev);
	const handleToggleDark = () => setDarkMode((prev) => !prev);

	const settings = [
		{
			id: "notifications",
			title: "Push Notifications",
			icon: Bell,
			right: (
				<Switch
					value={pushNotifications}
					onValueChange={handleTogglePush}
					trackColor={{ true: colors.primaryGold }}
				/>
			),
		},
		{
			id: "darkMode",
			title: "Dark Mode",
			icon: Moon,
			right: (
				<Switch
					value={darkMode}
					onValueChange={handleToggleDark}
					trackColor={{ true: colors.primaryGold }}
				/>
			),
		},
		{
			id: "language",
			title: "Language",
			icon: Globe,
			right: (
				<BodyText style={{ color: colors.textSecondary }}>English</BodyText>
			),
		},
		{
			id: "privacy",
			title: "Privacy Policy",
			icon: Shield,
			right: <BodyText style={{ color: colors.textSecondary }}>›</BodyText>,
			onPress: () => console.log("Privacy Policy"),
		},
	];

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<View style={styles.headerRow}>
				<BackButton />
				<PageTitle style={styles.header}>Settings</PageTitle>
			</View>

			{settings.map((item) => (
				<Pressable
					key={item.id}
					style={[
						styles.card,
						{ backgroundColor: "#fff", ...globalStyles.shadows },
					]}
					onPress={item.onPress}
				>
					<View style={styles.leftSection}>
						<View
							style={[
								styles.iconContainer,
								{ backgroundColor: colors.primaryGold + "20" },
							]}
						>
							<item.icon size={20} color={colors.primaryGold} />
						</View>
						<NormalTitle style={styles.label}>{item.title}</NormalTitle>
					</View>
					{item.right}
				</Pressable>
			))}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		marginBottom: 24,
	},
	header: {
		marginBottom: 0,
	},
	card: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 16,
		borderRadius: 16,
		marginBottom: 12,
	},
	leftSection: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	iconContainer: {
		width: 40,
		height: 40,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	label: {
		fontSize: 16,
		fontWeight: "500",
	},
});
