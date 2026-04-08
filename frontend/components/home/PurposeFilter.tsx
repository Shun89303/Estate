import { ScrollView, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { NormalTitle } from "../atoms/Typography";

export default function PurposeFilter() {
	const router = useRouter();
	const colors = useTheme();

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
		>
			<Pressable
				onPress={() => router.push("/(tabs)/search")}
				style={[
					styles.item,
					{
						backgroundColor: colors.primaryBackground,
						borderColor: colors.border,
					},
				]}
			>
				<NormalTitle
					style={{
						color: colors.primaryGold,
					}}
				>
					📈 For Investment
				</NormalTitle>
			</Pressable>

			<Pressable
				onPress={() => router.push("/(tabs)/search")}
				style={[
					styles.item,
					{
						backgroundColor: colors.primaryBackground,
						borderColor: colors.border,
					},
				]}
			>
				<NormalTitle
					style={{
						color: colors.primaryGold,
					}}
				>
					🏠 For Living
				</NormalTitle>
			</Pressable>

			<Pressable
				onPress={() => router.push("/(tabs)/search")}
				style={[
					styles.item,
					{
						backgroundColor: colors.primaryBackground,
						borderColor: colors.border,
					},
				]}
			>
				<NormalTitle
					style={{
						color: colors.primaryGold,
					}}
				>
					🔑 For Rent
				</NormalTitle>
			</Pressable>

			<Pressable
				onPress={() => router.push("/(tabs)/search")}
				style={[
					styles.item,
					{
						backgroundColor: colors.primaryBackground,
						borderColor: colors.border,
					},
				]}
			>
				<NormalTitle
					style={{
						color: colors.primaryGold,
					}}
				>
					🛂 For Long Stay Visa
				</NormalTitle>
			</Pressable>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 0,
		marginVertical: 20, // pushes elements below
	},
	contentContainer: {
		paddingHorizontal: 16,
		gap: 10,
	},
	item: {
		borderWidth: 1,
		paddingVertical: 8,
		paddingHorizontal: 14,
		borderRadius: 15, // pill shape for modern look
	},
});
