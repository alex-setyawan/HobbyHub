"use client";

import { Comment, CommentVote, User } from "@prisma/client";
import UserAvatar from "./UserAvatar";
import { useRef, useState } from "react";
import { formatTimeToNow } from "@/lib/utils";
import CommentVotes from "./CommentVotes";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { MessageSquare } from "lucide-react";
import { Button } from "./ui/Button";
import { Label } from "./ui/Label";
import { Textarea } from "./ui/Textarea";
import { useMutation } from "@tanstack/react-query";
import { CommentRequest } from "@/lib/validators/comment";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

type ExtendedComment = Comment & {
  votes: CommentVote[];
  author: User;
};

type PostCommentProps = {
  comment: ExtendedComment;
  votesAmt: number;
  currentVote: CommentVote | undefined;
  postId: string;
};

export default function Comment({
  comment,
  votesAmt,
  currentVote,
  postId,
}: PostCommentProps) {
  const commentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: session } = useSession();
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const { mutate: postComment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = { postId, text, replyToId };

      const { data } = await axios.patch(`/api/topic/post/comment/`, payload);
      return data;
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Comment wasn't created successfully. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      setIsReplying(false);
    },
  });

  return (
    <div ref={commentRef} className="flex flex-col">
      <div className="flex items-center">
        <UserAvatar
          user={{
            name: comment.author.name || null,
            image: comment.author.image || null,
          }}
          className="h-6 w-6"
        />

        <div className="ml-2 flex items-center gap-x-2">
          <p className="text-sm font-medium text-gray-900">
            <Link
              className="font-bold"
              href={`/settings/${comment.author.id}`}
            >
              {comment.author.username}
            </Link>
          </p>

          <p className="max-h-40 truncate text-xs text-zinc-500">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>
      <p className="text-sm text-zinc-900 mt-2">{comment.text}</p>

      <div className="flex gap-2 items-center flex-wrap">
        <CommentVotes
          commentId={comment.id}
          initialVotesAmt={votesAmt}
          initialVote={currentVote}
        />
        <Button
          onClick={() => {
            if (!session) return router.push("/log-in");
            setIsReplying(true);
          }}
          variant="ghost"
          size="xs"
        >
          <MessageSquare className="h-4 w-4 mr-1.5" />
          Reply
        </Button>

        {isReplying ? (
          <div className="grid w-full gap-1.5">
            <Label htmlFor="comment">Your comment</Label>
            <div className="mt-2">
              <Textarea
                //  onFocus={(e) =>
                //    e.currentTarget.setSelectionRange(
                //      e.currentTarget.value.length,
                //      e.currentTarget.value.length
                //    )
                //  }
                autoFocus
                id="comment"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={1}
                placeholder="What are your thoughts?"
              />

              <div className="mt-2 flex justify-end gap-2">
                <Button
                  tabIndex={-1}
                  variant="subtle"
                  onClick={() => setIsReplying(false)}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isLoading}
                  onClick={() => {
                    if (!input) return;
                    postComment({
                      postId,
                      text: input,
                      replyToId: comment.replyToId ?? comment.id, // default to top-level comment
                    });
                  }}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
