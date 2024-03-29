import SubscribeLeaveToggle from "@/components/SubscribeLeaveToggle";
import ToFeedButton from "@/components/ToFeedButton";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BsFillBagFill } from 'react-icons/bs';

export default async function Layout({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const session = await getAuthSession();

  const topic = await prisma.topic.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });

  const subscription = !session?.user
    ? undefined
    : await prisma.subscription.findFirst({
        where: {
          topic: {
            name: slug,
          },
          user: {
            id: session.user.id,
          },
        },
      });

  const isSubscribed = !!subscription;

  const memberCount = await prisma.subscription.count({
    where: {
      topic: {
        name: slug,
      },
    },
  });

  if (!topic) return notFound();

  return (
    <div className="sm:container max-w-7xl mx-auto h-full pt-12">
      <div>
        <ToFeedButton />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
          <div className="flex flex-col col-span-2 space-y-6">{children}</div>

          {/* sidebar */}
          <div className="hidden md:block overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
            <div className="px-6 py-4">
              <p className="font-semibold py-3">About {topic.name}</p>
            </div>

            <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Created</dt>
                <dd className="text-gray-700">
                  <time dateTime={topic.createdAt.toDateString()}>
                    {format(topic.createdAt, "MMMM d, yyyy")}
                  </time>
                </dd>
              </div>

              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Members</dt>
                <dd className="text-gray-700">
                  <div className="text-gray-900">{memberCount}</div>
                </dd>
              </div>

              {topic.creatorId === session?.user.id ? (
                <div className="flex justify-between gap-x-4 py-3">
                  <p className="text-gray-500">You created this community</p>
                </div>
              ) : null}

              {topic.creatorId !== session?.user.id ? (
                <SubscribeLeaveToggle
                  topicId={topic.id}
                  topicName={topic.name}
                  isSubscribed={isSubscribed}
                />
              ) : null}

              <Link
                className={buttonVariants({
                  variant: "outline",
                  className: "w-full mb-4",
                })}
                href={`/topic/${slug}/submit`}
              >
                Create Post
              </Link>
{/*
              <Link
                className={buttonVariants({
                  variant: "shop",
                  className: "w-full mb-4",
                })}
                href={`/topic/${slug}/shop`}
              >
                <BsFillBagFill />&nbsp;SHOP
              </Link>

              <Link
                className={buttonVariants({
                  variant: "upload",
                  className: "w-full mb-6",
                })}
                href={`/topic/${slug}/shop/upload`}
              >
                Upload Item
              </Link> */}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
