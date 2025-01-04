import prisma from '@/db/prismaClient';
import ApiError from '@/utils/ApiError';
import ApiResponse from '@/utils/ApiResponse';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ donorId: string }> }
) {
	const donorId = (await params).donorId;

	console.log(donorId);
	try {
		const getDonorDetails = await prisma.donation.findUnique({
			where: {
				id: donorId,
			},
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				primaryNumber: true,
				whatsappNumber: true,
				dateOfBirth: true,
				madyamikYear: true,
				higherSecondaryYear: true,
				presentAddress: true,
				contactAddress: true,
				occupation: true,
				amount: true,
				donationPageId: true,
				Payment: true,
				createdAt: true,
				updatedAt: true,
			},
		});
		return NextResponse.json(new ApiResponse(200, getDonorDetails), {
			status: 200,
		});
	} catch (error) {
		return NextResponse.json(new ApiError(400, 'Error Happened', error), {
			status: 400,
		});
	}
}
