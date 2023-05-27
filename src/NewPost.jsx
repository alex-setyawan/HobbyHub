import React, { useState } from "react";
import "./new-post.css";

function NewPost() {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

  function handleClick() {
    const allPosts = [...posts, input];
    input && setPosts(allPosts);
    setInput("");
  }

  return (
    <>
      <div className="new-post">
        <h1 class="new-post-label">New Post</h1>
        <p class="topic-question">
          What's the <i>activity?</i>
        </p>
        <textarea name="text" wrap="soft" class="topic-box"></textarea>
        <br />
        <p className="content-question">
          What <i>about</i> it?
        </p>
        <textarea
          name="text"
          wrap="soft"
          className="content-box"
          onChange={(event) => setInput(event.target.value)}
          value={input}
        />
      </div>
      <div className="post">
        <a href="#" className="post-button" onClick={handleClick}>
          POST IT!
        </a>
      </div>
      <div className="all-posts">
        {posts.map((post) => (
          <p className="some-post">{post}</p>
        ))}
      </div>
    </>
  );
}

export default NewPost;
