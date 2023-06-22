import { Comment, Post, Topic, User, Vote } from "@prisma/client";

export type ExtendedPost = Post & {
  topic: Topic;
  votes: Vote[];
  author: User;
  comments: Comment[];
};
