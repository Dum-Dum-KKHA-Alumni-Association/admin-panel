import Image from 'next/image';
import React from 'react';

const loading = (): React.JSX.Element => {
	return (
		<div className="flex h-screen w-full items-center justify-center bg-background p-5">
			<Image
				src={'/logos/logo.png'}
				width={'300'}
				height={'0'}
				alt="Webflexrr Logo"
				className="animate-pulse"
			/>
		</div>
	);
};

export default loading;
