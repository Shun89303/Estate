import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as ImagePickerLib from "expo-image-picker";
import BackButton from "@/components/common/navigation/BackButton";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";
import { ImagePicker } from "@/components/common/utils/ImagePicker";
import { SimpleTextInput } from "@/components/common/dataEntry/SimpleTextInput";
import NextButton from "@/components/common/navigation/NextButton";
import { useAuthStore } from "@/stores/authStore";
import { spacing, scaleSize } from "@/utils/metrics";
import { lightColors } from "@/theme/light";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditProfile() {
	const router = useRouter();
	const { user, updateUser } = useAuthStore();
	const [name, setName] = useState(user?.name || "Myanmar User");
	const [phone, setPhone] = useState(user?.phone || "");
	const [email, setEmail] = useState(user?.email || "");
	const [profileImage, setProfileImage] = useState(user?.profileImage || "");
	const [isLoading, setIsLoading] = useState(false);

	const pickImage = async () => {
		const result = await ImagePickerLib.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.7,
		});
		if (!result.canceled) {
			setProfileImage(result.assets[0].uri);
		}
	};

	const handleSave = async () => {
		setIsLoading(true);
		try {
			updateUser({ name: name.trim(), email: email.trim(), profileImage });

			if (user && phone !== user.phone) {
				await AsyncStorage.removeItem(`@phone_uid_${user.phone}`);
				await AsyncStorage.setItem(
					`@phone_uid_${phone}`,
					JSON.stringify({ uid: user.uid }),
				);
			}

			Alert.alert("Success", "Profile updated", [
				{ text: "OK", onPress: () => router.back() },
			]);
		} catch (error) {
			Alert.alert("Error", "Failed to update profile");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<SafeAreaView
			style={[
				styles.container,
				{ backgroundColor: lightColors.entireAppBackground },
			]}
		>
			<View style={styles.headerRow}>
				<BackButton />
				<Title variant="page" style={styles.header}>
					Edit Profile
				</Title>
			</View>

			{/* Profile Image */}
			<View
				style={{
					paddingVertical: spacing.md,
				}}
			>
				<ImagePicker
					imageUri={profileImage}
					onPress={pickImage}
					backgroundColor={lightColors.brandBG}
					iconColor={lightColors.brand}
					showCameraOverlay={true}
					size={100}
					borderRadius={15}
					iconSize={38}
					cameraOverlayColor={lightColors.brand}
				/>
			</View>

			{/* Full Name */}
			<View
				style={[
					styles.inputGroup,
					{
						marginTop: spacing.sm,
					},
				]}
			>
				<Title variant="small">Full Name</Title>
				<SimpleTextInput
					placeholder="Enter your full name"
					value={name}
					onChangeText={setName}
				/>
			</View>

			{/* Phone Number */}
			<View style={styles.inputGroup}>
				<Title variant="small">Phone Number</Title>
				<SimpleTextInput
					placeholder="Enter your phone number"
					value={phone}
					onChangeText={setPhone}
					keyboardType="phone-pad"
				/>
			</View>

			{/* Email (optional) */}
			<View style={styles.inputGroup}>
				<Title variant="small">Email (optional)</Title>
				<SimpleTextInput
					placeholder="Enter your email"
					value={email}
					onChangeText={setEmail}
					keyboardType="email-address"
				/>
			</View>

			{/* Save Button */}
			<View style={styles.saveButtonWrapper}>
				<NextButton
					onPress={handleSave}
					title={isLoading ? "Saving..." : "Save Changes"}
					disabled={isLoading}
					variant="primary"
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.sm,
		marginBottom: spacing.xl,
		backgroundColor: lightColors.background,
		width: "100%",
		paddingHorizontal: spacing.sm,
		paddingVertical: spacing.md,
	},
	header: { marginBottom: 0 },
	inputGroup: {
		marginBottom: spacing.md,
		paddingHorizontal: spacing.lg,
		paddingBottom: spacing.md,
	},
	saveButtonWrapper: {
		marginTop: spacing.xl,
		paddingHorizontal: spacing.lg,
	},
});
