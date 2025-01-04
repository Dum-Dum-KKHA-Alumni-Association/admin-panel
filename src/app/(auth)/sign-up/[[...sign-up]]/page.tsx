import { SignUp } from '@clerk/nextjs';

export default function Page() {
	return (
		<div className="relative h-screen w-full lg:grid lg:grid-cols-2">
			<div className="flex h-full w-full items-center justify-center bg-primary p-4">
				<SignUp path="/sign-up" signInUrl="/sign-in" />
			</div>
		</div>
	);
}
