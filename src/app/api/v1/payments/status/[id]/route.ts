import prisma from '@/db/prismaClient';
import { callCheckStatusApi } from '@/utils/paymentGateway';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const formData = await request.formData();
	const transactionId = formData.get('transactionId')?.toString();
	// const body = await request.json();

	// console.log(merchantTransactionId);

	//Check Payment Status
	try {
		const data = await callCheckStatusApi({
			merchantTransactionId: transactionId!,
		});

		if (data && data.code === 'PAYMENT_SUCCESS') {
			const paymentDetailsUpdate = await prisma.payment.update({
				where: {
					merchantTransactionId: transactionId,
				},
				data: {
					success: data.success,
					code: data.code,
					message: data.message,
					transactionId: data.data.transactionId,
					state: data.data.state,
					responseCode: data.data.responseCode,
					paymentType: data.data.paymentInstrument.type,
					cardType: data.data.paymentInstrument.cardType,
					pgTransactionId: data.data.paymentInstrument.pgTransactionId,
					bankTransactionId: data.data.paymentInstrument.bankTransactionId,
					pgAuthorizationCode: data.data.paymentInstrument.pgAuthorizationCode,
					arn: data.data.paymentInstrument.arn,
					bankId: data.data.paymentInstrument.bankId,
					brn: data.data.paymentInstrument.brn,
					utr: data.data.paymentInstrument.utr,
					pgServiceTransactionId:
						data.data.paymentInstrument.pgServiceTransactionId,
					responseDescription: data.data.responseCodeDescription,
					Donation: {
						update: {
							DonationPage: {
								update: {
									collectedAmount: data.data.amount,
								},
							},
						},
					},
				},
			});
			console.log(paymentDetailsUpdate);

			console.log(paymentDetailsUpdate);
			if (data.success === true) {
				return NextResponse.redirect(
					`${process.env.FRONTEND_ENDPOINT_URL}/donation/success`
				);
			} else {
				return NextResponse.redirect(
					`${process.env.FRONTEND_ENDPOINT_URL}/donation/failed`
				);
			}
		} else {
			const paymentDetailsUpdate = await prisma.payment.delete({
				where: {
					merchantTransactionId: transactionId,
				},
			});

			console.log(paymentDetailsUpdate);
			return NextResponse.redirect(
				`${process.env.FRONTEND_ENDPOINT_URL}/donation/failed`
			);
		}
	} catch (error) {
		console.log(error);
		return NextResponse.redirect(
			`${process.env.FRONTEND_ENDPOINT_URL}/donation/failed`
		);
	}
}
