export const validateTag = (raw: string) => {
	const trimmed = raw.trim();
	// test if the tag is valid with regex
	// length > 0
	// only contain alphanumeric characters, dashes and underscores
	// must contain a column
	// tag must not start or end with a dash or underscore
	const parts = trimmed.split(":");
	if (parts.length !== 2) {
		return false;
	}
	const [category, name] = parts;
	if (category.length === 0 || name.length === 0) {
		return false;
	}
	if (
		name.startsWith("-") ||
		name.endsWith("-") ||
		name.startsWith("_") ||
		name.endsWith("_")
	) {
		return false;
	}
	return true;
};
