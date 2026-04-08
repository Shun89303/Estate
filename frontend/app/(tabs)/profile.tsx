import { useRouter } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useMemo, useCallback } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import TopUpCoins from "@/components/profile/TopUpCoins";
import { requireAuth } from "@/utils/requireAuth";
import { useAuthStore } from "@/stores/authStore";

export default function Profile() {
	const router = useRouter();
	const logout = useAuthStore((s) => s.logout);
	const bottomSheetRef = useRef<BottomSheet>(null);
	const logoutSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["50%", "70%"], []);

	const handleOpenSheet = useCallback(() => {
		bottomSheetRef.current?.expand();
	}, []);

	const openLogoutSheet = useCallback(() => {
		bottomSheetRef.current?.close();
		logoutSheetRef.current?.expand();
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, padding: 16 }}>
			{/* HEADER */}
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: 20,
				}}
			>
				<TouchableOpacity onPress={() => router.back()}>
					<Text>{"< Back"}</Text>
				</TouchableOpacity>

				<Text style={{ fontWeight: "bold", fontSize: 18 }}>Profile</Text>

				<TouchableOpacity onPress={() => router.push("/notifications")}>
					<Text>🔔</Text>
				</TouchableOpacity>
			</View>

			{/* PROFILE INFO */}
			<View style={{ alignItems: "center", marginBottom: 24 }}>
				<Image
					source={{
						uri: "abc",
					}}
					style={{
						width: 100,
						height: 100,
						borderRadius: 20,
						marginBottom: 10,
						backgroundColor: "black",
					}}
				/>

				<Text style={{ fontSize: 18, fontWeight: "600" }}>Myanmar User</Text>
				<Text style={{ color: "gray" }}>+95 9 xxx xxx xxx</Text>
			</View>

			{/* COIN CONTAINER */}
			<View
				style={{
					padding: 16,
					borderRadius: 12,
					backgroundColor: "#f5f5f5",
					marginBottom: 16,
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				{/* LEFT */}
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text style={{ marginRight: 10 }}>🪙</Text>
					<View>
						<Text style={{ fontWeight: "600" }}>Coin Balance</Text>
						<Text>20</Text>
					</View>
				</View>

				{/* RIGHT */}
				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity
						style={{ marginRight: 12 }}
						onPress={() => router.push("/profile/coinHistory")}
					>
						<Text>History</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={handleOpenSheet}>
						<Text>Top Up</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* AGENT / OWNER */}
			<TouchableOpacity
				style={{
					padding: 16,
					borderRadius: 12,
					backgroundColor: "#f5f5f5",
					marginBottom: 16,
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
				onPress={() => router.push("/profile/appAd")}
			>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text style={{ marginRight: 10 }}>🏠</Text>
					<View>
						<Text style={{ fontWeight: "600" }}>
							Are you an Agent or Owner?
						</Text>
						<Text style={{ color: "gray" }}>
							Post your property & find buyers
						</Text>
					</View>
				</View>

				<Text>{">"}</Text>
			</TouchableOpacity>

			{/* MENU ITEMS */}
			<View>
				<TouchableOpacity
					style={{
						paddingVertical: 16,
						borderBottomWidth: 1,
						borderBottomColor: "#eee",
					}}
					onPress={() => requireAuth(() => router.push("/profile/editProfile"))}
				>
					<Text>Edit Profile</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={{
						paddingVertical: 16,
						borderBottomWidth: 1,
						borderBottomColor: "#eee",
					}}
					onPress={() => router.push("/profile/settings")}
				>
					<Text>Settings</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={{
						paddingVertical: 16,
						borderBottomWidth: 1,
						borderBottomColor: "#eee",
					}}
					onPress={() => router.push("/profile/help")}
				>
					<Text>Help & Support</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={{
						paddingVertical: 16,
						borderBottomWidth: 1,
						borderBottomColor: "#eee",
					}}
					onPress={openLogoutSheet}
				>
					<Text style={{ color: "red" }}>Log Out</Text>
				</TouchableOpacity>
			</View>
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
					<View style={{ padding: 16 }}>
						<Text
							style={{
								fontSize: 16,
								fontWeight: "600",
								marginBottom: 12,
							}}
						>
							Are you sure you want to log out of your account?
						</Text>

						<View
							style={{ flexDirection: "row", justifyContent: "space-between" }}
						>
							{/* Cancel */}
							<TouchableOpacity
								style={{
									flex: 1,
									padding: 12,
									borderRadius: 8,
									backgroundColor: "#eee",
									marginRight: 8,
									alignItems: "center",
								}}
								onPress={() => logoutSheetRef.current?.close()}
							>
								<Text>Cancel</Text>
							</TouchableOpacity>

							{/* Confirm Logout */}
							<TouchableOpacity
								style={{
									flex: 1,
									padding: 12,
									borderRadius: 8,
									backgroundColor: "red",
									alignItems: "center",
								}}
								onPress={() => {
									logoutSheetRef.current?.close();
									logout();
									router.push("/auth/login");
								}}
							>
								<Text style={{ color: "#fff" }}>Log Out</Text>
							</TouchableOpacity>
						</View>
					</View>
				</BottomSheetView>
			</BottomSheet>
		</SafeAreaView>
	);
}
