import { z } from 'zod';
export const donationFormSchema = z.object({
	title: z.string().min(2).max(50),
	slug: z.string().min(2).max(50),
	description: z.string().max(100),
	thumbnail: z.string(),
	targetAmount: z
		.string()
		.min(1)
		.transform((data) => Number(data) || 0),
	expirationDate: z.date({
		required_error: 'A Expired Date is required.',
	}),
	// .transform((data) => JSON.stringify(data, null, 2) || 0),
});
