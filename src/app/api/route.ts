import { NextResponse } from 'next/server';

export async function GET() {
	return NextResponse.json(
		{ message: 'Server is 100% up running' },
		{ status: 200 }
	);
}
