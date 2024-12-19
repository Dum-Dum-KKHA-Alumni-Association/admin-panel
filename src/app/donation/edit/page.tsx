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
import React from 'react';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import DonationForm from '../components/form-donation';
import { Button } from '@/components/ui/button';
import {
	ExternalLink,
	FilePen,
	IndianRupee,
	Link2,
	MoreHorizontal,
	Trash2,
	Wrench,
} from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	// DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const DonationListPage = async () => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/donation/page`,
		{
			cache: 'no-store',
		}
	);

	const { data } = await response.json();

	const donationPages: DonationPageResponse[] = data;

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
							<BreadcrumbItem>
								<BreadcrumbPage>Pages</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
			<div className="flex w-full flex-1 flex-col gap-4 p-4 pt-0">
				<div className="flex justify-between">
					<h1 className="text-2xl font-bold md:text-3xl">Donation Pages</h1>
					<DonationForm />
				</div>

				<div className="flex w-full flex-col gap-3">
					{/* <DataTable columns={columns} data={donationPages} /> */}
					{donationPages.map((page) => (
						<Card
							key={page.id}
							className="flex w-full flex-col justify-between"
						>
							<div className="flex w-full">
								<CardHeader className="w-full p-3">
									<Link href={`/donation/responses/${page.id}`}>
										<CardTitle className="flex items-center justify-start gap-2 text-base sm:text-lg">
											{page.title}{' '}
											<span className="hidden text-xs font-thin sm:flex">
												/donation/{page.slug}
											</span>
										</CardTitle>
									</Link>
									<span>Date: {page.expirationDate}</span>
									<CardDescription>{page.description}</CardDescription>
								</CardHeader>
								<CardContent className="flex items-center justify-center px-5 py-0">
									<div className="flex rounded border">
										<Link
											href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/donation/${page.slug}`}
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
												<Link href={`/donation/pages/${page.id}`}>
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
								<Badge variant={'outline'} className="space-x-3 text-sm">
									<IndianRupee size={20} /> {page.targetAmount}
								</Badge>
								<Badge variant={'outline'} className="space-x-3">
									<FilePen size={20} /> 323
								</Badge>
								<Badge variant={'outline'} className="space-x-3">
									<FilePen size={20} /> 323
								</Badge>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</SidebarInset>
	);
};

export default DonationListPage;
