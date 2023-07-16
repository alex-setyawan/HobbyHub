import { Comment, Post, Product, Topic, User, Vote } from "@prisma/client";

export type ExtendedPost = Post & {
  topic: Topic;
  votes: Vote[];
  author: User;
  comments: Comment[];
};

export type ExtendedProduct = Product & {
  topic: Topic;
  poster: User;
};