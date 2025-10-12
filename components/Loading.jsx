"use client";

import React from "react";

export default function Loading() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500"></div>
          <span className="text-lg font-semibold">Loading...</span>
        </div>
      </div>
	);
}
