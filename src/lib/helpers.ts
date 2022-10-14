export function random<T>(collection: T[]): T | undefined {
	if (!collection) {
		return undefined;
	}

	if (collection.length == 0) {
		return undefined;
	}

	const index = Math.floor(Math.random() * collection.length);
	return collection[index];
}
