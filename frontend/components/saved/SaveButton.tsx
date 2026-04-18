import { Heart } from "lucide-react-native";
import {
	useSavedPropertiesStore,
	SavedItem,
} from "@/stores/savedPropertiesStore";
import { useAuthStore } from "@/stores/authStore";
import { moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";
import RequireAuth from "../common/security/RequireAuth";

interface SaveButtonProps {
	savedItem: SavedItem;
	size?: number;
}

export default function SaveButton({ savedItem, size = 24 }: SaveButtonProps) {
	const { user } = useAuthStore();
	const uid = user?.uid;
	const saved = useSavedPropertiesStore((state) =>
		uid
			? state.items.some((item) => item.uniqueCode === savedItem.uniqueCode)
			: false,
	);
	const { addSaved, removeSaved } = useSavedPropertiesStore();

	const handlePress = () => {
		if (!uid) return;
		if (saved) {
			removeSaved(savedItem.uniqueCode, uid);
		} else {
			addSaved(savedItem, uid);
		}
	};

	return (
		<RequireAuth onPress={handlePress} activeOpacity={0.7}>
			<Heart
				size={moderateScale(size)}
				color={saved ? lightColors.danger : lightColors.bigTitleText}
				fill={saved ? lightColors.danger : "none"}
			/>
		</RequireAuth>
	);
}
