// app/profile/login.tsx
import { useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";
import TextChip from "@/components/common/TextChip";
import GoogleButton from "@/components/common/GoogleButton";
import { lightColors } from "@/theme/light";
import { spacing, scaleSize } from "@/utils/metrics";

export default function Login() {
	const router = useRouter();

	const handleGoogleSignIn = () => {
		router.push("/login/loginProcess");
	};

	return (
		<SafeAreaView
			style={[
				styles.container,
				{ backgroundColor: lightColors.entireAppBackground },
			]}
		>
			<View style={styles.content}>
				{/* Logo as a TextChip */}
				<TextChip
					text="P"
					style={styles.logoChip}
					textStyle={styles.logoChipText}
				/>

				<Title variant="page" style={styles.title}>
					Agent Portal
				</Title>

				<BodyText variant="normal" style={styles.subtitle}>
					Sign in to manage your listings
				</BodyText>

				<GoogleButton onPress={handleGoogleSignIn} />

				<BodyText variant="small" style={styles.terms}>
					By continuing, you agree to our{" "}
					<BodyText variant="small" style={styles.link}>
						Terms of Service
					</BodyText>{" "}
					and{" "}
					<BodyText variant="small" style={styles.link}>
						Privacy Policy
					</BodyText>
					.
				</BodyText>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: spacing.lg,
	},
	logoChip: {
		width: scaleSize(80),
		height: scaleSize(80),
		borderRadius: scaleSize(16),
		justifyContent: "center",
		alignItems: "center",
		marginBottom: spacing.xl,
		paddingHorizontal: 0,
		paddingVertical: 0,
		backgroundColor: lightColors.brandBG,
	},
	logoChipText: {
		fontSize: scaleSize(32),
		fontWeight: "bold",
		color: lightColors.brand,
		marginBottom: 0,
		lineHeight: scaleSize(40),
	},
	title: { textAlign: "center", marginBottom: spacing.sm },
	subtitle: { textAlign: "center", marginBottom: spacing.xl },
	terms: {
		textAlign: "center",
		color: lightColors.bodyText,
		lineHeight: scaleSize(16),
		marginTop: spacing.xl,
	},
	link: {
		textDecorationLine: "underline",
		color: lightColors.brand,
	},
});
