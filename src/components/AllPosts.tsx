import Post from "./Post";
import { testdata } from "./TESTDATA";

export default function AllPosts() {
  return testdata.postData.map((post) => {
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
      </>
    );
  });
}
