import Link from "next/link";
import { ICONS } from "./Icons";
import { buttonVariants } from "./ui/button";

export default function Navbar() {
  return (
    <>
      <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
        <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
          {/* logo */}
          <Link href="/" className="flex gap-2 items-center">
            <ICONS.logo />
            <p className="hidden text-zinc-700 text-sm font-medium sm:block">
              HobbyHub
            </p>
          </Link>

          {/* Log In/Sign Up */}
          <div className="flex gap-4">
            <Link href="/sign-in" className={buttonVariants()}>
              Log In
            </Link>
            <Link href="/sign-in" className={buttonVariants()}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
