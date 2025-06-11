import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { signUpWithEmail } from "../_header/_internals/sign-in-out/actions";
import { redirect } from "next/navigation";

const SignUpPage = () => {
	return (
		<div className="max-w-md mx-auto mt-4">
			<form
				className="flex flex-col gap-4 border p-4 rounded-md"
				action={async (formData) => {
					"use server";
					const email = formData.get("email");
					const password = formData.get("password");
					await signUpWithEmail(email as string, password as string);
					redirect("/sign-up/done");
				}}
			>
				<h1 className="text-2xl font-bold text-center mb-4">
					Let&lsquo;s get started
				</h1>
				<div className="flex flex-col gap-2">
					<Label htmlFor="email">Email</Label>
					<Input type="email" name="email" placeholder="Email" />
				</div>
				<div className="flex flex-col gap-2">
					<Label htmlFor="password">Password</Label>
					<Input type="password" name="password" placeholder="Password" />
				</div>
				<Button type="submit">Sign up</Button>
			</form>
		</div>
	);
};

export default SignUpPage;
