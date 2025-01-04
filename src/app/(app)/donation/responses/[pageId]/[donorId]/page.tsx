import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';

const CreateDonationPage = async ({
	params,
}: {
	params: Promise<{ pageId: string; donorId: string }>;
}) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/donation/donor/${(await params).donorId}`,
		{
			cache: 'no-store',
		}
	);
	const { data } = await response.json();

	const donorResponse: DonorResponse = data;

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
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="/donations">Donation</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="/donation/responses">
									Responses
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink
									href={`/donation/responses/${(await params).pageId}`}
								>
									{(await params).pageId}
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />

							<BreadcrumbItem>
								<BreadcrumbPage>{(await params).donorId}</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
			<div className="flex flex-1 flex-col gap-6 p-4 pb-20">
				<div className="mx-auto w-full max-w-7xl">
					<h1 className="text-3xl font-bold">
						{donorResponse.firstName} {donorResponse.lastName} Donation Details
					</h1>
				</div>
				<Card className="mx-auto w-full max-w-7xl">
					<CardHeader>
						<CardTitle className="text-2xl font-semibold">
							{donorResponse.firstName} {donorResponse.lastName} Details
						</CardTitle>
						{/* <CardDescription></CardDescription> */}
					</CardHeader>
					<CardContent className="flex">
						<section className="flex w-1/2 flex-col gap-3">
							<div className="flex flex-col">
								<Label className="text-base font-bold">Id</Label>
								<span className="">{donorResponse.id}</span>
							</div>
							<div className="flex flex-col">
								<Label className="text-base font-bold">Name</Label>
								<span className="">
									{donorResponse.firstName} {donorResponse.lastName}
								</span>
							</div>
							<div className="flex flex-col">
								<Label className="text-base font-bold">Email</Label>
								<span className="">{donorResponse.email}</span>
							</div>
							<div className="flex flex-col">
								<Label className="text-base font-bold">Date of Birth</Label>
								<span className="">{donorResponse.dateOfBirth}</span>
							</div>
							<div className="flex flex-col">
								<Label className="text-base font-bold">Gender</Label>
								<span className="">{donorResponse.gender}</span>
							</div>
							<div className="flex flex-col">
								<Label className="text-base font-bold">Date of Birth</Label>
								<span className="">{donorResponse.dateOfBirth}</span>
							</div>
							<div className="flex flex-col">
								<Label className="text-base font-bold">Madyamik Year</Label>
								<span className="">{donorResponse.madyamikYear}</span>
							</div>
							<div className="flex flex-col">
								<Label className="text-base font-bold">
									High Secondary/Metric Year
								</Label>
								<span className="">{donorResponse.higherSecondaryYear}</span>
							</div>
						</section>
						<Separator orientation={'vertical'} />
						<section className="flex w-1/2 flex-col gap-3">
							<div className="flex flex-col">
								<Label className="text-base font-bold">Donation Amount</Label>
								<span className="">{donorResponse.amount}</span>
							</div>
							<div className="flex flex-col">
								<Label className="text-base font-bold">Occupation</Label>
								<span className="">{donorResponse.occupation}</span>
							</div>
							<div className="flex flex-col">
								<Label className="text-base font-bold">Primary Number</Label>
								<span className="">{donorResponse.primaryNumber}</span>
							</div>
							<div className="flex flex-col">
								<Label className="text-base font-bold">Whatsapp Number</Label>
								<span className="">{donorResponse.whatsappNumber}</span>
							</div>
							<div className="flex flex-col">
								<Label className="text-base font-bold">Present Address</Label>
								<span className="">{donorResponse.presentAddress}</span>
							</div>
							<div className="flex flex-col">
								<Label className="text-base font-bold">Contact Address</Label>
								<span className="">{donorResponse.contactAddress}</span>
							</div>
						</section>
						{/* donationPageId:{donorResponse.donationPageId} */}
					</CardContent>
					{/* <CardFooter></CardFooter> */}
				</Card>
				<Card className="mx-auto w-full max-w-7xl">
					<CardHeader>
						<CardTitle className="text-2xl font-semibold">
							Payment Details
						</CardTitle>
						{/* <CardDescription></CardDescription> */}
					</CardHeader>
					<CardContent className="flex">
						<section className="flex w-1/2 flex-col gap-3">
							<div className="flex flex-col">
								<Label className="text-base font-bold">ID</Label>
								<span className="">{donorResponse.Payment?.id}</span>
							</div>
							{/* <div className="flex flex-col">
								<Label className="text-base font-bold">success</Label>
								<span className="">{donorResponse.Payment?.success}</span>
							</div> */}
							<div className="flex flex-col">
								<Label className="text-base font-bold">code</Label>
								<span className="">{donorResponse.Payment?.code}</span>
							</div>
							<div className="flex flex-col">
								<Label className="text-base font-bold">Merchant Id</Label>
								<span className="">{donorResponse.Payment?.merchantId}</span>
							</div>
							<div className="flex flex-col">
								<Label className="text-base font-bold">
									Merchant Transaction Id
								</Label>
								<span className="">
									{donorResponse.Payment?.merchantTransactionId}
								</span>
							</div>
							<div className="flex flex-col">
								<Label className="text-base font-bold">Transaction Id</Label>
								<span className="">{donorResponse.Payment?.transactionId}</span>
							</div>
							<div className="flex flex-col">
								<Label className="text-base font-bold">Amount</Label>
								<span className="">{donorResponse.Payment?.amount}</span>
							</div>
							<div className="flex flex-col">
								<Label className="text-base font-bold">Payment State</Label>
								<span className="">{donorResponse.Payment?.state}</span>
							</div>
						</section>
						<Separator orientation={'vertical'} />
						{donorResponse.Payment?.paymentType === 'UPI' && (
							<section className="flex w-1/2 flex-col gap-3">
								<div className="flex flex-col">
									<Label className="text-base font-bold">Payment Type</Label>
									<span className="">{donorResponse.Payment.paymentType}</span>
								</div>
								<div className="flex flex-col">
									<Label className="text-base font-bold">utr</Label>
									<span className="">{donorResponse.Payment?.utr}</span>
								</div>
							</section>
						)}

						{donorResponse.Payment?.paymentType === 'CARD' && (
							<section className="flex w-1/2 flex-col gap-3">
								<div className="flex flex-col">
									<Label className="text-base font-bold">Payment Type</Label>
									<span className="">{donorResponse.Payment?.paymentType}</span>
								</div>
								<div className="flex flex-col">
									<Label className="text-base font-bold">Card Type</Label>
									<span className="">{donorResponse.Payment?.cardType}</span>
								</div>

								<div className="flex flex-col">
									<Label className="text-base font-bold">
										Payment Gateway Transaction Id
									</Label>
									<span className="">
										{donorResponse.Payment?.pgTransactionId}
									</span>
								</div>
								<div className="flex flex-col">
									<Label className="text-base font-bold">
										Bank Transaction Id
									</Label>
									<span className="">
										{donorResponse.Payment?.bankTransactionId}
									</span>
								</div>
								<div className="flex flex-col">
									<Label className="text-base font-bold">
										Payment Gateway Authorization Code
									</Label>
									<span className="">
										{donorResponse.Payment?.pgAuthorizationCode}
									</span>
								</div>
								<div className="flex flex-col">
									<Label className="text-base font-bold">arn</Label>
									<span className="">{donorResponse.Payment?.arn}</span>
								</div>
								<div className="flex flex-col">
									<Label className="text-base font-bold">bankId</Label>
									<span className="">{donorResponse.Payment?.bankId}</span>
								</div>
								<div className="flex flex-col">
									<Label className="text-base font-bold">brn</Label>
									<span className="">{donorResponse.Payment?.brn}</span>
								</div>
							</section>
						)}
						{donorResponse.Payment?.paymentType === 'NETBANKING' && (
							<section className="flex w-1/2 flex-col gap-3">
								<div className="flex flex-col">
									<Label className="text-base font-bold">Payment Type</Label>
									<span className="">{donorResponse.Payment?.paymentType}</span>
								</div>

								<div className="flex flex-col">
									<Label className="text-base font-bold">
										Payment Gateway TransactionId
									</Label>
									<span className="">
										{donorResponse.Payment?.pgTransactionId}
									</span>
								</div>
								<div className="flex flex-col">
									<Label className="text-base font-bold">
										Payment Gateway Service Transaction Id
									</Label>
									<span className="">
										{donorResponse.Payment?.pgServiceTransactionId}
									</span>
								</div>
								<div className="flex flex-col">
									<Label className="text-base font-bold">
										Bank TransactionId
									</Label>
									<span className="">
										{donorResponse.Payment?.bankTransactionId}
									</span>
								</div>

								<div className="flex flex-col">
									<Label className="text-base font-bold">bank Id</Label>
									<span className="">{donorResponse.Payment?.bankId}</span>
								</div>
							</section>
						)}
					</CardContent>
				</Card>
			</div>
		</SidebarInset>
	);
};

export default CreateDonationPage;
