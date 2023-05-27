import React, { useState } from "react";
import "./new-post.css";

function Archery() {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

  function handleClick() {
    const allPosts = [...posts, input];
    setPosts(allPosts);
    setInput("");
  }

  return (
    <>
      <div className="new-post">
        <h1 className="new-post-label">Archery</h1>
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

export default Archery;
