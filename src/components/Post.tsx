type pr = {
    poster: string;
    content: string;
    netLikes: number;
    numComments: number;
  };
  
  export default function TopicLine({poster, content, netLikes, numComments}: pr) {
    return (
      <div className="topic-line">
        <h6>{poster}</h6>
        <p>{content}</p>
        <p>{netLikes}</p>
        <p>{numComments}</p>
        {/* <p>{comments}</p> */}
      </div>
    );
  }