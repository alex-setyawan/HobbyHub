type pr = {
  image: string;
  topic: string;
  numOfPosts: number;
  lastPostDate: string;
};

export default function TopicLine({image, topic, numOfPosts, lastPostDate}: pr) {
  return (
    <div className="topic-line">
      <img src={image}/>
      <h3>{topic}</h3>
      <p>{numOfPosts}</p>
      <p>{lastPostDate}</p>
    </div>
  );
}