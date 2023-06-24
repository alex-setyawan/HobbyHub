import { prisma } from "@/lib/db";
import { PAGES_FETCH_LIMIT } from "@/config";
import PostFeed from "./PostFeed";
import { getAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";

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
