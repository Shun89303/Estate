import { usePropertyStore } from "@/stores/usePropertyStore";
import { useEffect } from "react";

export function useFetchProperties() {
	const { fetchProperties } = usePropertyStore();

	useEffect(() => {
		fetchProperties();
	}, []);
}
