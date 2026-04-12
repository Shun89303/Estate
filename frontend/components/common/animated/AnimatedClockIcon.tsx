import { useEffect, useRef } from "react";
import { Animated, View, StyleSheet, ViewStyle } from "react-native";
import { Clock } from "lucide-react-native";
import { scaleSize } from "@/utils/metrics";

interface AnimatedClockIconProps {
	size?: number;
	color?: string;
	backgroundColor?: string;
	containerStyle?: ViewStyle;
	duration?: number; // milliseconds per full rotation
}

export default function AnimatedClockIcon({
	size = 32,
	color = "#fff",
	backgroundColor = "transparent",
	containerStyle,
	duration = 2000,
}: AnimatedClockIconProps) {
	const rotationAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const startRotation = () => {
			Animated.loop(
				Animated.timing(rotationAnim, {
					toValue: 1,
					duration,
					useNativeDriver: true,
				}),
			).start();
		};
		startRotation();
	}, [rotationAnim, duration]);

	const spin = rotationAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});

	const iconSize = scaleSize(size);
	const containerSize = scaleSize(size * 2.25); // ~72 for size=32

	return (
		<View
			style={[
				styles.container,
				{
					width: containerSize,
					height: containerSize,
					borderRadius: containerSize / 2,
					backgroundColor,
				},
				containerStyle,
			]}
		>
			<Animated.View style={{ transform: [{ rotate: spin }] }}>
				<Clock size={iconSize} color={color} />
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
});
