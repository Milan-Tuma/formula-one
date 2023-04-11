export const localizeDate = (date) => {
	const readableDate = new Date(date).toLocaleDateString('en-DE', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
	return readableDate;
};
