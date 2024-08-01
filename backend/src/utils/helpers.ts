export function generateRandomString(len: number): string {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let r = '';

	for (let i = 0; i < len; i++) {
		const random_idx = Math.floor(Math.random() * chars.length);
		r += chars[random_idx];
	}

	return r;
}
