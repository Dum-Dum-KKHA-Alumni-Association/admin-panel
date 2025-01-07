import prisma from '@/db/prismaClient';
import ApiError from '@/utils/ApiError';
import ApiResponse from '@/utils/ApiResponse';
import { initiatePay } from '@/utils/paymentGateway';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
	try {
		const getDonationPages = await prisma.donationPage.findMany({
			select: {
				id: true,
				title: true,

				description: true,
				thumbnail: true,
				targetAmount: true,
				collectedAmount: true,
				expirationDate: true,
				status: true,
				listOfDonors: {
					where: {
						Payment: {
							state: 'COMPLETED',
						},
					},
					select: {
						Payment: {
							select: {
								state: true,
								amount: true,
							},
						},
					},
				},
			},
		});

		NextResponse.json(
			new ApiResponse(200, getDonationPages, 'Get Al Donation Pages')
		);
	} catch (error) {
		NextResponse.json(new ApiError(400, 'Error Happened', error));
	}
}

export async function POST(request: NextRequest) {
	const {
		donationPageId,
		firstName,
		lastName,
		email,
		primaryNumber,
		whatsappNumber,
		madyamikYear,
		higherSecondaryYear,
		dateOfBirth,
		occupation,
		presentAddress,
		contactAddress,
		amount,
	} = await request.json();

	try {
		const paymentPageDetails = await initiatePay({
			amount,
			mobile: primaryNumber,
		});

		const donationDetails = await prisma.donation.create({
			data: {
				DonationPage: {
					connect: {
						id: donationPageId,
					},
				},
				firstName,
				lastName,
				email,
				primaryNumber,
				whatsappNumber,
				madyamikYear,
				higherSecondaryYear,
				dateOfBirth,
				occupation,
				presentAddress,
				contactAddress,
				amount,
				Payment: {
					create: {
						merchantId: paymentPageDetails?.merchantId,
						merchantTransactionId: paymentPageDetails?.merchantTransactionId,
						amount,
					},
				},
			},
		});

		console.log(donationDetails);

		return NextResponse.json(
			new ApiResponse(200, paymentPageDetails, 'Payment is Initiated'),
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(new ApiError(400, 'Error Happened', error), {
			status: 400,
		});
	}
}
