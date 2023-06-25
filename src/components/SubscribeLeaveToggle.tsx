"use client";

import { SubscribeToTopicPayload } from "@/lib/validators/topic";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { useAuthToast } from "@/hooks/use-auth-toast";
import { startTransition } from "react";
import { useRouter } from "next/navigation";

type SubscribeLeaveToggleProps = {
  topicId: string;
  topicName: string;
  isSubscribed: boolean;
};

export default function SubscribeLeaveToggle({
  topicId,
  topicName,
  isSubscribed,
}: SubscribeLeaveToggleProps): JSX.Element {
  const { loginToast } = useAuthToast();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToTopicPayload = {
        topicId,
      };

      const { data } = await axios.post("/api/topic/subscribe", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "There was a problem.",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });

      return toast({
        title: "Subscribed!",
        description: `You are now subscribed to ${topicName}.`,
      });
    },
  });

  const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToTopicPayload = {
        topicId,
      };

      const { data } = await axios.post("/api/topic/unsubscribe", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "There was a problem.",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });

      return toast({
        title: "Unsubscribed!",
        description: `You are now unsubscribed to ${topicName}.`,
      });
    },
  });

  return isSubscribed ? (
    <Button
      isLoading={isUnsubLoading}
      onClick={() => unsubscribe()}
      className="w-full mt-1 mb-4"
    >
      Leave community
    </Button>
  ) : (
    <Button
      isLoading={isSubLoading}
      onClick={() => subscribe()}
      className="w-full mt-1 mb-4"
    >
      Join to post
    </Button>
  );
}
