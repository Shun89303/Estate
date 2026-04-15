import { useState, useRef, useCallback } from "react";
import {
	View,
	StyleSheet,
	Pressable,
	FlatList,
	Animated,
	Dimensions,
	TouchableWithoutFeedback,
	Image,
} from "react-native";
import { GitCompareArrows } from "lucide-react-native";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";
import { lightColors } from "@/theme/light";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import globalStyles from "@/styles/styles";
import { BuyBusiness } from "@/mock/buyBusiness";
import { getBestValue, rows } from "@/components/buyBusiness/compare/utils";

const { height: screenHeight } = Dimensions.get("window");

export function useCompareSheet() {
	const [showSheet, setShowSheet] = useState(false);
	const [businesses, setBusinesses] = useState<BuyBusiness[]>([]);
	const slideAnim = useRef(new Animated.Value(0)).current;

	const open = useCallback((selectedBusinesses: BuyBusiness[]) => {
		setBusinesses(selectedBusinesses);
		setShowSheet(true);
		Animated.timing(slideAnim, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true,
		}).start();
	}, []);

	const close = useCallback(() => {
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => setShowSheet(false));
	}, []);

	const CompareSheet = () => (
		<>
			{showSheet && (
				<>
					{/* Backdrop */}
					<TouchableWithoutFeedback onPress={close}>
						<Animated.View
							style={[
								styles.backdrop,
								{
									opacity: slideAnim.interpolate({
										inputRange: [0, 1],
										outputRange: [0, 0.5],
									}),
								},
							]}
						/>
					</TouchableWithoutFeedback>

					{/* Sheet Container */}
					<Animated.View
						style={[
							styles.sheetContainer,
							{
								transform: [
									{
										translateY: slideAnim.interpolate({
											inputRange: [0, 1],
											outputRange: [screenHeight, 0],
										}),
									},
								],
								height: screenHeight * 0.85,
							},
						]}
					>
						<View style={styles.sheetHandle} />
						<FlatList
							data={rows}
							keyExtractor={(item) => item.label}
							renderItem={({ item, index }) => {
								const rowValues = businesses.map((b) =>
									item.key === "type"
										? (b[item.key as keyof BuyBusiness] as string)
										: (b[item.key as keyof BuyBusiness] as number),
								);
								const numericValues = rowValues.filter(
									(v): v is number => typeof v === "number",
								);
								const best = item.best
									? getBestValue(numericValues, item.best)
									: null;

								// Determine background color based on index parity
								const cardBgColor =
									index % 2 === 0
										? lightColors.mutedBackgroundWeaker
										: lightColors.background;

								return (
									<View
										style={[
											styles.attributeCard,
											{ backgroundColor: cardBgColor },
										]}
									>
										<BodyText variant="small" style={styles.attributeTitle}>
											{item.label}
										</BodyText>
										<View style={styles.valuesRow}>
											{rowValues.map((val, idx) => {
												const numericVal =
													typeof val === "number"
														? val
														: parseFloat(val as string);
												const isBest =
													best !== null && item.best && numericVal === best;
												return (
													<View key={idx} style={styles.businessColumn}>
														<BodyText
															variant="normal"
															style={[
																styles.valueText,
																isBest ? styles.bestValue : null,
															]}
														>
															{item.format(val as string | number)}
														</BodyText>
														{isBest && (
															<BodyText
																variant="small"
																style={styles.bestBadge}
															>
																Best
															</BodyText>
														)}
													</View>
												);
											})}
										</View>
									</View>
								);
							}}
							ListHeaderComponent={
								<>
									<View style={styles.compareHeader}>
										<View style={styles.titleContainer}>
											<GitCompareArrows
												size={moderateScale(24)}
												color={lightColors.brand}
											/>
											<Title variant="page" style={styles.compareTitle}>
												Compare Businesses
											</Title>
										</View>
									</View>
									<View style={styles.headerRow}>
										{businesses.map((biz) => (
											<View key={biz.uniqueCode} style={styles.businessColumn}>
												<Image
													source={{ uri: biz.coverImage }}
													style={styles.image}
												/>
												<Title
													variant="small"
													style={styles.businessName}
													numberOfLines={2}
												>
													{biz.title}
												</Title>
												<BodyText
													variant="small"
													style={styles.businessLocation}
													numberOfLines={1}
												>
													{biz.location}
												</BodyText>
											</View>
										))}
									</View>
								</>
							}
							ListFooterComponent={
								<Pressable style={styles.doneButton} onPress={close}>
									<Title variant="normal" style={{ marginBottom: 0 }}>
										Done
									</Title>
								</Pressable>
							}
							showsVerticalScrollIndicator={false}
							contentContainerStyle={styles.listContent}
						/>
					</Animated.View>
				</>
			)}
		</>
	);

	return { open, close, CompareSheet };
}

const styles = StyleSheet.create({
	backdrop: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "#000",
	},
	sheetContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: lightColors.background,
		borderTopLeftRadius: scaleSize(20),
		borderTopRightRadius: scaleSize(20),
		...globalStyles.shadows,
	},
	sheetHandle: {
		width: scaleSize(40),
		height: scaleSize(4),
		backgroundColor: lightColors.mutedBorder,
		borderRadius: scaleSize(2),
		alignSelf: "center",
		marginTop: spacing.sm,
		marginBottom: spacing.md,
	},
	compareHeader: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "flex-start",
		marginBottom: spacing.md,
		marginHorizontal: spacing.xl,
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.sm,
	},
	compareTitle: {
		marginBottom: 0,
	},
	headerRow: {
		flexDirection: "row",
		marginBottom: spacing.md,
		paddingBottom: spacing.sm,
		paddingHorizontal: spacing.md,
	},
	businessColumn: {
		flex: 1,
		alignItems: "center",
		paddingHorizontal: spacing.xs,
	},
	image: {
		width: scaleSize(100),
		height: scaleSize(80),
		borderRadius: scaleSize(8),
		marginBottom: spacing.sm,
	},
	businessName: {
		textAlign: "center",
		marginBottom: scaleSize(4),
	},
	businessLocation: {
		textAlign: "center",
		color: lightColors.bodyText,
	},
	attributeCard: {
		backgroundColor: lightColors.background,
		borderRadius: scaleSize(12),
		padding: spacing.md,
		marginBottom: spacing.md,
		marginHorizontal: spacing.md,
	},
	attributeTitle: {
		fontWeight: "bold",
		textAlign: "left",
	},
	valuesRow: {
		flexDirection: "row",
	},
	valueText: {
		textAlign: "center",
		color: lightColors.bigTitleText,
		fontWeight: "600",
	},
	bestValue: {
		fontWeight: "700",
		color: lightColors.success,
	},
	bestBadge: {
		textAlign: "center",
		color: lightColors.success,
		fontWeight: "600",
		marginTop: scaleSize(2),
	},
	doneButton: {
		backgroundColor: lightColors.background,
		paddingVertical: spacing.md,
		marginHorizontal: spacing.md,
		borderRadius: scaleSize(8),
		alignItems: "center",
		marginVertical: spacing.md,
		borderWidth: scaleSize(1),
		borderColor: lightColors.mutedBorder,
	},
	listContent: {
		paddingBottom: spacing.xl,
	},
});
