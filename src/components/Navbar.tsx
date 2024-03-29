import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { ICONS } from "./Icons";
import SearchBar from "./SearchBar";
import UserNav from "./UserNav";
import { buttonVariants } from "./ui/Button";

export default async function Navbar() {
  const session = await getAuthSession();

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

          {/* search bar */}
          <SearchBar />

          {/* Log In/Sign Up */}
          {session?.user ? (
            <div className="flex gap-4">
            {/* <Link href="/wishlist" className={buttonVariants({
              variant: "cart",
            })}>
              WISHLIST
            </Link> */}
            <UserNav user={session.user} />
          </div>
          ) : (
            <div className="flex gap-4">
              <Link href="/log-in" className={buttonVariants()}>
                Log In
              </Link>
              <Link href="/sign-up" className={buttonVariants()}>
                Sign Up
              </Link>
              {/*
              <Link href="/wishlist" className={buttonVariants({
                variant: "cart",
              })}>
                WISHLIST
              </Link>
              */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
