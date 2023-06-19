import ImgRedirect from "@/components/ImgRedirect";
import Archery from "../assets/images/archery.jpg";
import AllTopics from "@/components/AllTopics";
import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Topics</h1>
      <p>
        Which one <u>interests</u> you today?
      </p>
      <br></br>
      <h4>Topic</h4>
      <h4>Total Posts:</h4>
      <h4>Last Active:</h4>
      <br></br>

      {/* COMMENT JUST IN CASE AH
      <div className="flex gap-3 justify-between">
        <ImgRedirect img={Archery} text={"Archery"} />
        <ImgRedirect img={Archery} text={"Archery"} />
        <ImgRedirect img={Archery} text={"Archery"} />
        <ImgRedirect img={Archery} text={"Archery"} />
      </div>
      */}

      <AllTopics />

      <div>
        {/* change page.tsx file in @/app/newTopic */}
        <Link href="/newTopic" className={buttonVariants()}>
          ADD YOUR OWN
        </Link>
      </div>
    </>
  );
}
