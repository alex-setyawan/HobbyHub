import UserNameForm from "@/components/UserNameForm";
import { authOptions, getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

type PageProps = {
  params: {
    userId: string;
  };
};

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

export default async function ProfilePage({ params }: PageProps) {
  
  // user whose profile is viewed
  const { userId } = params;

  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  // any user viewing profile
  const session = await getAuthSession();
  let canEdit = false;

  if (session?.user.id === userId) {
    /* redirect(authOptions?.pages?.signIn || "/login"); */
    canEdit = true;
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="grid items-start gap-8">
        <h1 className="font-bold text-3xl md:text-4xl">Profile</h1>

        <div className="grid gap-10">
          <UserNameForm /*
            user={{
              id: session.user.id,
              username: session.user.username || "",
              email: session.user.email!,
            }} */
            user={user!}
            canEdit={canEdit}
          />
        </div>
      </div>
    </div>
  );
}