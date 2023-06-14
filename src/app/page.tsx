import ImgRedirect from "@/components/ImgRedirect";
import Navbar from "@/components/Navbar";
import Archery from "../assets/images/archery.jpg";

export default function Home() {
  return (
    <>
      <Navbar />
      <h1>Topics</h1>
      <p>
        Which one <u>interests</u> you today?
      </p>
      <div className="flex gap-3 justify-between">
        <ImgRedirect img={Archery} text={"Archery"} />
        <ImgRedirect img={Archery} text={"Archery"} />
        <ImgRedirect img={Archery} text={"Archery"} />
        <ImgRedirect img={Archery} text={"Archery"} />
      </div>
    </>
  );
}
