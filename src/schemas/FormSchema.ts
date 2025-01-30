import { generateSlug } from '@/utils/generate-slug';
import { z } from 'zod';

export const donationPageFormSchema = z.object({
	title: z.string().min(2).max(50),
	description: z.string().max(100),
	// thumbnail: z
	// 	.instanceof(File)
	// 	.refine(
	// 		(file) => file.size <= 5 * 1024 * 1024,
	// 		'File must be less than 5MB'
	// 	)
	// 	.refine(
	// 		(file) =>
	// 			[
	// 				'image/png',
	// 				'image/jpeg',
	// 				'image/jpg',
	// 				'image/svg+xml',
	// 				'image/gif',
	// 			].includes(file.type),
	// 		{ message: 'Invalid image file type' }
	// 	)
	// 	.optional(),

	targetAmount: z
		.string()
		.min(1)
		.transform((data) => Number(data) || 0),
	expirationDate: z.date({
		required_error: 'A Expired Date is required.',
	}),
	// .transform((data) => JSON.stringify(data, null, 2) || 0),
});

export const donationPageEditFormSchema = z.object({
	title: z.string().min(2).max(50),
	slug: z
		.string()
		.min(2)
		.max(50)
		.transform((data) => generateSlug(data) || 0),
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
