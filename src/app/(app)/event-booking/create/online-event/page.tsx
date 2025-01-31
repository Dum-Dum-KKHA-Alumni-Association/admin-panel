'use client';
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
import { MapPin, SquarePen } from 'lucide-react';
import React from 'react';

const CreateOnlineEvent = () => {
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
								<BreadcrumbLink href="/event-management">
									Choose Event Type
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />

							<BreadcrumbItem>
								<BreadcrumbPage>Online</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				<div className="grid auto-rows-min gap-4 md:grid-cols-3">
					<Button className="aspect-video h-full w-full rounded-xl bg-muted/50">
						<div className="flex flex-col items-center justify-center gap-3 text-2xl font-bold text-black">
							<SquarePen size={48} />
							<span>Online Event </span>
						</div>
					</Button>
					<Button className="aspect-video h-full w-full rounded-xl bg-muted/50">
						<div className="flex flex-col items-center justify-center gap-3 text-2xl font-bold text-black">
							<MapPin size={20} />
							<span>Venue Event</span>
						</div>
					</Button>
					{/* <Button className="aspect-video rounded-xl bg-muted/50"></Button> */}
				</div>
				<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
			</div>
		</SidebarInset>
	);
};

export default CreateOnlineEvent;
