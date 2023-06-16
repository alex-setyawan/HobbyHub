import TopicLine from "./TopicLine";
import TESTDATA from "@/components/TESTDATA";

export default function AllTopics() {
  return TESTDATA.map(topic => {
    return (
      <>
        <TopicLine
          image={topic.image}
          topic={topic.topic}
          numOfPosts={topic.numOfPosts}
          lastPostDate={topic.lastPostDate}
        />
        <br></br>
      </>)
    }
  )
}