import AllPosts from "./AllPosts";

type pr = {
    
  };

export default function AnyTopic({}: pr) {
    return (
      <div>
        {/* remove if topic already exists */}
        <textarea placeholder="What's the topic?"></textarea>
        <br></br>
        <textarea placeholder="What's on your mind?"></textarea>
        <br></br>
        <a href="#">SHOP</a>
        <button>POST</button>
        <br></br>
        
        {/* parameter to be passed in */}
        <AllPosts />
      </div>
    );
  }