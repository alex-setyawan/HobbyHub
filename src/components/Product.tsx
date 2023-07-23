/*

import { formatTimeToNow } from "@/lib/utils";
import { Post, User, Vote } from "@prisma/client";
import { MessageSquare } from "lucide-react";
import { useRef } from "react";
import PostContent from "./PostContent";
import PostVoteClient from "./post-vote/PostVoteClient";

type PartialVote = Pick<Vote, "type">;

type PostPreviewProps = {
  topicName: string;
  post: Post & {
    author: User;
    votes: Vote[];
  };
  commentAmt: number;
  votesAmt: number;
  currentVote?: PartialVote;
};

export default function PostPreview({
  topicName,
  post,
  commentAmt,
  votesAmt,
  currentVote,
}: PostPreviewProps) {
  const postRef = useRef<HTMLDivElement>(null);
  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        <PostVoteClient
          initialVotesAmt={votesAmt}
          postId={post.id}
          initialVote={currentVote?.type}
        />
        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            {topicName ? (
              <>
                <a
                  className="underline text-zinc-900 text-sm underline-offset-2"
                  href={`/topic/${topicName}`}
                >
                  {topicName}
                </a>
                <span className="px-1">•</span>
              </>
            ) : null}
            <span>Posted by {post.author.username}</span>{" "}
            {formatTimeToNow(new Date(post.createdAt))}
          </div>
          <a href={`/topic/${topicName}/post/${post.id}`}>
            <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
              {post.title}
            </h1>
          </a>
          <div
            className="relative text-sm max-h-40 w-full overflow-clip"
            ref={postRef}
          >
            <PostContent content={post.content} />
            {postRef.current?.clientHeight === 160 ? (
              // blur bottom if content is too long
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 z-20 text-sm px-4 py-4 sm:px-6">
        <a
          href={`/topic/${topicName}/post/${post.id}`}
          className="w-fit flex items-center gap-2"
        >
          <MessageSquare className="h-4 w-4" /> {commentAmt} comments
        </a>
      </div>
    </div>
  );
}

/* adapted for product but runtime error */

import { formatTimeToNow } from "@/lib/utils";
import { Product, User } from "@prisma/client";
import { MessageSquare } from "lucide-react";
import { useRef } from "react";
import PostContent from "./PostContent";
import Link from "next/link";

type ProductPreviewProps = {
  topicName: string;
  product: Product & {
    poster: User;
  };
};

export default function ProductPreview({
  topicName,
  product
}: ProductPreviewProps) {
  const postRef = useRef<HTMLDivElement>(null);
  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        {/*
        <PostVoteClient             // DELETE THIS COMPONENT
          initialVotesAmt={votesAmt}
          postId={post.id}
          initialVote={currentVote?.type}
        />
        */}
        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            {topicName ? (
              <>
                <a
                  className="underline text-zinc-900 text-sm underline-offset-2"
                  href={`/topic/${topicName}`}
                >
                  {topicName}
                </a>
                <span className="px-1">•</span>
              </>
            ) : null}
            <span>
              Posted by&nbsp;
              <Link
                className="font-bold"
                href={`/settings/${product.poster.id}`}
              >
                {product.poster.username}
              </Link>
            </span>{" "}
            {formatTimeToNow(new Date(product.createdAt))}
          </div>
          <a href={`/topic/${topicName}/shop/${product.id}`}>
            <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
              {product.title}
            </h1>
          </a>
          <div
            className="relative text-sm max-h-40 w-full overflow-clip"
            ref={postRef}
          >
            <PostContent content={product.content} />
            {postRef.current?.clientHeight === 160 ? (
              // blur bottom if content is too long
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 z-20 text-sm px-4 py-4 sm:px-6">
        <a
          href={`/topic/${topicName}/shop/${product.id}`}
          className="w-fit flex items-center gap-2"
        >
          <MessageSquare className="h-4 w-4" /> {/* NUMBER OF */} comments
        </a>
      </div>
    </div>
  );
}