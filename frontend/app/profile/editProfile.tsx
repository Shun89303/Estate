import { useRouter } from "expo-router";
import {
	Pressable,
	Text,
	View,
	TextInput,
	Image,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock existing user data
const mockUser = {
	name: "Myanmar User",
	phone: "09123456789",
	email: "",
};

export default function EditProfile() {
	const router = useRouter();

	const [imageUri, setImageUri] = useState<string | null>(null);
	const [name, setName] = useState(mockUser?.name || "");
	const [phone, setPhone] = useState(mockUser?.phone || "");
	const [email, setEmail] = useState(mockUser?.email || "");

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			setImageUri(result.assets[0].uri);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			{/* Back */}
			<Pressable onPress={() => router.back()}>
				<Text style={styles.back}>Back</Text>
			</Pressable>

			{/* Title */}
			<Text style={styles.header}>Edit Profile</Text>

			{/* Profile Image */}
			<TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
				{imageUri ? (
					<Image source={{ uri: imageUri }} style={styles.profileImage} />
				) : (
					<View style={styles.placeholder}>
						<Text style={styles.placeholderText}>Upload Image</Text>
					</View>
				)}
			</TouchableOpacity>

			{/* Inputs */}
			<View style={styles.inputGroup}>
				<Text style={styles.label}>Full Name</Text>
				<TextInput
					style={styles.input}
					value={name}
					onChangeText={setName}
					placeholder="Enter your full name"
				/>
			</View>

			<View style={styles.inputGroup}>
				<Text style={styles.label}>Phone Number</Text>
				<TextInput
					style={styles.input}
					value={phone}
					onChangeText={setPhone}
					placeholder="Enter your phone number"
					keyboardType="phone-pad"
				/>
			</View>

			<View style={styles.inputGroup}>
				<Text style={styles.label}>Email (optional)</Text>
				<TextInput
					style={styles.input}
					value={email}
					onChangeText={setEmail}
					placeholder="Enter your email"
					keyboardType="email-address"
				/>
			</View>

			{/* Save Changes */}
			<TouchableOpacity
				style={styles.saveButton}
				onPress={() => router.push("/(tabs)/profile")}
			>
				<Text style={styles.saveText}>Save Changes</Text>
			</TouchableOpacity>
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

	imagePicker: {
		alignSelf: "center",
		marginBottom: 24,
	},

	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},

	placeholder: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: "#eee",
		justifyContent: "center",
		alignItems: "center",
	},

	placeholderText: {
		color: "#666",
		fontSize: 12,
		textAlign: "center",
	},

	inputGroup: {
		marginBottom: 16,
	},

	label: {
		fontSize: 12,
		color: "#666",
		marginBottom: 4,
	},

	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 8,
		fontSize: 14,
	},

	saveButton: {
		backgroundColor: "#000",
		paddingVertical: 12,
		borderRadius: 8,
		marginTop: 24,
		alignItems: "center",
	},

	saveText: {
		color: "#fff",
		fontSize: 14,
		fontWeight: "600",
	},
});
