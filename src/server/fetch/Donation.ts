export const getDonationPages = async () => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/donation/page`
	);

	return response.json();
};
