import prisma from '@/db/prismaClient';
import ApiError from '@/utils/ApiError';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
	const { response: base64Response } = await request.json();
	const xVerifyHeader = request.headers.get('x-verify');

	console.log(base64Response, xVerifyHeader);
	if (!base64Response || !xVerifyHeader) {
		return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
	}

	// Calculate the expected X-VERIFY value
	const calculatedVerify =
		crypto
			.createHash('sha256')
			.update(base64Response + process.env.SALT_KEY)
			.digest('hex') +
		'###' +
		process.env.SALT_INDEX;

	// Compare calculated X-VERIFY with the header
	if (calculatedVerify !== xVerifyHeader) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}

	// Decode the base64 response
	const decodedResponse = Buffer.from(base64Response, 'base64').toString(
		'utf-8'
	);
	const responseData = JSON.parse(decodedResponse);

	console.log('Callback Data:', responseData);

	try {
		const paymentDetailsUpdate = await prisma.payment.update({
			where: {
				merchantTransactionId: responseData.data.merchantTransactionId,
			},
			data: {
				transactionId: responseData.data.transactionId,
				state: responseData.data.state,
				responseCode: responseData.data.responseCode,
				paymentType: responseData.data.paymentInstrument.type,
				cardType: responseData.data.paymentInstrument.cardType,
				pgTransactionId: responseData.data.paymentInstrument.pgTransactionId,
				bankTransactionId:
					responseData.data.paymentInstrument.bankTransactionId,
				pgAuthorizationCode:
					responseData.data.paymentInstrument.pgAuthorizationCode,
				arn: responseData.data.paymentInstrument.arn,
				bankId: responseData.data.paymentInstrument.bankId,
				brn: responseData.data.paymentInstrument.brn,
				utr: responseData.data.paymentInstrument.utr,
				pgServiceTransactionId:
					responseData.data.paymentInstrument.pgServiceTransactionId,
				responseDescription: responseData.data.responseCodeDescription,
			},
		});
		console.log(paymentDetailsUpdate);

		return NextResponse.json(
			{
				message: 'Callback processed successfully',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(new ApiError(400, 'Error Happened', error), {
			status: 400,
		});
	}
}
