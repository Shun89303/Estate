export function formatPrice(amount?: number): string {
	if (amount == null) return "0";
	// Use toLocaleString with options to avoid unnecessary decimals
	return Number(amount).toLocaleString("en-US", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	});
}
