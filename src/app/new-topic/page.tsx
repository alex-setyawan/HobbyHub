import AllPosts from "@/components/AllPosts";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type PageProps = {};

export default function Page({}: PageProps) {
  return (
    <div>
      {/* remove if topic already exists */}
      <textarea placeholder="What's the topic?"></textarea>
      <br></br>
      <textarea placeholder="What's on your mind?"></textarea>
      <br></br>
      <Link href="/shop">SHOP</Link>
      <Button>POST</Button>
      <br></br>

      {/* parameter to be passed in */}
      <AllPosts />
    </div>
  );
}
