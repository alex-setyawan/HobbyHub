"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios, { Axios, AxiosError } from "axios";
import { CreateTopicPayload } from "@/lib/validators/topic";
import { toast } from "@/hooks/use-toast";
import { useAuthToast } from "@/hooks/use-auth-toast";
import { log } from "console";

export default function Page() {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const { loginToast } = useAuthToast();

  // send request to create topic
  const { mutate: createTopic, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateTopicPayload = {
        topicName: input,
      };
      const { data } = await axios.post("/api/topic", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Topic already exists.",
            description: "Please try another name.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 422) {
          return toast({
            title: "Invalid topic name.",
            description: "Please choose a name between 3 and 21 characters.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      toast({
        title: "Something went wrong.",
        description: "Could not create topic.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      router.push(`/topic/${data}`);
    },
  });

  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Create a Community</h1>
        </div>

        <hr className="bg-zinc-500 h-px" />

        <div>
          <p className="text-lg font-medium">Name</p>
          <p className="text-xs pb-2">
            Community names including capitalization cannot be changed.
          </p>
          <div className="relative">
            <p className="absolute text-sm left-4 w-8 inset-y-0 grid place-items-center text-zinc-400">
              topic/
            </p>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="pl-14"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="subtle" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => createTopic()}
          >
            Create Community
          </Button>
        </div>
      </div>
    </div>
  );
}
