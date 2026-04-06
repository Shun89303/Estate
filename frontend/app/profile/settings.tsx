import { useRouter } from "expo-router";
import { View, Text, Pressable, Switch, StyleSheet } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
	const router = useRouter();
	const [pushNotifications, setPushNotifications] = useState(true);
	const [darkMode, setDarkMode] = useState(false);

	const handleTogglePush = () => setPushNotifications((prev) => !prev);
	const handleToggleDark = () => setDarkMode((prev) => !prev);

	return (
		<SafeAreaView style={styles.container}>
			{/* Back */}
			<Pressable onPress={() => router.back()}>
				<Text style={styles.back}>Back</Text>
			</Pressable>

			<Text style={styles.header}>Settings</Text>

			{/* Push Notifications */}
			<View style={styles.row}>
				<Text style={styles.label}>Push Notifications</Text>
				<Switch value={pushNotifications} onValueChange={handleTogglePush} />
			</View>

			{/* Dark Mode */}
			<View style={styles.row}>
				<Text style={styles.label}>Dark Mode</Text>
				<Switch value={darkMode} onValueChange={handleToggleDark} />
			</View>

			{/* Language */}
			<View style={styles.row}>
				<Text style={styles.label}>Language</Text>
				<Text style={styles.rightText}>English</Text>
			</View>

			{/* Privacy Policy */}
			<Pressable style={styles.row}>
				<Text style={styles.label}>Privacy Policy</Text>
				<Text style={styles.rightText}>›</Text>
			</Pressable>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 16,
	},

	back: {
		fontSize: 14,
		color: "#007bff",
		marginBottom: 12,
	},

	header: {
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 24,
	},

	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 14,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},

	label: {
		fontSize: 14,
		color: "#000",
	},

	rightText: {
		fontSize: 14,
		color: "#666",
	},
});
