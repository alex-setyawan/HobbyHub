import { z } from "zod";

export const PostValidator = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be longer than 3 characters" })
    .max(128, { message: "Title must be at most 128 characters" }),
  topicId: z.string(),
  content: z.any(),
});

export type PostCreationRequest = z.infer<typeof PostValidator>;

export const ProductValidator = z.object({
  topicId: z.string(),
  title: z.string(),
  price: z.number(),
  content: z.any(),
  qtySold: z.number(),
});

export type ProductCreationRequest = z.infer<typeof ProductValidator>;