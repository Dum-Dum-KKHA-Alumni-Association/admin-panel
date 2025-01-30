import { z } from 'zod';

export const venueEventCreateFormSchema = z.object({
	title: z.string().min(2).max(50),
	description: z.string().max(100),
	date: z.date({
		required_error: 'A  Date is required.',
	}),
	status: z.string({
		required_error: 'Status is required',
	}),
	eventType: z
		.string({
			required_error: 'Event Type is required',
		})
		.optional(),
	merchandise: z.string(),
	merchandiseType: z.string().optional(),
	foodAvailable: z.string(),
	eventPaymentType: z.string(),
	eventPaymentMode: z.string(),

	// .transform((data) => JSON.stringify(data, null, 2) || 0),
});
