import { useRouter } from "expo-router";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef, useMemo } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
	MOCK_NOTIFICATIONS,
	Notification,
	NotificationType,
} from "@/mock/notifications";

export default function Notifications() {
	const router = useRouter();
	const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["25%"], []);
	const [selectedNoti, setSelectedNoti] = useState<Notification | null>(null);

	const unreadCount = notifications.filter((n) => !n.read).length;

	const markAllAsRead = () => {
		setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
	};

	const handlePressNoti = (item: Notification) => {
		if (!item.read) {
			setNotifications((prev) =>
				prev.map((n) => (n.id === item.id ? { ...n, read: true } : n)),
			);
		}

		setSelectedNoti(item);
		bottomSheetRef.current?.expand();
	};

	const getCTA = (type: NotificationType) => {
		switch (type) {
			case "welcome":
				return "Explore";
			case "booking":
				return "View Booking";
			case "price":
				return "View Property";
			case "listings":
				return "View Listings";
			case "special":
				return "Learn More";
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			{/* HEADER */}
			<View style={styles.header}>
				<Pressable onPress={() => router.back()}>
					<Text>Back</Text>
				</Pressable>

				<View style={{ alignItems: "center" }}>
					<Text style={styles.title}>Notifications</Text>
					<Text style={styles.subtitle}>{unreadCount} unread</Text>
				</View>

				{unreadCount > 0 ? (
					<Pressable onPress={markAllAsRead}>
						<Text style={styles.readAll}>Read All</Text>
					</Pressable>
				) : (
					<View style={{ width: 60 }} />
				)}
			</View>

			{/* LIST */}
			<FlatList
				data={notifications}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<NotificationItem item={item} onPress={() => handlePressNoti(item)} />
				)}
				contentContainerStyle={{ padding: 16 }}
			/>
			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				snapPoints={snapPoints}
				enablePanDownToClose
			>
				<BottomSheetView>
					<View style={{ padding: 16 }}>
						{/* Header */}
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								marginBottom: 12,
							}}
						>
							<Text style={{ fontWeight: "600" }}></Text>

							<Pressable onPress={() => bottomSheetRef.current?.close()}>
								<Text>X</Text>
							</Pressable>
						</View>

						{/* Content */}
						<Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 6 }}>
							{selectedNoti?.title}
						</Text>

						<Text style={{ fontSize: 12, color: "#888", marginBottom: 16 }}>
							{selectedNoti && formatTime(selectedNoti.createdAt)}
						</Text>

						<Text style={{ color: "#555", marginBottom: 10 }}>
							{selectedNoti?.body}
						</Text>

						{/* CTA */}
						<Pressable
							style={{
								backgroundColor: "#000",
								padding: 12,
								borderRadius: 8,
								alignItems: "center",
							}}
						>
							<Text style={{ color: "#fff" }}>
								{selectedNoti && getCTA(selectedNoti.type)}
							</Text>
						</Pressable>
					</View>
				</BottomSheetView>
			</BottomSheet>
		</SafeAreaView>
	);
}

/* ---------------- ITEM ---------------- */

function NotificationItem({
	item,
	onPress,
}: {
	item: Notification;
	onPress: () => void;
}) {
	return (
		<Pressable onPress={onPress}>
			<View style={styles.cardRow}>
				<View style={styles.dotContainer}>
					{!item.read && <View style={styles.dot} />}
				</View>

				<View style={styles.contentContainer}>
					<Text style={styles.cardTitle}>{item.title}</Text>
					<Text style={styles.cardBody}>{item.body}</Text>
				</View>

				<View style={styles.timeContainer}>
					<Text style={styles.time}>{formatTime(item.createdAt)}</Text>
				</View>
			</View>
		</Pressable>
	);
}

/* ---------------- TIME FORMAT ---------------- */

function formatTime(date: Date) {
	const now = Date.now();
	const diff = Math.floor((now - date.getTime()) / 1000);

	if (diff < 60) return "Just now";
	if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
	if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
	return `${Math.floor(diff / 86400)} days ago`;
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff" },

	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},

	title: { fontSize: 16, fontWeight: "600" },
	subtitle: { fontSize: 12, color: "#666" },
	readAll: { fontSize: 12, color: "#007bff" },

	card: {
		padding: 12,
		borderRadius: 8,
		backgroundColor: "#f9f9f9",
		marginBottom: 12,
	},

	cardRow: {
		flexDirection: "row",
		padding: 12,
		borderRadius: 8,
		backgroundColor: "#f9f9f9",
		marginBottom: 12,
	},

	timeContainer: {
		width: 70,
		justifyContent: "flex-start",
	},

	contentContainer: {
		flex: 1,
		paddingHorizontal: 8,
	},

	dotContainer: {
		width: 20,
		alignItems: "flex-end",
		justifyContent: "flex-start",
	},

	time: {
		fontSize: 11,
		color: "#888",
	},

	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: "red",
		marginTop: 4,
	},

	cardTitle: {
		fontSize: 14,
		fontWeight: "600",
	},

	cardBody: {
		fontSize: 12,
		color: "#555",
		marginTop: 2,
	},
});
