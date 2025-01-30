export const getAllEvents = async () => {
	// console.log("API Endpoint URL",process.env.NEXT_PUBLIC_API_ENDPOINT_URL);
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/events`
	);

	return response.json();
};

export const getEventDetails = async (id: string) => {
	// console.log("API Endpoint URL",process.env.NEXT_PUBLIC_API_ENDPOINT_URL);
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/events/${id}`
	);

	return response.json();
};
