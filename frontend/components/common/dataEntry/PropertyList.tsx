import { FlatList, StyleProp, ViewStyle } from "react-native";
import EmptyState from "@/components/common/state/EmptyState";
import { spacing } from "@/utils/metrics";

interface PropertyListProps<T> {
	data: T[];
	renderItem: (item: T, index: number) => React.ReactElement;
	keyExtractor?: (item: T, index: number) => string;
	contentContainerStyle?: StyleProp<ViewStyle>;
	ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
	onEndReached?: () => void;
	onEndReachedThreshold?: number;
	ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;
}

export default function PropertyList<T>({
	data,
	renderItem,
	keyExtractor = (item: any, index) => item.id?.toString() ?? index.toString(),
	contentContainerStyle = { paddingHorizontal: spacing.lg },
	ListEmptyComponent = <EmptyState />,
	onEndReached,
	onEndReachedThreshold = 0.5,
	ListFooterComponent,
}: PropertyListProps<T>) {
	return (
		<FlatList
			data={data}
			keyExtractor={keyExtractor}
			renderItem={({ item, index }) => renderItem(item, index)}
			contentContainerStyle={contentContainerStyle}
			ListEmptyComponent={ListEmptyComponent}
			onEndReached={onEndReached}
			onEndReachedThreshold={onEndReachedThreshold}
			ListFooterComponent={ListFooterComponent}
			showsVerticalScrollIndicator={false}
		/>
	);
}
