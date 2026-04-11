import { useRouter } from "expo-router";
import {
	View,
	TextInput,
	Image,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/common/BackButton";
import { BodyText, PageTitle } from "@/components/atoms/Typography";
import { useTheme } from "@/hooks/useTheme";
import { User, Camera } from "lucide-react-native";

// Mock existing user data
const mockUser = {
	name: "Myanmar User",
	phone: "09123456789",
	email: "",
};

export default function EditProfile() {
	const router = useRouter();
	const colors = useTheme();

	const [imageUri, setImageUri] = useState<string | null>(null);
	const [name, setName] = useState(mockUser?.name || "");
	const [phone, setPhone] = useState(mockUser?.phone || "");
	const [email, setEmail] = useState(mockUser?.email || "");

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			setImageUri(result.assets[0].uri);
		}
	};

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<View style={styles.headerRow}>
				<BackButton />
				<PageTitle style={styles.header}>Edit Profile</PageTitle>
			</View>

			{/* Profile Image with camera overlay */}
			<TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
				{imageUri ? (
					<Image source={{ uri: imageUri }} style={styles.profileImage} />
				) : (
					<View
						style={[
							styles.placeholder,
							{ backgroundColor: colors.primaryGold + 20 },
						]}
					>
						<User size={38} color={colors.primaryGold} />
					</View>
				)}
				<View
					style={[
						styles.cameraIconContainer,
						{ backgroundColor: colors.primaryGold },
					]}
				>
					<Camera size={16} color="#fff" />
				</View>
			</TouchableOpacity>

			{/* Inputs */}
			<View style={styles.inputGroup}>
				<BodyText style={[styles.label, { color: colors.textPrimary }]}>
					Full Name
				</BodyText>
				<TextInput
					style={[
						styles.input,
						{ borderColor: colors.border, color: colors.textPrimary },
					]}
					value={name}
					onChangeText={setName}
					placeholder="Enter your full name"
					placeholderTextColor={colors.textSecondary}
				/>
			</View>

			<View style={styles.inputGroup}>
				<BodyText style={[styles.label, { color: colors.textPrimary }]}>
					Phone Number
				</BodyText>
				<TextInput
					style={[
						styles.input,
						{ borderColor: colors.border, color: colors.textPrimary },
					]}
					value={phone}
					onChangeText={setPhone}
					placeholder="Enter your phone number"
					keyboardType="phone-pad"
					placeholderTextColor={colors.textSecondary}
				/>
			</View>

			<View style={styles.inputGroup}>
				<BodyText style={[styles.label, { color: colors.textPrimary }]}>
					Email (optional)
				</BodyText>
				<TextInput
					style={[
						styles.input,
						{ borderColor: colors.border, color: colors.textPrimary },
					]}
					value={email}
					onChangeText={setEmail}
					placeholder="Enter your email"
					keyboardType="email-address"
					placeholderTextColor={colors.textSecondary}
				/>
			</View>

			{/* Save Changes */}
			<TouchableOpacity
				style={[styles.saveButton, { backgroundColor: colors.primaryGold }]}
				onPress={() => router.push("/(tabs)/profile")}
			>
				<BodyText style={styles.saveText}>Save Changes</BodyText>
			</TouchableOpacity>
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
	imagePicker: {
		alignSelf: "center",
		marginBottom: 24,
		position: "relative",
	},
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 15,
	},
	placeholder: {
		width: 100,
		height: 100,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	cameraIconContainer: {
		position: "absolute",
		bottom: -5,
		right: -5,
		width: 32,
		height: 32,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		borderColor: "#fff",
	},
	inputGroup: {
		marginBottom: 16,
	},
	label: {
		fontSize: 12,
		marginBottom: 4,
	},
	input: {
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 8,
		fontSize: 14,
	},
	saveButton: {
		paddingVertical: 12,
		borderRadius: 15,
		marginTop: 24,
		alignItems: "center",
	},
	saveText: {
		color: "#fff",
		fontSize: 14,
		fontWeight: "600",
	},
});
