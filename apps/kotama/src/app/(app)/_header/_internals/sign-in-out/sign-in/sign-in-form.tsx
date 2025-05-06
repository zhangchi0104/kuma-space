/** @format */

import { Button } from "~/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { signIn } from "../actions";
import { Separator } from "@/src/components/ui/separator";
import { Input } from "@/src/components/ui/input";

const SignInForm = () => {
  return (
    <div className="flex flex-col gap-2">
      <form className="flex flex-col gap-2">
        <Input type="email" placeholder="Email" />
        <div className="w-full flex flex-col">
          <Input type="password" placeholder="Password" />
          <a
            href="/forgot-password"
            className="text-sm px-2 py-1.5 text-slate-500 hover:text-slate-600"
          >
            Forgot your password?
          </a>
        </div>
        <Button type="submit">Sign in</Button>
        <div className="flex items-center justify-center">
          <a
            href="/sign-up"
            className="text-sm text-center text-blue-500 hover:text-blue-600"
          >
            Don&apos;t have an account? Sign up
          </a>
        </div>
      </form>
      <Separator className="my-1.5" />
      <Button
        onClick={async () => {
          "use server";
          await signIn("github");
        }}
        className="w-full flex-1"
      >
        <GitHubLogoIcon className="mr-2 w-5 h-5" />
        <p>Sign in with GitHub</p>
      </Button>
      <Button
        className="bg-blue-400 w-full flex-1"
        onClick={async () => {
          "use server";
          await signIn("anonymous", { fingerprint: "123" });
        }}
      >
        <p>Sign in anonymously</p>
      </Button>
    </div>
  );
};
export default SignInForm;
