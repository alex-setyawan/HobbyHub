"use client";

import { toast } from "@/hooks/use-toast";
import { uploadFiles } from "@/lib/uploadthing";
import { ProductCreationRequest, ProductValidator } from "@/lib/validators/post";
import "@/styles/postForm.css";
import type EditorJS from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

type ProductFormProps = {
  topicId: string;
};

export default function ProductForm({ topicId }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductCreationRequest>({
    resolver: zodResolver(ProductValidator),
    defaultValues: { 
      topicId,
      title: "",
      price: undefined,
      content: null,
      qtySold: undefined
    },
  });

  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  // upload to uploadthing
                  const [res] = await uploadFiles([file], "imageUploader");

                  return {
                    success: 1,
                    file: {
                      url: res.fileUrl,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        toast({
          title: "Something went wrong.",
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }
  }, [errors]);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  const { mutate: createProduct, isLoading } = useMutation({
    mutationFn: async ({ topicId, title, price, content, qtySold  }: ProductCreationRequest) => {
      const payload: ProductCreationRequest = { topicId, title, price, content, qtySold };
      const { data } = await axios.post("/api/topic/product/upload", payload);
      return data;
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Your product was not uploaded. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      const newPathname = pathname.split("/").slice(0, -1).join("/");
      router.push(newPathname);

      router.refresh();

      return toast({
        description: "Your product has been uploaded.",
      });
    },
  });

  async function onSubmit(data: ProductCreationRequest) {
    const blocks = await ref.current?.save();

    const payload: ProductCreationRequest = {
      topicId,
      title: data.title,
      price: data.price,
      content: blocks,
      qtySold: data.qtySold,
    };

    createProduct(payload);
  }

  if (!isMounted) {
    return null;
  }

  const { ref: titleRef, ...rest } = register("title");

  return (
    <form
      id="topic-product-form"
      className="w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
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
              {...register("title")}
            />
          </div>
        </CardContent>

        <CardHeader>
          <CardTitle>Price</CardTitle>
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
              placeholder="$"
              {...register("price")}
            />
          </div>
        </CardContent>

        <CardHeader>
          <CardTitle>Quantity Sold</CardTitle>
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
              {...register("qtySold")}
            />
          </div>
        </CardContent>

        <CardHeader>
          <CardTitle>Description</CardTitle>
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
                    {...register("content")}
                  />

                  <div id="editor" className="min-h-[100px]" />
                </div>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}