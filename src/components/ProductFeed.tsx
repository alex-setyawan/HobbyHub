/*

"use client";

import { PAGES_FETCH_LIMIT } from "@/config";
import { ExtendedPost } from "@/types/db";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import Post from "./Post";
import { Loader2 } from "lucide-react";

type PostFeedProps = {
  initialPosts: ExtendedPost[];
  topicName?: string;
};

export default function PostFeed({ initialPosts, topicName }: PostFeedProps) {
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data: session } = useSession();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query"],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=${PAGES_FETCH_LIMIT}&page=${pageParam}` +
        (!!topicName ? `&topicName=${topicName}` : "");

      const { data } = await axios.get(query);
      return data as ExtendedPost[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage(); // Load more posts when the last post comes into view
    }
  }, [entry, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {posts.map((post, index) => {
        const votesAmt = post.votes.reduce((acc, vote) => {
          if (vote.type === "UP") return acc + 1;
          if (vote.type === "DOWN") return acc - 1;
          return acc;
        }, 0);

        const currentVote = post.votes.find(
          (vote) => vote.userId === session?.user.id
        );

        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={ref}>
              <Post
                currentVote={currentVote}
                votesAmt={votesAmt}
                topicName={post.topic.name}
                post={post}
                commentAmt={post.comments.length}
              />
            </li>
          );
        } else {
          return (
            <Post
              key={post.id}
              currentVote={currentVote}
              votesAmt={votesAmt}
              topicName={post.topic.name}
              post={post}
              commentAmt={post.comments.length}
            />
          );
        }
      })}

      {isFetchingNextPage && (
        <li className="flex justify-center">
          <Loader2 className="w-6 h-6 text-zinc-500 animate-spin" />
        </li>
      )}
    </ul>
  );
}

/* adapted for product feed but runtime error */

"use client";

import { PAGES_FETCH_LIMIT } from "@/config";
import { ExtendedProduct } from "@/types/db";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import Product from "./Product";
import { Loader2 } from "lucide-react";

type ProductFeedProps = {
  initialProducts: ExtendedProduct[];
  topicName?: string;
};

export default function ProductFeed({ initialProducts, topicName }: ProductFeedProps) {
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data: session } = useSession();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query"],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/products?limit=${PAGES_FETCH_LIMIT}&page=${pageParam}` + // CHANGE POSTS TO PRODUCTS?
        (!!topicName ? `&topicName=${topicName}` : "");

      const { data } = await axios.get(query);
      return data as ExtendedProduct[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialProducts], pageParams: [1] },
    }
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage(); // Load more posts when the last post comes into view
    }
  }, [entry, fetchNextPage]);

  const products = data?.pages.flatMap((page) => page) ?? initialProducts;

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {products ? products.map((product, index) => {
        
        if (index === products.length - 1) {
          return (
            <li key={product.id} ref={ref}>
              <Product
                topicName={product.topic.name}
                product={product}
              />
            </li>
          );
        } else {
          return (
            <Product
              key={product.id}
              topicName={product.topic.name}
              product={product}
            />
          );
        }
      }) : null}

      {isFetchingNextPage && (
        <li className="flex justify-center">
          <Loader2 className="w-6 h-6 text-zinc-500 animate-spin" />
        </li>
      )}
    </ul>
  );
}