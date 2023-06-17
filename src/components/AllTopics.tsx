import TopicLine from "./TopicLine";
import { testdata } from "@/components/TESTDATA";

export default function AllTopics() {
  return testdata.topicData.map((topic) => {
    return (
      <>
        <TopicLine
          image={topic.image}
          topic={topic.topic}
          numOfPosts={topic.numOfPosts}
          lastPostDate={topic.lastPostDate}
        />
        <br></br>
      </>
    );
  });
}
