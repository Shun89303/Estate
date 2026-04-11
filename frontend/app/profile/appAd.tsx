import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	useWindowDimensions,
	Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { BodyText, NormalTitle } from "@/components/atoms/Typography";
import { useTheme } from "@/hooks/useTheme";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withRepeat,
	withTiming,
	withDelay,
	Easing,
	cancelAnimation,
} from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

// Pulsing circle component (only used for step 1)
const PulsingCircle = ({
	size,
	color,
	duration = 2000,
	initialDelay = 0,
}: {
	size: number;
	color: string;
	duration?: number;
	initialDelay?: number;
}) => {
	const scale = useSharedValue(1);
	const opacity = useSharedValue(0.6);

	useEffect(() => {
		const scaleAnimation = withRepeat(
			withTiming(1.2, {
				duration: duration / 2,
				easing: Easing.inOut(Easing.ease),
			}),
			-1,
			true,
		);
		const opacityAnimation = withRepeat(
			withTiming(1, {
				duration: duration / 2,
				easing: Easing.inOut(Easing.ease),
			}),
			-1,
			true,
		);

		if (initialDelay > 0) {
			scale.value = withDelay(initialDelay, scaleAnimation);
			opacity.value = withDelay(initialDelay, opacityAnimation);
		} else {
			scale.value = scaleAnimation;
			opacity.value = opacityAnimation;
		}

		return () => {
			cancelAnimation(scale);
			cancelAnimation(opacity);
		};
	}, [duration, initialDelay]);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
		opacity: opacity.value,
	}));

	return (
		<AnimatedView
			style={[
				{
					width: size,
					height: size,
					borderRadius: size / 2,
					backgroundColor: color,
					position: "absolute",
					alignSelf: "center",
				},
				animatedStyle,
			]}
		/>
	);
};

// Scattered emoji component (only used for step 1)
const ScatteredEmoji = ({
	startX,
	startY,
	offsetRange = 15,
	duration = 2500,
	delay = 0,
	colors,
}: {
	startX: number;
	startY: number;
	offsetRange?: number;
	duration?: number;
	delay?: number;
	colors: any;
}) => {
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	useEffect(() => {
		const oscillation = withRepeat(
			withTiming(offsetRange, {
				duration: duration / 2,
				easing: Easing.inOut(Easing.ease),
			}),
			-1,
			true,
		);
		const oscillationLong = withRepeat(
			withTiming(-offsetRange, {
				duration: duration,
				easing: Easing.inOut(Easing.ease),
			}),
			-1,
			true,
		);
		// Simplified for brevity – you can restore the original sequence if needed
		const repeated = withRepeat(
			withTiming(offsetRange, {
				duration: duration,
				easing: Easing.inOut(Easing.ease),
			}),
			-1,
			true,
		);
		if (delay > 0) {
			translateX.value = withDelay(delay, repeated);
			translateY.value = withDelay(delay, repeated);
		} else {
			translateX.value = repeated;
			translateY.value = repeated;
		}
		return () => {
			cancelAnimation(translateX);
			cancelAnimation(translateY);
		};
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateX: translateX.value },
			{ translateY: translateY.value },
		],
	}));

	return (
		<AnimatedView
			style={[
				styles.scatteredEmojiContainer,
				{
					top: startY,
					left: startX,
					borderColor: colors.primaryGold + 80,
					backgroundColor: "#fff",
				},
				animatedStyle,
			]}
		>
			<Text style={styles.scatteredEmojiText}>👤</Text>
		</AnimatedView>
	);
};

