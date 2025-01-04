import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import {
	ExternalLink,
	Link2,
	MoreHorizontal,
	Trash2,
	Wrench,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const CreateDonationPage = async ({
	params,
}: {
	params: Promise<{ pageId: string }>;
}) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/donation/${(await params).pageId}`,
		{
			cache: 'no-store',
		}
	);
	const { data } = await response.json();

	const donationResponses: DonorResponse[] = data;

	return (
		<SidebarInset>
			<header className="flex h-16 shrink-0 items-center gap-2">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="/donations">Donation</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="/donation/responses">
									Responses
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />

							<BreadcrumbItem>
								<BreadcrumbPage>{(await params).pageId}</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				<h1 className="text-3xl font-bold">Donation Responses</h1>
				{donationResponses.map(async (response) => (
					<Card
						key={response.id}
						className="flex w-full flex-col justify-between rounded-none"
					>
						<div className="flex w-full">
							<CardHeader className="w-full p-3">
								<Link
									href={`/donation/responses/${(await params).pageId}/${response.id}`}
								>
									<CardTitle className="flex items-center justify-start gap-2 text-base sm:text-lg">
										{response.firstName}{' '}
									</CardTitle>
								</Link>
								<CardDescription>{response.presentAddress}</CardDescription>
							</CardHeader>
							<CardContent className="flex items-center justify-center px-5 py-0">
								<div className="flex rounded border">
									<Link
										href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/donation/${response.id}`}
										target="_blank"
									>
										<Button
											variant={'outline'}
											className="h-8 w-8 rounded-none p-0"
										>
											<ExternalLink />
										</Button>
									</Link>
									<Link href={''} target="_blank">
										<Button
											variant={'outline'}
											className="h-8 w-8 rounded-none p-0"
										>
											<Link2 />
										</Button>
									</Link>

									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant={'outline'}
												className="h-8 w-8 rounded-none p-0"
											>
												<span className="sr-only">Open menu</span>
												<MoreHorizontal />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuLabel>Actions</DropdownMenuLabel>
											{/* <DropdownMenuItem>Copy Url</DropdownMenuItem>
												<DropdownMenuSeparator /> */}
											<Link href={`/donation/donation-pages`}>
												<DropdownMenuItem>
													{' '}
													<Wrench />
													Edit
												</DropdownMenuItem>
											</Link>
											<DropdownMenuItem className="text-red-600 hover:text-red-700">
												{' '}
												<Trash2 />
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</CardContent>
						</div>
						<CardFooter className="space-x-3 p-2">
							{/* <Badge variant={'outline'} className="space-x-3 text-sm">
								<IndianRupee size={20} /> {page.targetAmount}
							</Badge>
							<Badge variant={'outline'} className="space-x-3">
								<FilePen size={20} /> 323
							</Badge>
							<Badge variant={'outline'} className="space-x-3">
								<FilePen size={20} /> 323
							</Badge> */}
						</CardFooter>
					</Card>
				))}
			</div>
		</SidebarInset>
	);
};

export default CreateDonationPage;
