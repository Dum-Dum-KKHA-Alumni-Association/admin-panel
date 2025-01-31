'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { MoreHorizontal, Trash2, Wrench } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

// This type is used to define the shape of our data.

const deleteAnEvent = async (id: string) => {
	// const token = await getToken();
	try {
		await axios.delete(
			`${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/events/${id}`
		);
		// const { data } = await axios.delete(
		// 	`${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/events/${id}`,
		// 	{
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			Authorization: `Bearer ${token}`,
		// 		},
		// 	}
		// );
		toast.success('Event Removed');
	} catch (error: any) {
		console.log(error);
		toast.error(error!.message);
	}
};

export const columns: ColumnDef<EventResponse>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},

	{
		accessorKey: 'title',
		header: 'Title',
	},
	{
		header: 'Mode',
		accessorKey: 'mode',
	},
	{
		header: 'Status',
		accessorKey: 'status',
		cell: ({ row }) =>
			row.original.status === 'Active' ? (
				<Badge className="bg-green-500">{row.original.status}</Badge>
			) : (
				<Badge className="bg-yellow-500">{row.original.status}</Badge>
			),
	},

	{
		id: 'id',
		header: 'Actions',
		enableHiding: false,
		cell: ({ row }) => {
			const id = row.original.id;
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
									`${process.env.NEXT_PUBLIC_FRONTEND_URL}/events/${id}`
								)
							}
						>
							Copy Url
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<Link href={`/event-management/events/edit/${id}`}>
							<DropdownMenuItem>
								{' '}
								<Wrench />
								Edit
							</DropdownMenuItem>
						</Link>
						<DropdownMenuItem
							onClick={() => deleteAnEvent(id)}
							className="text-red-600 hover:text-red-700"
						>
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
