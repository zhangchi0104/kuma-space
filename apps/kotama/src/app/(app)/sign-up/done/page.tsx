import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";

const SignUpDone = () => {
	return (
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md w-full mx-auto border rounded-md px-4 py-8 space-y-4">
			<div className="flex flex-col items-center justify-center">
				<CheckCircleIcon className="h-16 w-16 text-green-500" />
			</div>
			<p className="text-center text-gray-500">
				Your account has been created successfully. Please check your email for
				verification.
			</p>
		</div>
	);
};

export default SignUpDone;
