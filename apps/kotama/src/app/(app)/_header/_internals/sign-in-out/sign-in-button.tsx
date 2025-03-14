/** @format */

import { EnterIcon } from "@radix-ui/react-icons";
import { Button } from "@/src/components/ui/button";
import { BaseStyleProps } from "@/src/lib/typings";
import { cn } from "@/src/lib/shadcn";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";

import SignInForm from "./sign-in-form";
const SignInButton: React.FC<BaseStyleProps> = ({ className }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <EnterIcon className={cn("w-5 h-5", className)} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm rounded-lg">
        <DialogHeader className="*:text-center my-2">
          <DialogTitle>Sign In / Sign Up</DialogTitle>
        </DialogHeader>
        <SignInForm />
      </DialogContent>
    </Dialog>
  );
};

export default SignInButton;
