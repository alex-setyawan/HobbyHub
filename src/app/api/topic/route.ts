// Send a POST request to create a new topic

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { TopicValidator } from "@/lib/validators/topic";
import z from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    // Check if the user is authenticated
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { topicName } = TopicValidator.parse(body);

    const topicExists = await prisma.topic.findFirst({
      where: {
        name: topicName,
      },
    });

    // Check if the topic already exists
    if (topicExists) {
      return new Response("Topic already exists", { status: 409 });
    }

    const topic = await prisma.topic.create({
      data: {
        name: topicName,
        creatorId: session.user.id,
      },
    });

    // Subscribe the creator to the topic
    await prisma.subscription.create({
      data: {
        userId: session.user.id,
        topicId: topic.id,
      },
    });

    return new Response(topic.name);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not create topic", { status: 500 });
  }
}
