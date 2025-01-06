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
import { SquarePen } from 'lucide-react';
import React from 'react';
import { DonationChartComponent } from './components/chart-donation';

import DonationForm from './components/form-donation';

const DonationPage = () => {
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
			</div>
		</SidebarInset>
	);
};

export default DonationPage;
