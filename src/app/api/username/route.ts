import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { UsernameValidator } from "@/lib/validators/username";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, teleHandle, bio } = UsernameValidator.parse(body);

    // check if username is taken
    const user = await prisma.user.findFirst({
      where: {
        username: name,
      },
    });
    
    if (user && (user.id !== session.user.id)) {
      return new Response("Username is taken", { status: 409 });
    }

    // update username
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        username: name,
        teleHandle: teleHandle,
        bio: bio,
      },
    });

    return new Response("OK");
  } catch (error) {
    error;

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not update username at this time. Please try later",
      { status: 500 }
    );
  }
}
