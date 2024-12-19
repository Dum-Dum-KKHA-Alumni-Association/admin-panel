import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import {
	ExternalLink,
	FilePen,
	IndianRupee,
	Link2,
	MoreHorizontal,
	SquarePen,
	Wrench,
} from 'lucide-react';
import React from 'react';
import { DonationChartComponent } from './components/chart-donation';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import DonationForm from './components/form-donation';
import { DonationPageDeleteFeature } from './components/features';

const DonationPage = async () => {
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
							<BreadcrumbItem>
								<BreadcrumbPage>Donation</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				<div className="flex justify-between">
					<h1 className="text-2xl font-bold md:text-3xl">Donation Pages</h1>
					<DonationForm />
				</div>
				<div className="grid auto-rows-min gap-4 md:grid-cols-3">
					<Button className="aspect-video h-full w-full rounded-xl bg-muted/50">
						<div className="flex flex-col items-center justify-center gap-3 text-black">
							<SquarePen size={20} />
							<span>Create a new Donation</span>
						</div>
					</Button>
					<DonationChartComponent />
					<section className="aspect-video h-full w-full rounded-xl bg-muted/50">
						<div className="flex flex-col items-center justify-center gap-3 text-black">
							<span>dwadwa</span>
						</div>
					</section>
				</div>

				<div className="min-h-[100vh] flex-1 gap-2 rounded-xl bg-muted/50 md:min-h-min">
					<div className="flex w-full flex-col gap-3 p-2">
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

													<Link href={`/donation/${page.id}`}>
														<DropdownMenuItem>
															{' '}
															<Wrench />
															Edit
														</DropdownMenuItem>
													</Link>
													<DonationPageDeleteFeature pageId={page.id} />
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
									</CardContent>
								</div>
								<CardFooter className="space-x-3 p-2">
									<Badge variant={'outline'} className="space-x-3 text-sm">
										<IndianRupee size={20} /> Target {page.targetAmount}
									</Badge>
									<Badge variant={'outline'} className="space-x-3 text-sm">
										<IndianRupee size={20} /> Collected {page.collectedAmount}
									</Badge>
									<Badge variant={'outline'} className="space-x-3 text-sm">
										<FilePen size={20} /> Donations {page.listOfDonors.length}
									</Badge>
								</CardFooter>
							</Card>
						))}
					</div>
				</div>
			</div>
		</SidebarInset>
	);
};

export default DonationPage;
