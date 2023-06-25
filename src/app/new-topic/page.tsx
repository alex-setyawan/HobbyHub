import AllPosts from "@/components/AllPosts";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { newPost } from "../functions"

type PageProps = {};

export default function Page({}: PageProps) {
  return (
    <div>
      <Link href="/marketplace">SHOP</Link>
      <br></br>
      <textarea id="topic-box" placeholder="What's the topic?"></textarea> {/* remove if topic already exists */}
      <br></br>
      <textarea id="content-box" placeholder="What's on your mind?"></textarea>
      <br></br>
      <Button /* onClick={newPost} */>POST</Button>
      <br></br>

      {/* parameter to be passed in */}
      <AllPosts />
    </div>
  );
}