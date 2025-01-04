'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const DonationPageDeleteFeature = ({ pageId }: { pageId: string }) => {
	const { getToken } = useAuth();
	const router = useRouter();
	const onDeleteHandle = async () => {
		try {
			const token = await getToken();

			const { data } = await axios.delete(
				`${process.env.NEXT_PUBLIC_API_URL}/donation/page/${pageId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			toast.success(data.message);
			router.refresh();
		} catch (error) {
			toast.error('Error Happends');
			console.log(error);
		}
	};
	return (
		<DropdownMenuItem
			onClick={() => onDeleteHandle()}
			className="text-red-600 hover:text-red-700"
		>
			<Trash2 />
			Delete
		</DropdownMenuItem>
	);
};
