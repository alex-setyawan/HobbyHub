type TopicLineProps = {
  image: string;
  topic: string;
  numOfPosts: number;
  lastPostDate: string;
};

export default function TopicLine({
  image,
  topic,
  numOfPosts,
  lastPostDate,
}: TopicLineProps) {
  return (
    <div className="topic-line">
      <img src={image} />
      <h3>{topic}</h3>
      <p>Posts: {numOfPosts}</p>
      <p>Updated: {lastPostDate}</p>
    </div>
  );
}
