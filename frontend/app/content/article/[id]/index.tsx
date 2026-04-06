import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ArticleDetails() {
	const router = useRouter();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Pressable onPress={() => router.back()}>
				<Text
					style={{
						fontSize: 12,
						fontWeight: "500",
					}}
				>
					Back
				</Text>
			</Pressable>
			<Text
				style={{
					fontSize: 12,
					fontWeight: "500",
				}}
			>
				Article Details
			</Text>
		</SafeAreaView>
	);
}
