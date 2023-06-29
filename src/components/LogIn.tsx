import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default function LogIn() {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Log In</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a HobbyHub account and agree to our
          User Agreement and Privacy Policy.
        </p>

        <AuthForm />

        <p className="px-8 text-center text-sm text-muted-foreground">
          New to HobbyHub?{" "}
          <Link
            href="/sign-up"
            className="hover:text-zinc-800 text-sm underline underline-offset-4"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
