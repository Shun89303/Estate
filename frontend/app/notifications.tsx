import { View, Pressable, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef, useMemo } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
	MOCK_NOTIFICATIONS,
	Notification,
	NotificationType,
} from "@/mock/notifications";
import BackButton from "@/components/common/navigation/BackButton";
import { CheckCheck, X } from "lucide-react-native";
import { useTheme } from "@/hooks/useTheme";
import { BodyText, NormalTitle } from "@/components/atoms/Typography";

export default function Notifications() {
	const colors = useTheme();
	const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["30%"], []);
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
		<SafeAreaView style={[styles.container]}>
			<View
				style={[
					styles.header,
					{
						borderBottomColor: colors.border,
						backgroundColor: colors.background,
					},
				]}
			>
				<View style={styles.leftHeader}>
					<BackButton />
					<View>
						<NormalTitle style={styles.title}>Notifications</NormalTitle>
						{unreadCount > 0 && (
							<BodyText style={styles.subtitle}>{unreadCount} unread</BodyText>
						)}
					</View>
				</View>
				{unreadCount > 0 ? (
					<Pressable
						onPress={markAllAsRead}
						style={[
							styles.readAllButton,
							{ backgroundColor: colors.secondaryMute },
						]}
					>
						<CheckCheck size={14} color={colors.primaryGold} />
						<BodyText style={{ color: colors.primaryGold, marginLeft: 4 }}>
							Read All
						</BodyText>
					</Pressable>
				) : (
					<View style={{ width: 70 }} />
				)}
			</View>

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
				<BottomSheetView style={styles.sheetContent}>
					<View style={styles.sheetHeader}>
						<View />
						<Pressable onPress={() => bottomSheetRef.current?.close()}>
							<X size={20} color={colors.textSecondary} />
						</Pressable>
					</View>
					<NormalTitle style={styles.sheetTitle}>
						{selectedNoti?.title}
					</NormalTitle>
					<BodyText style={styles.sheetTime}>
						{selectedNoti && formatTime(selectedNoti.createdAt)}
					</BodyText>
					<BodyText style={styles.sheetBody}>{selectedNoti?.body}</BodyText>
					<Pressable
						style={[styles.sheetCta, { backgroundColor: colors.primaryGold }]}
					>
						<BodyText style={{ color: "#fff", fontWeight: "600" }}>
							{selectedNoti && getCTA(selectedNoti.type)}
						</BodyText>
					</Pressable>
				</BottomSheetView>
			</BottomSheet>
		</SafeAreaView>
	);
}

// ==============================
// Notification Item Component
// ==============================
function NotificationItem({
	item,
	onPress,
}: {
	item: Notification;
	onPress: () => void;
}) {
	const colors = useTheme();
	const isUnread = !item.read;

	return (
		<Pressable
			onPress={onPress}
			style={[
				styles.card,
				{
					backgroundColor: isUnread
						? colors.primaryGold + 10
						: colors.background,
					borderWidth: isUnread ? 1 : 0,
					borderColor: isUnread ? colors.primaryGold + 50 : "transparent",
				},
			]}
		>
			<View style={styles.cardRow}>
				<View style={styles.dotContainer}>
					{isUnread && (
						<View
							style={[styles.dot, { backgroundColor: colors.primaryGold }]}
						/>
					)}
				</View>
				<View style={styles.contentContainer}>
					<NormalTitle numberOfLines={1} style={styles.cardTitle}>
						{item.title}
					</NormalTitle>
					<BodyText numberOfLines={2} style={styles.cardBody}>
						{item.body}
					</BodyText>
				</View>
				<View style={styles.timeContainer}>
					<BodyText style={styles.time}>{formatTime(item.createdAt)}</BodyText>
				</View>
			</View>
		</Pressable>
	);
}

// ==============================
// Time Formatter
// ==============================
function formatTime(date: Date) {
	const now = Date.now();
	const diff = Math.floor((now - date.getTime()) / 1000);

	if (diff < 60) return "Just now";
	if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
	if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
	return `${Math.floor(diff / 86400)} days ago`;
}

// ==============================
// Styles
// ==============================
const styles = StyleSheet.create({
	container: { flex: 1 },
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
	},
	leftHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	headerCenter: {
		alignItems: "flex-start",
	},
	title: { fontSize: 16, fontWeight: "600", marginBottom: 2 },
	subtitle: { fontSize: 12 },
	readAllButton: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 30,
		gap: 4,
	},
	card: {
		borderRadius: 12,
		marginBottom: 12,
		overflow: "hidden",
	},
	cardRow: {
		flexDirection: "row",
		padding: 12,
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
		marginTop: 4,
	},
	cardTitle: {
		fontSize: 14,
		fontWeight: "600",
		marginBottom: 2,
	},
	cardBody: {
		fontSize: 12,
		lineHeight: 16,
	},
	sheetContent: {
		padding: 16,
	},
	sheetHeader: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginBottom: 12,
	},
	sheetTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 6,
	},
	sheetTime: {
		fontSize: 12,
		color: "#888",
		marginBottom: 16,
	},
	sheetBody: {
		fontSize: 14,
		lineHeight: 20,
		marginBottom: 20,
	},
	sheetCta: {
		paddingVertical: 12,
		borderRadius: 15,
		alignItems: "center",
	},
});
