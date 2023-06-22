import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { TopicSubscriptionValidator } from "@/lib/validators/topic";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { topicId } = TopicSubscriptionValidator.parse(body);

    // check if user has already subscribed to topic
    const isSubscribed = await prisma.subscription.findFirst({
      where: {
        topicId,
        userId: session.user.id,
      },
    });

    if (isSubscribed) {
      return new Response("You've already subscribed to this topic", {
        status: 400,
      });
    }

    // create topic and associate it with the user
    await prisma.subscription.create({
      data: {
        topicId,
        userId: session.user.id,
      },
    });

    return new Response(topicId);
  } catch (error) {
    error;
    if (error instanceof z.ZodError) {
      return new Response("Invalid POST request data passed", { status: 422 });
    }

    return new Response(
      "Could not subscribe to topic at this time. Please try later",
      { status: 500 }
    );
  }
}
