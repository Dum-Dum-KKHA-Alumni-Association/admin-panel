interface DonationPageResponse {
	id: string;
	title: string;
	slug: string;
	description: string;
	thumbnail?: string;
	listOfDonors: Array<DonorResponse>;
	targetAmount: number;
	collectedAmount: number;
	expirationDate: ISOStringFormat;
	status: 'ACTIVE' | 'EXPIRED' | 'COMPLETED' | 'POSTPONE';
	createdAt: ISOStringFormat;
	updatedAt: ISOStringFormat;
}

interface DonorResponse {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	primaryNumber: string;
	whatsappNumber: string;
	dateOfBirth: string;
	gender: string;
	madyamikYear: string;
	higherSecondaryYear: string;
	presentAddress: string;
	contactAddress: string;
	occupation: string;
	amount: number;
	donationPageId?: string;
	DonationPage?: DonationPage;
	paymentId?: string;
	Payment?: PaymentResponse;
	createdAt: ISOStringFormat;
	updatedAt: ISOStringFormat;
}

interface PaymentResponse {
	id: string;
	success: boolean;
	code: string;
	message: string;
	merchantId: string;
	merchantTransactionId: string;
	transactionId: string;
	amount: number;
	state: string;
	responseCode: string;
	responseDescription: string;
	paymentType: string;
	utr: string;
	cardType: string;
	pgTransactionId: string;
	bankTransactionId: string;
	pgAuthorizationCode: string | null;
	arn: string;
	bankId: string;
	brn: string;
	pgServiceTransactionId: string | null;
	createdAt: ISOStringFormat;
	updatedAt: ISOStringFormat;
}
