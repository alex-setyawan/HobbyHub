import { ICONS } from "@/components/Icons";
import Link from "next/link";
import AuthForm from "@/components/AuthForm";

const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a HobbyHub account and agree to our
          User Agreement and Privacy Policy.
        </p>
      </div>

      <AuthForm />

      <p className="px-8 text-center text-sm text-muted-foreground">
        New to HobbyHub?{" "}
        <Link
          href="/log-in"
          className="hover:text-brand text-sm underline underline-offset-4"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