export default function AppAd() {
	const router = useRouter();
	const colors = useTheme();
	const [step, setStep] = useState(1);
	const { width: screenWidth } = useWindowDimensions();
	const containerSize = Math.min(screenWidth * 0.9, 320);

	const steps = [
		{
			title: "Marketing is ours",
			subtitle: "Deal is yours",
			body: "We drive thousands of users to the app to discover your properties. You focus on closing deals.",
			gradientTop: colors.primaryGold + "40",
			gradientBottom: colors.primaryGold + "10",
		},
		{
			title: "Show rooms,\nclose deals",
			subtitle:
				"We handle the marketing. You only need to show the room on-site and manage the legal process.",
			body: "",
			gradientTop: colors.primaryGreen + "40",
			gradientBottom: colors.primaryGreen + "10",
		},
		{
			title: "Your listings,\nyour control",
			subtitle:
				"Upload properties in minutes, track viewers, manage notes, and mark sold — all from your phone.",
			body: "",
			gradientTop: "#FF69B4" + "40", // pink
			gradientBottom: "#FF69B4" + "10",
		},
	];

	const nextStep = () => {
		if (step < steps.length) {
			setStep(step + 1);
		} else {
			router.push("/profile/login");
		}
	};

	const skip = () => {
		router.push("/profile/login");
	};

	const currentStep = steps[step - 1];
	const isLastStep = step === steps.length;

	const gradientColors = [
		currentStep.gradientTop,
		currentStep.gradientBottom,
	] as const;

	// Circle sizes and colors (only for step 1)
	const smallSize = 60;
	const mediumSize = 130;
	const largeSize = 180;
	const smallColor = colors.primaryGold;
	const mediumColor = colors.primaryGold + "80";
	const largeColor = colors.primaryGold + "40";
	const smallAnim = { duration: 4000 };
	const mediumAnim = { duration: 5600, initialDelay: 800 };
	const largeAnim = { duration: 7200, initialDelay: 1600 };

	// Scattered emoji positions (only for step 1)
	const scatteredPositions = [
		{
			startX: containerSize * 0.15,
			startY: containerSize * 0.1,
			offset: 12,
			duration: 2800,
			delay: 0,
		},
		{
			startX: containerSize * 0.35,
			startY: containerSize * 0.05,
			offset: 10,
			duration: 3200,
			delay: 400,
		},
		{
			startX: containerSize * 0.6,
			startY: containerSize * 0.15,
			offset: 14,
			duration: 2600,
			delay: 800,
		},
		{
			startX: containerSize * 0.8,
			startY: containerSize * 0.08,
			offset: 11,
			duration: 3000,
			delay: 200,
		},
		{
			startX: containerSize * 0.5,
			startY: containerSize * 0.25,
			offset: 9,
			duration: 2700,
			delay: 600,
		},
	];

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<View style={styles.content}>
				<LinearGradient
					colors={gradientColors}
					start={{ x: 0.5, y: 0 }}
					end={{ x: 0.5, y: 1 }}
					style={styles.illustrationContainer}
				>
					{/* Only render animations for step 1 */}
					{step === 1 && (
						<>
							<View style={styles.circlesContainer}>
								<PulsingCircle
									size={smallSize}
									color={smallColor}
									{...smallAnim}
								/>
								<PulsingCircle
									size={mediumSize}
									color={mediumColor}
									{...mediumAnim}
								/>
								<PulsingCircle
									size={largeSize}
									color={largeColor}
									{...largeAnim}
								/>
							</View>
							<Text style={styles.centerEmoji}>📣</Text>
							{scatteredPositions.map((pos, idx) => (
								<ScatteredEmoji
									key={idx}
									startX={pos.startX}
									startY={pos.startY}
									offsetRange={pos.offset}
									duration={pos.duration}
									delay={pos.delay}
									colors={colors}
								/>
							))}
						</>
					)}
				</LinearGradient>

				<View style={styles.textContainer}>
					<NormalTitle style={[styles.title, { color: colors.textPrimary }]}>
						{currentStep.title}
					</NormalTitle>
					<BodyText
						style={[
							styles.subtitle,
							{ color: colors.primaryGold, fontWeight: "700" },
						]}
					>
						{currentStep.subtitle}
					</BodyText>
					{currentStep.body ? (
						<BodyText style={[styles.body, { color: colors.textSecondary }]}>
							{currentStep.body}
						</BodyText>
					) : null}
				</View>
			</View>

			<View style={styles.stepIndicatorContainer}>
				{steps.map((_, index) => {
					const isCurrent = index + 1 === step;
					const backgroundColor = isCurrent
						? colors.primaryGold
						: colors.primaryGray + "20";
					return (
						<View
							key={index}
							style={[
								isCurrent ? styles.stepBar : styles.stepDot,
								{ backgroundColor },
							]}
						/>
					);
				})}
			</View>

			<View style={styles.footer}>
				{!isLastStep ? (
					<>
						<TouchableOpacity
							onPress={nextStep}
							style={[
								styles.nextButton,
								{ backgroundColor: colors.primaryGold },
							]}
						>
							<BodyText style={styles.nextButtonText}>Next →</BodyText>
						</TouchableOpacity>
						<TouchableOpacity onPress={skip}>
							<BodyText
								style={[styles.skipText, { color: colors.textSecondary }]}
							>
								Skip
							</BodyText>
						</TouchableOpacity>
					</>
				) : (
					<TouchableOpacity
						onPress={nextStep}
						style={[
							styles.getStartedButton,
							{ backgroundColor: colors.primaryGold },
						]}
					>
						<BodyText style={styles.getStartedText}>Get Started</BodyText>
					</TouchableOpacity>
				)}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingVertical: 32,
	},
	content: {
		flex: 1,
		justifyContent: "center",
	},
	illustrationContainer: {
		alignSelf: "center",
		width: "90%",
		aspectRatio: 1,
		maxWidth: 320,
		borderRadius: 24,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 32,
		overflow: "visible",
		position: "relative",
	},
	circlesContainer: {
		position: "absolute",
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	centerEmoji: {
		fontSize: 48,
		textAlign: "center",
		zIndex: 2,
	},
	scatteredEmojiContainer: {
		position: "absolute",
		borderRadius: 20,
		borderWidth: 1,
		padding: 4,
		alignItems: "center",
		justifyContent: "center",
		zIndex: 3,
	},
	scatteredEmojiText: {
		fontSize: 18,
	},
	textContainer: {
		alignItems: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 16,
		lineHeight: 22,
	},
	body: {
		fontSize: 14,
		textAlign: "center",
		lineHeight: 20,
	},
	stepIndicatorContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: 32,
	},
	stepBar: {
		width: 24,
		height: 10,
		borderRadius: 99,
		marginHorizontal: 6,
	},
	stepDot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		marginHorizontal: 6,
	},
	footer: {
		alignItems: "center",
	},
	nextButton: {
		paddingVertical: 12,
		paddingHorizontal: 40,
		borderRadius: 15,
		marginBottom: 12,
		width: "100%",
		alignItems: "center",
	},
	nextButtonText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 16,
	},
	skipText: {
		fontSize: 14,
		fontWeight: "500",
	},
	getStartedButton: {
		paddingVertical: 14,
		paddingHorizontal: 48,
		borderRadius: 30,
	},
	getStartedText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 16,
	},
});
