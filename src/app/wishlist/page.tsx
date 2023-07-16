import { authOptions, getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ToFeedButton from "@/components/ToFeedButton";
/*
export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};
*/
export default async function Wishlist() {
  
  const session = await getAuthSession();

  if (!session?.user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <div className="max-w-6xl mx-auto py-12">
      <ToFeedButton />
      <div className="grid items-start gap-8 py-6">
        <div className="flex flex-col col-span-2 space-y-6">
          <h1 className="font-bold text-3xl md:text-4xl">Wishlist</h1>

          <div className="grid gap-10">
            WHERE ITEMS GO
          </div>
        </div>
      </div>
    </div>
  );
}