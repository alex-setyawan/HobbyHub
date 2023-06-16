import ImgRedirect from "@/components/ImgRedirect";
import Archery from "../assets/images/archery.jpg";

export default function Home() {
  return (
    <>
      <h1>Topics</h1>
      <p>
        Which one <u>interests</u> you today?
      </p>
      <div className="flex gap-3 justify-between text-slate-50">
        <ImgRedirect img={Archery} text={"Archery"} />
        <ImgRedirect img={Archery} text={"Archery"} />
        <ImgRedirect img={Archery} text={"Archery"} />
        <ImgRedirect img={Archery} text={"Archery"} />
      </div>
    </>
  );
}
