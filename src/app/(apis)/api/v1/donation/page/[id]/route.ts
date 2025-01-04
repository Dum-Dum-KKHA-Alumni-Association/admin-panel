import prisma from '@/db/prismaClient';
import ApiError from '@/utils/ApiError';
import ApiResponse from '@/utils/ApiResponse';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const id = (await params).id; // 'a', 'b', or 'c'

	try {
		const getDonationPage = await prisma.donationPage.findFirst({
			where: {
				id,
			},
		});

		return NextResponse.json(new ApiResponse(200, getDonationPage));
	} catch (error) {
		return NextResponse.json(new ApiError(400, 'Error Happened', error));
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const id = (await params).id;

	console.log(id);
	try {
		const deleteDonationPage = await prisma.donationPage.delete({
			where: {
				id,
			},
		});
		return NextResponse.json(
			new ApiResponse(
				200,
				deleteDonationPage,
				'Donation Page is Successfully Removed'
			),
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(new ApiError(400, 'Error Happened', error), {
			status: 400,
		});
	}
}
