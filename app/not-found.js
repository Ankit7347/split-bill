// app/not-found.tsx
"use client";

import { useEffect } from "react";
import FriendlyError from "@/components/FriendlyError";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
	useEffect(() => {
		document.title = "404 - Page Not Found";
	}, []);

	return (
		<>
			<Navbar />
			<FriendlyError />
			<Footer />
		</>
	);
}
