import { PAGES_FETCH_LIMIT } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import PostFeed from "./PostFeed";

export default async function CustomFeed() {
  const session = await getAuthSession();

  // only rendered if session exists, so this will not happen
  if (!session) return notFound();

  const followedCommunities = await prisma.subscription.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      topic: true,
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      topic: {
        name: {
          in: followedCommunities.map(({ topic }) => topic.id),
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      topic: true,
    },
    take: PAGES_FETCH_LIMIT,
  });

  return <PostFeed initialPosts={posts} />;
}
