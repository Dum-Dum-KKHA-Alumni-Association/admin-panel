'use client';
import React from 'react';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { venueEventCreateFormSchema } from '@/schemas/EventFormSchemas';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const CreateVenueEvent = () => {
	const form = useForm<z.infer<typeof venueEventCreateFormSchema>>({
		resolver: zodResolver(venueEventCreateFormSchema),
		defaultValues: {
			title: '',
			status: 'active',
			eventType: 'Offline',
			merchandise: 'No',
			foodAvailable: 'No',
		},
	});
	const { watch } = form;

	const merchandise = watch('merchandise');

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof venueEventCreateFormSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<SidebarInset>
			<header className="flex h-16 shrink-0 items-center gap-2">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							{/* <BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
							</BreadcrumbItem> */}
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="/event-management">
									Event Management
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="/event-management/create">
									Choose Event Type
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />

							<BreadcrumbItem>
								<BreadcrumbPage>Venue Event Creation</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>

			<div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4 p-4">
				<span className="text-4xl font-bold">Venue Event Creation</span>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Event Title*</FormLabel>
									<FormControl>
										<Input placeholder="Event Title" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description*</FormLabel>
									<FormControl>
										<Textarea placeholder="Description" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Event Date*</FormLabel>
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

						<div className="grid grid-cols-2 gap-3">
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Event Status</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select Event Status" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="active">Active</SelectItem>
												<SelectItem value="hidden">Hidden</SelectItem>
											</SelectContent>
										</Select>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="eventType"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Event Type</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
											disabled
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select event place Type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="Online">Online</SelectItem>
												<SelectItem value="Offline">Offline</SelectItem>
											</SelectContent>
										</Select>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="my-3 flex w-full flex-col gap-3">
							<span>Extras Features</span>
							<div className="grid w-full grid-cols-3 items-end gap-2">
								<FormField
									control={form.control}
									name="foodAvailable"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Food Available in event</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select " />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="Yes">Yes</SelectItem>
													<SelectItem value="No">No</SelectItem>
												</SelectContent>
											</Select>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="merchandise"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Merchandise Available in event</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select " />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="Yes">Yes</SelectItem>
													<SelectItem value="No">No</SelectItem>
												</SelectContent>
											</Select>

											<FormMessage />
										</FormItem>
									)}
								/>

								{merchandise === 'Yes' && (
									<FormField
										control={form.control}
										name="merchandiseType"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Merchandise Type</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select Merchandise Type" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="tshirt">Tshirt</SelectItem>
													</SelectContent>
												</Select>

												<FormMessage />
											</FormItem>
										)}
									/>
								)}
							</div>
						</div>

						<FormField
							control={form.control}
							name="eventPaymentType"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Event Payment Type</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select event Payment Type" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="Donation Based">
												Donation Based
											</SelectItem>
											<SelectItem value="Ticket Based">Ticket Based</SelectItem>
										</SelectContent>
									</Select>

									<FormMessage />
								</FormItem>
							)}
						/>

						<div>
							<FormField
								control={form.control}
								name="eventPaymentMode"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Event Payment Mode</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select Payment Mode" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="Online">Online</SelectItem>
												<SelectItem value="Offline">Offline</SelectItem>
											</SelectContent>
										</Select>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</div>
		</SidebarInset>
	);
};

export default CreateVenueEvent;
