"use client";

import React from "react";

export default function Loading() {
	return (
		<div className="flex flex-col items-center justify-center h-40 bg-white dark:bg-gray-800 transition-colors">
			<div className="relative w-16 h-16">
				{/* Outer spinner */}
				<div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-gray-800 dark:border-gray-200 border-solid rounded-full animate-spin-fast"></div>
				{/* Inner spinner for depth */}
				<div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-gray-300 dark:border-gray-700 border-solid rounded-full animate-spin-fast delay-75"></div>
			</div>
			<p className="mt-6 text-xl font-medium text-gray-800 dark:text-gray-200">
				Loading...
			</p>
		</div>
	);
}
