import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';

const EventsLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<SidebarProvider
			style={
				{
					'--sidebar-width': '19rem',
				} as React.CSSProperties
			}
		>
			<AppSidebar />
			{children}
		</SidebarProvider>
	);
};

export default EventsLayout;
