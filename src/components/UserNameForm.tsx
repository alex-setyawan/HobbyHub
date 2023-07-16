"use client";

import { UsernameRequest, UsernameValidator } from "@/lib/validators/username";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import TextareaAutosize from "react-textarea-autosize";

type UserNameFormProps = {
  user: Pick<User, "id" | "username" | "teleHandle" | "email" | "bio">;
  canEdit: boolean;
};

export default function UserNameForm({ user, canEdit }: UserNameFormProps) {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UsernameRequest>({
    resolver: zodResolver(UsernameValidator),
    defaultValues: {
      name: user?.username || "",
      teleHandle: user?.teleHandle || "",
      email: user?.email!,
      bio: user?.bio || "",
    },
  });

  const { mutate: updateUsername, isLoading } = useMutation({
    mutationFn: async ({ name, teleHandle, email, bio }: UsernameRequest) => {
      const payload: UsernameRequest = { name, teleHandle, email, bio };

      const { data } = await axios.patch(`/api/username/`, payload);
      return data;
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Username already taken.",
            description: "Please choose another username.",
            variant: "destructive",
          });
        }
      }

      return toast({
        title: "Something went wrong.",
        description: "Your profile was not updated. Please try again.",
        variant: "destructive",
      });
    },

    onSuccess: () => {
      toast({
        description: "Your profile has been updated.",
      });
      router.refresh();
    },
  });

  // username, telegram handle, email address, bio
  return (
    <form onSubmit={handleSubmit((e) => updateUsername(e))}>
      <Card>
        {/* username */}
        <CardHeader>
          <CardTitle>Username</CardTitle>
          <CardDescription>
            Enter a display name you are comfortable with
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative grid gap-1">
            <div className="absolute top-0 left-0 w-8 h-10 grid place-items-center">
              <span className="text-sm text-zinc-400"></span>
            </div>

            <Input
              id="name"
              className="w-[400px]"
              size={32}
              {...register("name")}
            />

            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
        </CardContent>

        {/* telegram handle */}
        <CardHeader>
          <CardTitle>Telegram Handle</CardTitle>
          <CardDescription>
            For prospective buyers to reach you
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative grid gap-1">
            <div className="absolute top-0 left-0 w-8 h-10 grid place-items-center">
              <span className="text-sm text-zinc-400"></span>
            </div>

            <Input
              id="name"
              className="w-[400px]"
              size={32}
              {...register("teleHandle")}
            />
          </div>
        </CardContent>

        {/* email address */}
        <CardHeader>
          <CardTitle>Email Address</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="relative grid gap-1">
            <div className="absolute top-0 left-0 w-8 h-10 grid place-items-center">
              <span className="text-sm text-zinc-400"></span>
            </div>

            <Input
              id="name"
              className="w-[400px]"
              size={32}
              {...register("email")}
            />
          </div>
        </CardContent>

        {/* bio */}
        <CardHeader>
          <CardTitle>Bio</CardTitle>
          <CardDescription>
            Tell us a little about yourself!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative grid gap-1">
            <div className="absolute top-0 left-0 w-8 h-10 grid place-items-center">
              <span className="text-sm text-zinc-400"></span>
            </div>

            <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
              <form>
                <div className="prose prose-stone dark:prose-invert">
                  <TextareaAutosize
                    placeholder="Tap here to fill"
                    className="w-full resize-none appearance-none overflow-hidden bg-transparent text-base focus:outline-none"
                    {...register("bio")}
                  />

                  <div id="editor" className="min-h-[100px]" />
                </div>
              </form>
            </div>
          </div>
        </CardContent>

        {canEdit ?
          <CardFooter>
            <Button isLoading={isLoading}>SAVE ALL</Button>
          </CardFooter>
        : null}
      </Card>
    </form>
  );
}