'use client';

import * as React from 'react';

import { NavUser } from '@/components/nav-user';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import {
	Armchair,
	HandCoins,
	LayoutDashboard,
	TicketPercent,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

// const data = {
// 	navMain: [
// 		{
// 			title: 'Playground',
// 			url: '#',
// 			icon: SquareTerminal,
// 			isActive: true,
// 			items: [
// 				{
// 					title: 'History',
// 					url: '#',
// 				},
// 				{
// 					title: 'Starred',
// 					url: '#',
// 				},
// 				{
// 					title: 'Settings',
// 					url: '#',
// 				},
// 			],
// 		},
// 		{
// 			title: 'Models',
// 			url: '#',
// 			icon: Bot,
// 			items: [
// 				{
// 					title: 'Genesis',
// 					url: '#',
// 				},
// 				{
// 					title: 'Explorer',
// 					url: '#',
// 				},
// 				{
// 					title: 'Quantum',
// 					url: '#',
// 				},
// 			],
// 		},
// 		{
// 			title: 'Documentation',
// 			url: '#',
// 			icon: BookOpen,
// 			items: [
// 				{
// 					title: 'Introduction',
// 					url: '#',
// 				},
// 				{
// 					title: 'Get Started',
// 					url: '#',
// 				},
// 				{
// 					title: 'Tutorials',
// 					url: '#',
// 				},
// 				{
// 					title: 'Changelog',
// 					url: '#',
// 				},
// 			],
// 		},
// 		{
// 			title: 'Settings',
// 			url: '#',
// 			icon: Settings2,
// 			items: [
// 				{
// 					title: 'General',
// 					url: '#',
// 				},
// 				{
// 					title: 'Team',
// 					url: '#',
// 				},
// 				{
// 					title: 'Billing',
// 					url: '#',
// 				},
// 				{
// 					title: 'Limits',
// 					url: '#',
// 				},
// 			],
// 		},
// 	],
// 	navSecondary: [
// 		{
// 			title: 'Support',
// 			url: '#',
// 			icon: LifeBuoy,
// 		},
// 		{
// 			title: 'Feedback',
// 			url: '#',
// 			icon: Send,
// 		},
// 	],
// 	projects: [
// 		{
// 			name: 'Design Engineering',
// 			url: '#',
// 			icon: Frame,
// 		},
// 		{
// 			name: 'Sales & Marketing',
// 			url: '#',
// 			icon: PieChart,
// 		},
// 		{
// 			name: 'Travel',
// 			url: '#',
// 			icon: Map,
// 		},
// 	],
// 	payments: [
// 		{
// 			name: 'Transaction',
// 			url: '#',
// 			icon: Landmark,
// 		},
// 		{
// 			name: 'Sales & Marketing',
// 			url: '#',
// 			icon: PieChart,
// 		},
// 		{
// 			name: 'Travel',
// 			url: '#',
// 			icon: Map,
// 		},
// 	],
// 	donation: [
// 		{
// 			name: 'List of Donations',
// 			url: '/donations',
// 			icon: HandCoins,
// 		},
// 	],
// };

const data = {
	navMain: [
		{
			title: 'Dashboard',
			url: '/',
			icon: LayoutDashboard,
		},
		{
			title: 'Donations',
			url: '/donation',
			icon: HandCoins,
			// items: [
			// 	{
			// 		title: 'Responses',
			// 		url: '/donation/responses',
			// 	},
			// ],
		},
		{
			title: 'Event Management',
			url: '#',
			icon: TicketPercent,
			items: [
				{
					title: 'Add Events ',
					url: '/event-management/create',
				},
				{
					title: 'All Events',
					url: '/event-management/events',
					// isActive: true,
				},
				{
					title: 'Payments',
					url: '/events/payments',
				},
			],
		},
		{
			title: 'Event Bookings',
			url: '#',
			icon: Armchair,
			items: [
				{
					title: 'Settings ',
					url: '/event-booking/settings',
				},
				{
					title: 'All Bookings',
					url: '/event-booking',
				},
				{
					title: 'Completed Bookings',
					url: '/event-booking/completed',
				},
				{
					title: 'Pending Bookings',
					url: '/event-booking/pending',
				},
				{
					title: 'Rejected Bookings',
					url: '/event-booking/rejected',
				},
			],
		},

		// {
		// 	title: 'Event Managements',
		// 	url: '#',
		// 	icon: BookText ,
		// 	items: [
		// 		{
		// 			title: 'Add Event',
		// 			url: 'event-ma/create',
		// 		},
		// 	],
		// },
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const user = useUser();

	const pathname = usePathname();
	// const pathArray = pathname.split("/")
	// const currentPage = pathArray[pathArray.length - 1];

	console.log();
	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link href="/" className="flex">
								{/* <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"> */}
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
									<Image
										src={'/logo.png'}
										width={100}
										height={16}
										alt={'Logo'}
									/>
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">DDKKHAAA</span>
									<span className="truncate text-xs">Admin Dashboard</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						{data.navMain.map((item) => (
							<SidebarMenuItem key={item.title} className="my-1">
								<SidebarMenuButton
									className="py-4 text-lg"
									variant={'outline'}
									asChild
									isActive={pathname === item.url}
								>
									<Link href={item.url}>
										<item.icon />
										{item.title}
									</Link>
								</SidebarMenuButton>
								{item.items?.length ? (
									<SidebarMenuSub>
										{item.items.map((item) => (
											<SidebarMenuSubItem key={item.title}>
												<SidebarMenuSubButton
													asChild
													isActive={pathname.startsWith(item.url)}
												>
													<a href={item.url}>{item.title}</a>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								) : null}
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<NavUser
					user={{
						name: user.user?.fullName || '',
						avatar: user.user?.imageUrl,
						email: user.user?.primaryEmailAddress?.emailAddress,
					}}
				/>
			</SidebarFooter>
		</Sidebar>
	);
}
