'use client';
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PrivacyPolicy = () => {
	return (
		<>
			<Navbar />
			<div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
				<div className="max-w-3xl mt-20 mx-auto p-6 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 transition-colors duration-500 rounded-md shadow-md dark:shadow-lg border border-gray-200 dark:border-gray-700">
					<h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
					<p className="mb-4">
						This Privacy Policy explains how Expense Splitter collects, uses, and protects your personal and expense data when you use our platform.
					</p>
					<h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
					<ul className="list-disc pl-6 mb-4">
						<li>Your name, email address, and phone number (for registered users)</li>
						<li>Expense details, room codes, and group member information</li>
						<li>Usage data and analytics (to improve the app)</li>
					</ul>
					<h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
					<ul className="list-disc pl-6 mb-4">
						<li>To provide and improve the expense splitting service</li>
						<li>To personalize your experience and show relevant summaries</li>
						<li>To communicate important updates or changes</li>
						<li>To analyze usage and enhance features</li>
					</ul>
					<h2 className="text-xl font-semibold mb-2">3. Data Security</h2>
					<p className="mb-4">
						We use industry-standard security measures to protect your data. Your information is never sold or shared with third parties except as required by law. Guest mode data is temporary and deleted after room expiry.
					</p>
					<h2 className="text-xl font-semibold mb-2">4. Cookies and Local Storage</h2>
					<p className="mb-4">
						We use local storage or cookies to save your preferences, expense progress, and personalized settings. You can clear these from your browser settings anytime.
					</p>
					<h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
					<ul className="list-disc pl-6 mb-4">
						<li>You can delete your account or data by contacting us.</li>
						<li>You can clear your browser data to remove local expense history.</li>
						<li>You can use guest mode for temporary, anonymous expense tracking.</li>
					</ul>
					<h2 className="text-xl font-semibold mb-2">6. Contact Us</h2>
					<p className="mb-4">
						If you have any questions about this Privacy Policy, please contact us:
						<a href="/contact" className="inline-block mt-2 px-6 py-2 bg-blue-600 dark:bg-blue-800 text-white rounded-full shadow hover:bg-blue-700 dark:hover:bg-blue-900 transition">
							Contact Us
						</a>
					</p>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						Last updated: October 2, 2025
					</p>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default PrivacyPolicy;
