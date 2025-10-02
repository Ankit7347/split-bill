"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Eye, EyeOff, Home } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Loading from "@/components/data-loading/Loading";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
function ResetPasswordPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const email = searchParams.get("email") || "";
	const otp = searchParams.get("otp") || "";

	const [valid, setValid] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	useEffect(() => {
		const validate = async () => {
			try {
				const res = await fetch(`/api/mail/validate-reset-token?email=${email}&otp=${otp}`);
				const data = await res.json();
				setValid(data.valid);
			} catch (err) {
				console.error(err);
				setValid(false);
			} finally {
				setLoading(false);
			}
		};
		if (email && otp) validate();
		else setLoading(false);
	}, [email, otp]);

	const handleSubmit = async () => {
		if (password !== confirmPassword) {
			toast({
				title: "Passwords do not match",
				description: "Please make sure both passwords are identical.",
				variant: "destructive",
			});
			return;
		}
		try {
			const res = await fetch("/api/mail/confirm-password-reset", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, otp, password }),
			});
			const data = await res.json();
			if (data.success) {
				toast({
					title: "Password changed successfully",
					description: "Please login with your new password.",
					variant: "default",
				});
				router.push("/login");
			} else {
				toast({
					title: "Error",
					description: "Failed to reset password.",
					variant: "destructive",
				});
			}
		} catch (err) {
			console.error(err);
			toast({
				title: "Error",
				description: "Something went wrong.",
				variant: "destructive",
			});
		}
	};

	// // if (loading) return <Loading />;
	// if (!email || !otp) return <p className="text-center mt-10">Invalid link</p>;
	// if (!valid) return <p className="text-center mt-10">Link expired or invalid</p>;

	return (
		<>
			<Navbar />
			<div className="flex items-center justify-center min-h-[70vh] bg-gray-100 dark:bg-gray-900">
				{loading ? (<Loading />) : !email || !otp ? (
					<p className="text-center text-red-600 dark:text-red-400">Invalid link</p>
				) : !valid ? (
					<p className="text-center text-red-600 dark:text-red-400">
						<Link
							href="/"
							className="inline-flex items-center gap-1 ml-2 text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-300 transition"
						>
							<Home size={25} className="inline-block" />
							Home
						</Link>
						<br />
						Link expired or invalid.
					</p>

				) : (
					<div className="p-6 md:p-8 w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl">
						<h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
							Reset Password
						</h2>
						<div className="space-y-4">
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									placeholder="New Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full border p-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white dark:border-gray-600"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
									aria-label="Toggle password visibility"
								>
									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>

							<div className="relative">
								<input
									type={showConfirmPassword ? "text" : "password"}
									placeholder="Confirm Password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									className="w-full border p-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white dark:border-gray-600"
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
									aria-label="Toggle confirm password visibility"
								>
									{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>

							<button
								onClick={handleSubmit}
								className="w-full mt-6 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
							>
								Reset Password
							</button>
						</div>
					</div>
				)}
			</div>
			<Footer />
		</>
	);

}

export default function BranchPage() {
	return (
		<Suspense fallback={<Loading />}>
			<ResetPasswordPage />
		</Suspense>
	);
}