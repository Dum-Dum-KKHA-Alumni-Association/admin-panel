import prisma from '@/db/prismaClient';
import ApiError from '@/utils/ApiError';
import ApiResponse from '@/utils/ApiResponse';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const { title, slug, description, thumbnail, targetAmount, expirationDate } =
		await request.json();

	try {
		const donationDetails = await prisma.donationPage.create({
			data: {
				title,
				slug,
				description,
				thumbnail,
				targetAmount,
				expirationDate,
			},
		});

		console.log(donationDetails);

		return NextResponse.json(
			new ApiResponse(
				200,
				donationDetails,
				'New Donation Page successfully created'
			),
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(new ApiError(400, 'Error Happened', error), {
			status: 400,
		});
	}
}
export async function GET() {
	try {
		const getDonationPages = await prisma.donationPage.findMany({
			select: {
				id: true,
				title: true,
				slug: true,
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

		return NextResponse.json(
			new ApiResponse(200, getDonationPages, 'Get Al Donation Pages'),
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(new ApiError(400, 'Error Happened', error), {
			status: 400,
		});
	}
}

export async function PUT(request: NextRequest) {
	const {
		id,
		title,
		slug,
		description,
		thumbnail,
		targetAmount,
		expirationDate,
		status,
	} = await request.json();

	try {
		const updateDonationPage = await prisma.donationPage.update({
			where: {
				id,
			},
			data: {
				title,
				slug,
				description,
				thumbnail,
				targetAmount,
				expirationDate,
				status,
			},
		});

		return NextResponse.json(
			new ApiResponse(200, updateDonationPage, 'Get All Donation Pages'),
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(new ApiError(400, 'Error Happened', error), {
			status: 400,
		});
	}
}
