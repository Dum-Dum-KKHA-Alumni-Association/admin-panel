export const getDonationPages = async () => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/donation/page`
	);

	return response.json();
};
