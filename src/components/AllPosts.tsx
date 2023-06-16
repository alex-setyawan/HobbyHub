import Post from "./Post";
import TESTDATA2 from "@/components/TESTDATA2";

export default function AllTopics() {
  return TESTDATA2.map(post => {
    return (
      <>
        <Post
          poster={post.poster}
          content={post.content}
          netLikes={post.netLikes}
          numComments={post.numComments}
          /* comments={post.comments} */
        />
        <br></br>
      </>)
    }
  )
}