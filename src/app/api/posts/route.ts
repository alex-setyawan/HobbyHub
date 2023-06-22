import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const session = await getAuthSession();

  let followedCommunitiesIds: string[] = [];

  if (session) {
    const followedCommunities = await prisma.subscription.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        topic: true,
      },
    });

    followedCommunitiesIds = followedCommunities.map((sub) => sub.topic.id);
  }

  try {
    const { limit, page, topicName } = z
      .object({
        limit: z.string(),
        page: z.string(),
        topicName: z.string().nullish().optional(),
      })
      .parse({
        topicName: url.searchParams.get("topicName"),
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      });

    let whereClause = {};

    if (topicName) {
      whereClause = {
        topic: {
          name: topicName,
        },
      };
    } else if (session) {
      whereClause = {
        topic: {
          id: {
            in: followedCommunitiesIds,
          },
        },
      };
    }

    const posts = await prisma.post.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
      orderBy: {
        createdAt: "desc",
      },
      include: {
        topic: true,
        votes: true,
        author: true,
        comments: true,
      },
      where: whereClause,
    });

    return new Response(JSON.stringify(posts));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed.", { status: 422 });
    }

    return new Response("Could not fetch posts.", { status: 500 });
  }
}
