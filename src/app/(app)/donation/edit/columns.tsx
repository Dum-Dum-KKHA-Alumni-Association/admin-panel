'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { ISOStringFormat } from 'date-fns';
import { ExternalLink, MoreHorizontal, Trash2, Wrench } from 'lucide-react';
import Link from 'next/link';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DonationPage = {
	id: string;
	title: string;
	slug: string;
	description: string;
	thumbnail?: string;
	targetAmount: number;
	collectedAmount: number;
	expirationDate: ISOStringFormat;
	status: 'ACTIVE' | 'EXPIRED' | 'COMPLETED' | 'POSTPONE';
	createdAt: ISOStringFormat;
	updatedAt: ISOStringFormat;
};

export const columns: ColumnDef<DonationPage>[] = [
	{
		accessorKey: 'title',
		header: 'Title',
	},
	{
		id: 'url',
		header: 'Slug',
		cell: ({ row }) => {
			const slug: string = row.original.slug;
			const url = `/donation/${slug}`;
			console.log('slug', slug);
			return <span>{url}</span>;
		},
	},

	{
		accessorKey: 'collectedAmount',
		header: 'Collected Amount(₹)',
	},
	{
		accessorKey: 'targetAmount',
		header: 'Target Amount(₹)',
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		id: 'redirect',
		cell: ({ row }) => {
			const slug: string = row.original.slug;
			const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/donation/${slug}`;
			console.log('slug', slug);
			return (
				<Link href={url} target="_blank">
					<Button variant={'outline'} className="h-8 w-8 p-0">
						<ExternalLink />
					</Button>
				</Link>
			);
		},
	},
	{
		id: 'actions',

		enableHiding: false,
		cell: ({ row }) => {
			const donationPage = row.original;
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() =>
								navigator.clipboard.writeText(
									`${process.env.NEXT_PUBLIC_FRONTEND_URL}/donation/${donationPage.slug}`
								)
							}
						>
							Copy Url
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<Link href={`/donation/donation-pages/${donationPage.id}`}>
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
			);
		},
	},
];
