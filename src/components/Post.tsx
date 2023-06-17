type TopicLineProps = {
  poster: string;
  content: string;
  netLikes: number;
  numComments: number;
};

export default function TopicLine({
  poster,
  content,
  netLikes,
  numComments,
}: TopicLineProps) {
  return (
    <div className="topic-line">
      <h6>{poster}</h6>
      <p>{content}</p>
      <p>Likes: {netLikes}</p>
      <p>Comments: {numComments}</p>
      {/* <p>{comments}</p> */}
    </div>
  );
}
