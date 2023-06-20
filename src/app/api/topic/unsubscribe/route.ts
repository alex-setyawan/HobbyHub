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

    const isSubscribed = await prisma.subscription.findFirst({
      where: {
        topicId,
        userId: session.user.id,
      },
    });

    if (!isSubscribed) {
      return new Response("You are not subscribed to this topic.", {
        status: 400,
      });
    }

    // check if user is the creator of the topic
    const isCreator = await prisma.topic.findFirst({
      where: {
        id: topicId,
        creatorId: session.user.id,
      },
    });

    if (isCreator) {
      return new Response("You cannot unsubscribe from your own topic.", {
        status: 400,
      });
    }

    await prisma.subscription.delete({
      where: {
        userId_topicId: {
          topicId,
          userId: session.user.id,
        },
      },
    });

    return new Response(topicId);
  } catch (error) {
    error;
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response(
      "Could not unsubscribe to topic at this time. Please try later",
      { status: 500 }
    );
  }
}
