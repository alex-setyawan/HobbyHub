import { PAGES_FETCH_LIMIT } from "@/config";
import { prisma } from "@/lib/db";
import PostFeed from "./PostFeed";

export default async function GeneralFeed() {
  const posts = await prisma.post.findMany({
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