'use client';
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
import { House } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { DataTable } from './data-table';
import { columns } from './column';
import { getAllEvents } from '@/server/fetch/Events';
import { useQuery } from '@tanstack/react-query';

const EventListPage = () => {
	const [allEvents, setAllEvents] = useState<EventResponse[]>([]);

	const { data } = useQuery({
		queryKey: ['events'],
		queryFn: getAllEvents,
	});

	useEffect(() => {
		const EventsData: EventResponse[] = data?.data;

		console.log('Get ALl Events', EventsData);
		setAllEvents(EventsData);
	}, [data?.data]);

	return (
		<SidebarInset>
			<header className="flex h-16 shrink-0 items-center gap-2">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="/">
										{' '}
										<House size={20} />
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="/event-management">
										Event Management
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>All Events</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</Breadcrumb>
				</div>
			</header>
			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				{/* <div className="min-h-[100vh] w-full max-w-6xl p-5 mx-auto flex-1 rounded-xl bg-muted/50 md:min-h-min"> */}
				<div className="mx-auto min-h-[100vh] w-full max-w-6xl flex-1 rounded-xl p-5 md:min-h-min">
					<DataTable columns={columns} data={allEvents} />
				</div>
			</div>
		</SidebarInset>
	);
};

export default EventListPage;
