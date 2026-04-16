export function parsePriceString(priceStr: string): number {
	// Remove '฿' and trim whitespace
	let cleaned = priceStr.replace(/฿/g, "").trim();

	// Split into parts if it's a range (contains "--")
	const parts = cleaned.includes("--") ? cleaned.split("--") : [cleaned];

	// Helper to parse a single price string (e.g., "3.5M")
	const parseSingle = (s: string): number => {
		s = s.trim();
		const multiplierMap: Record<string, number> = {
			K: 1000,
			M: 1000000,
			B: 1000000000,
		};
		const match = s.match(/([\d.]+)\s*([KMB]?)/i);
		if (match) {
			let value = parseFloat(match[1]);
			const suffix = match[2].toUpperCase();
			if (suffix && multiplierMap[suffix]) {
				value *= multiplierMap[suffix];
			}
			return value;
		}
		return parseFloat(s) || 0;
	};

	const numbers = parts.map(parseSingle);
	const sum = numbers.reduce((a, b) => a + b, 0);
	// Return the average, rounded to the nearest integer
	return Math.round(sum / numbers.length);
}
