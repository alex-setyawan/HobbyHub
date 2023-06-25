import Link from "next/link";

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
      <Link href="/new-topic">{topic}</Link>
      <p>Posts: {numOfPosts}</p>
      <p>Updated: {lastPostDate}</p>
    </div>
  );
}
