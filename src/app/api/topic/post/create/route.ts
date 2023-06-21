import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PostValidator } from "@/lib/validators/post";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { topicId, title, content } = PostValidator.parse(body);

    // check if user has already subscribed to topic
    const isSubscribed = await prisma.subscription.findFirst({
      where: {
        topicId,
        userId: session.user.id,
      },
    });

    if (!isSubscribed) {
      return new Response("You must be subscribed to post", {
        status: 400,
      });
    }

    // create post
    await prisma.post.create({
      data: {
        title,
        content,
        authorId: session.user.id,
        topicId,
      },
    });

    return new Response("OK");
  } catch (error) {
    error;
    if (error instanceof z.ZodError) {
      return new Response("Invalid POST request data passed", { status: 422 });
    }

    return new Response("Could not post at this time. Please try later", {
      status: 500,
    });
  }
}
