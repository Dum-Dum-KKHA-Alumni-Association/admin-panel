'use client';
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
import { getDonationPages } from '@/server/fetch/Donation';
import { useQuery } from '@tanstack/react-query';
import {
	ExternalLink,
	FilePen,
	IndianRupee,
	Link2,
	MoreHorizontal,
	Wrench,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { DonationPageDeleteFeature } from './features';
import { Badge } from '@/components/ui/badge';

const DonationList = () => {
	const { data } = useQuery({
		queryKey: ['donationPage'],
		queryFn: getDonationPages,
	});
	return (
		<div className="min-h-[100vh] flex-1 gap-2 rounded-xl bg-muted/50 md:min-h-min">
			<div className="flex w-full flex-col gap-3 p-2">
				{data &&
					data.data.map((page: any) => (
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
	);
};

export default DonationList;
