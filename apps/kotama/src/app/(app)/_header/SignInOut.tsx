import { EnterIcon } from "@radix-ui/react-icons";

const SignInOut = async ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <EnterIcon className="w-5 h-5" />
    </div>
  );
};

export default SignInOut;
