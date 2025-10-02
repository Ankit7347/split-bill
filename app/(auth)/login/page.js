"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { sendMail } from "@/lib/sendMail";

export default function LoginPage() {
	const router = useRouter();
	const [form, setForm] = useState({ email: "", password: "" });
	const [forgotMode, setForgotMode] = useState(false);
	const [loading, setLoading] = useState(false);
	const token = Math.floor(1000000000 + Math.random() * 9000000000).toString();
	const { toast } = useToast();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const res = await signIn("credentials", {
			redirect: false,
			email: form.email,
			password: form.password,
		});

		if (res?.error) {
			toast({
				title: "Login Failed",
				description: "Invalid email or password.",
				variant: "destructive",
			});
		} else {
			const sessionRes = await fetch("/api/auth/session");
			const session = await sessionRes.json();
			const role = session?.user?.role;

			if (role === "superadmin") router.push("/admin/dashboard");
			else if (role === "contentadmin") router.push("/content/dashboard");
			else router.push("/dashboard");
		}
		setLoading(false);
	};

	const handleForgotPassword = async () => {
		if (!form.email) {
			toast({
				title: "Missing Email",
				description: "Please enter your email to reset password.",
				variant: "destructive",
			});
			return;
		}
		try {
			setLoading(true);
			const data = await fetch("/api/mail/save-reset-token", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: form.email, otp: token }),
			});
			if (!data.ok) {
				const errorData = await data.json();
				toast({
					title: "Error",
					description: errorData.error || "Failed to save reset token.",
					variant: "destructive",
				});
				return;
			}
			// Send the reset email
			await sendMail({
				to: form.email,
				subject: "Reset Your Password",
				message: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?email=${form.email}&otp=${token}`,
				emailType: "forgot",
			});
			toast({
				title: "Reset email sent",
				description: "Please check your inbox to reset your password.",
				variant: "default",
			});
			setForgotMode(false);
		} catch (err) {
			console.error(err);
			toast({
				title: "Error",
				description: "Failed to send reset email.",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-[90vh] flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
			{/* Back to Home button at top-right corner */}
			<div className="absolute top-4 right-4 z-10 bg-slate-500 text-white px-4 py-2 rounded-lg shadow-md">
				<button
					onClick={() => router.push("/")}
					className="text-white hover:underline text-sm"
				>
					Back to Home
				</button>
			</div>

			{/* Left side image */}
			<div
				className="relative w-full md:w-1/2 flex justify-center items-center"
				style={{
					backgroundImage: `url('/student.svg')`,
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					backgroundSize: "contain",
					opacity: 1,
					minHeight: "25vh",
				}}
			></div>

			{/* Right side card */}
			<div className="flex w-full md:w-1/2 justify-center items-center p-6">
				<div
					className="bg-cream-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 w-full max-w-md min-h-[450px] md:min-h-[500px] flex flex-col justify-start relative">
					<h2 className="text-2xl font-bold text-center mb-1 text-gray-900 dark:text-gray-100">
						{forgotMode ? "Forgot Password" : "Login"}
					</h2>

					<form
						onSubmit={forgotMode ? undefined : handleSubmit}
						className="space-y-4 flex-grow items-center justify-center flex flex-col"
					>
						<input
							type="email"
							name="email"
							placeholder="Email"
							onChange={handleChange}
							className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
							required
						/>
						{!forgotMode && (
							<input
								type="password"
								name="password"
								placeholder="Password"
								onChange={handleChange}
								className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
								required
							/>
						)}

						{!forgotMode ? (
							<button
								type="submit"
								disabled={loading}
								className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
							>
								{loading ? "Logging in..." : "Login"}
							</button>
						) : (
							<button
								type="button"
								onClick={handleForgotPassword}
								disabled={loading}
								className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
							>
								{loading ? "Sending..." : "Send Reset Link"}
							</button>
						)}
					</form>

					<div className="flex justify-between items-center mt-6 text-sm text-gray-700 dark:text-gray-300">
						<button
							onClick={() => setForgotMode(!forgotMode)}
							className="text-blue-600 hover:underline"
						>
							{forgotMode ? "Back to Login" : "Forgot Password?"}
						</button>
						<button
							onClick={() => router.push("/register")}
							className="text-blue-600 hover:underline"
						>
							Register
						</button>
					</div>
				</div>
			</div>
		</div>
	);

}
