export function maskPhoneNumber(phone: string): string {
	// Extract digits only to count them
	const digits = phone.replace(/\D/g, "");
	if (digits.length < 7) {
		// If fewer than 7 digits, mask all but the first two (or just return original)
		return phone.replace(/\d/g, "x");
	}

	// Split the string into parts while preserving non-digit characters
	let digitIndex = 0;
	let result = "";
	let maskedCount = 0;

	for (let i = 0; i < phone.length; i++) {
		const ch = phone[i];
		if (/\d/.test(ch)) {
			digitIndex++;
			if (digitIndex > digits.length - 7) {
				// This digit belongs to the last 7 digits – mask it
				if (maskedCount === 0) result += "xxx ";
				maskedCount++;
				if (maskedCount === 7 && i !== phone.length - 1) {
					// After 7 masked digits, we might have more non-digit characters; we don't add space automatically
				}
				// Only add 'x' characters, not the original digit
				if (maskedCount <= 7) {
					// We'll build the masked block at the end; for now, just track
				}
			} else {
				result += ch;
			}
		} else {
			result += ch;
		}
	}

	// Append the masked block
	result += "xxx xxxx";

	// Clean up any double spaces or trailing spaces
	return result.replace(/\s+/g, " ").trim();
}
