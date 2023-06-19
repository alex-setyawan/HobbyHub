import { z } from "zod";

export const TopicValidator = z.object({
  topicName: z.string().min(3).max(21),
});

export const TopicSubscriptionValidator = z.object({
  topicId: z.string(),
});

export type CreateTopicPayload = z.infer<typeof TopicValidator>;
export type SubscribeToTopicPayload = z.infer<
  typeof TopicSubscriptionValidator
>;
