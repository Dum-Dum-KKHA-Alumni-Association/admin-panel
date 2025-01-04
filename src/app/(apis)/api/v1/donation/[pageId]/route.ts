import prisma from '@/db/prismaClient';
import ApiError from '@/utils/ApiError';
import ApiResponse from '@/utils/ApiResponse';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ pageId: string }> }
) {
	const pageId = (await params).pageId;

	console.log(pageId);
	try {
		const getAllDonations = await prisma.donation.findMany({
			where: {
				donationPageId: pageId,
				Payment: {
					state: 'COMPLETED',
				},
			},
		});

		return NextResponse.json(new ApiResponse(200, getAllDonations), {
			status: 200,
		});
	} catch (error) {
		return NextResponse.json(new ApiError(400, 'Error Happened', error), {
			status: 400,
		});
	}
}
