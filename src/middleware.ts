import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// const isProtectedRoute = createRouteMatcher(['/']);

// export default clerkMiddleware(
// 	async (auth, req) => {
// 		if (isProtectedRoute(req)) auth.protect();
// 	},
// 	{
// 		signInUrl: '/sign-in',
// 		signUpUrl: '/sign-up',
// 		debug: true,
// 	}
// );

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware(async (auth, request) => {
	if (!isPublicRoute(request)) {
		await auth.protect();
	}
});

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
