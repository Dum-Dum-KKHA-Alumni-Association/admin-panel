'use client';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { donationPageFormSchema } from '../../../../schemas/FormSchema';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, Plus } from 'lucide-react';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Calendar } from '@/components/ui/calendar';

const DonationForm = () => {
	const { getToken } = useAuth();
	const [open, setOpen] = useState<boolean>(false);
	const router = useRouter();

	const donatioForm = useForm<z.infer<typeof donationPageFormSchema>>({
		resolver: zodResolver(donationPageFormSchema),
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof donationPageFormSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
		const token = await getToken();

		try {
			const formData = {
				title: values.title,
				description: values.description,
				// thumbnail: values.thumbnail,
				targetAmount: values.targetAmount,
				// expirationDate: JSON.stringify(values.expirationDate, null, 2),
				expirationDate: values.expirationDate.toISOString(),
			};

			const { data } = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/donation/page`,
				formData,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);

			toast.success(data.message);
			setOpen(false);
			router.refresh();
		} catch (error: any) {
			console.log(error);
			toast.success(error!.message);
			setOpen(false);
		}
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus />
					Create
				</Button>
			</DialogTrigger>
			<DialogContent className="h-screen overflow-y-auto sm:h-auto sm:max-w-[800px]">
				<Form {...donatioForm}>
					<DialogHeader>
						<DialogTitle>Create a new Donation Page</DialogTitle>
						<DialogDescription>
							Create a new Donation Page for people to give Donation.
						</DialogDescription>
					</DialogHeader>
					<form
						onSubmit={donatioForm.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<FormField
							control={donatioForm.control}
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
							control={donatioForm.control}
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
						{/* <FormField
							control={donatioForm.control}
							name="thumbnail"
							render={({ field: { ref, onChange } }) => (
								<FormItem>
									<FormLabel>Thumbnail</FormLabel>
									<FormControl>
										<Input
											type="file"
											accept="image/*"
											ref={ref}
											// className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"

											onChange={(event) => {
												onChange(event.target?.files?.[0] ?? undefined);
											}}
										/>
									</FormControl>
									<FormDescription>
										This thumbnail uses on front public image.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/> */}
						<FormField
							control={donatioForm.control}
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
							control={donatioForm.control}
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
														'w-full pl-3 text-left font-normal',
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
												disabled={(date: any) =>
													date > new Date() || date < new Date('1900-01-01')
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>

									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter className="gap-3 pt-6">
							<DialogClose asChild>
								<Button type="button" variant="secondary">
									Close
								</Button>
							</DialogClose>

							<Button type="submit">Submit</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default DonationForm;
