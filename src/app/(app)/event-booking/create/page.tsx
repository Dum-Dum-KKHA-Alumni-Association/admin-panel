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
import { House } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CreateDonationPage = () => {
	return (
		<SidebarInset>
			<header className="flex h-16 shrink-0 items-center gap-2">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
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
								<BreadcrumbPage>Choose Event Type</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				<div className="grid auto-rows-min gap-4 md:grid-cols-3">
					<Link href={'/event-management/create/online-event'}>
						<Button className="group aspect-video h-full w-full rounded-xl bg-muted/50">
							<div className="flex flex-col items-center justify-center gap-3 text-2xl font-bold text-black group-hover:text-white">
								<Image
									src={'/images/icon/cloud.png'}
									width={40}
									height={0}
									alt={'cloude icon'}
								/>
								<span>Online Event </span>
							</div>
						</Button>
					</Link>
					<Link href={'/event-management/create/venue-event'}>
						<Button className="group aspect-video h-full w-full rounded-xl bg-muted/50">
							<div className="flex flex-col items-center justify-center gap-3 text-2xl font-bold text-black group-hover:text-white">
								<Image
									src={'/images/icon/map-pin.png'}
									width={40}
									height={0}
									alt={'cloude icon'}
								/>
								<span>Venue Event</span>
							</div>
						</Button>
					</Link>
					{/* <Button className="aspect-video rounded-xl bg-muted/50"></Button> */}
				</div>
				<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
			</div>
		</SidebarInset>
	);
};

export default CreateDonationPage;
