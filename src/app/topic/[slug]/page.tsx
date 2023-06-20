import CreatePost from "@/components/CreatePost";
import { PAGES_FETCH_LIMIT } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  const session = await getAuthSession();

  const topic = await prisma.topic.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          topic: true,
        },
        take: PAGES_FETCH_LIMIT,
      },
    },
  });

  if (!topic) return notFound();

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">{topic.name}</h1>
      <CreatePost session={session} />
      {/* TODO: Show post in user feed */}
    </>
  );
}
