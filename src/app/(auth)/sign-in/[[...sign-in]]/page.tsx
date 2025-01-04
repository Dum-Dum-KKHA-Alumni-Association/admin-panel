import { SignIn } from '@clerk/nextjs';

export default function Page() {
	return (
		<div className="relative flex h-screen w-full">
			<div className="flex h-full w-full items-center justify-center p-4">
				<SignIn path="/sign-in" signUpUrl="/sign-up" />
			</div>
		</div>
	);
}
