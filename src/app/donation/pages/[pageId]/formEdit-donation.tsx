'use client';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import React, { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { donationPageEditFormSchema } from '@/schemas/FormSchema';

interface DonationPageEditFormProps {
	donationPage: DonationPageResponse;
}

const DonationPageEditForm: FC<DonationPageEditFormProps> = ({
	donationPage,
}) => {
	const { getToken } = useAuth();

	const donationForm = useForm<z.infer<typeof donationPageEditFormSchema>>({
		resolver: zodResolver(donationPageEditFormSchema),
		defaultValues: {
			title: donationPage.title,
			slug: donationPage.slug,
			description: donationPage.description,
			targetAmount: donationPage.targetAmount,
			expirationDate: donationPage.expirationDate,
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof donationPageEditFormSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
		const token = await getToken();

		try {
			const data = {
				title: values.title,
				slug: values.slug,
				description: values.description,
				thumbnail: values.thumbnail,
				targetAmount: values.targetAmount,
				// expirationDate: JSON.stringify(values.expirationDate, null, 2),
				expirationDate: values.expirationDate.toISOString(),
			};
			console.log(data);

			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/donation`,
				data,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log(response);
		} catch (error: any) {
			console.log(error);
		}
	}

	const { formState } = donationForm;

	const isChanged = formState.isDirty; // Becomes true if any field is modified
	return (
		<Card>
			<Form {...donationForm}>
				<CardHeader>
					<h1 className="text-3xl font-bold">Edit {donationPage.title}</h1>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={donationForm.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<FormField
							control={donationForm.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="Quick Time" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={donationForm.control}
							name="slug"
							render={({ field }) => (
								<FormItem>
									<FormLabel>URL</FormLabel>
									<FormControl>
										<div className="flex h-fit w-full items-center">
											<div className="flex h-9 items-center rounded-l-lg border bg-gray-200 px-2 py-1 text-sm text-slate-800">
												{`${process.env.NEXT_PUBLIC_FRONTEND_URL}/donations/`}
											</div>

											<Input className="rounded-l-none" {...field} />
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={donationForm.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Tell us a little bit about yourself"
											className="resize-none"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={donationForm.control}
							name="thumbnail"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Thumbnail</FormLabel>
									<FormControl>
										<Input
											id="picture"
											type="file"
											// className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										This thumbnail uses on front public image.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={donationForm.control}
							name="targetAmount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Target Amount</FormLabel>
									<FormControl>
										<Input type="number" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={donationForm.control}
							name="expirationDate"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Expiration Date</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={'outline'}
													className={cn(
														'w-full min-w-[240px] pl-3 text-left font-normal',
														!field.value && 'text-muted-foreground'
													)}
												>
													{field.value ? (
														format(field.value, 'PPP')
													) : (
														<span>Pick a date</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												// disabled={(date) =>
												// 	date > new Date() || date < new Date('1900-01-01')
												// }
												captionLayout="dropdown"
												initialFocus
											/>
										</PopoverContent>
									</Popover>

									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" disabled={!isChanged}>
							Update
						</Button>
					</form>
				</CardContent>
				<CardFooter></CardFooter>
			</Form>
		</Card>
	);
};

export default DonationPageEditForm;
