import Link from "next/link";
import Image from "next/image";
import hobbyhub from "../assets/images/hobbyhub.png";
import Redirect from "./Redirect";

export default function Navbar() {
  return (
    <>
      <div className="flex justify-between">
        <Link href="/">
          <Image src={hobbyhub} width={200} alt={"hobbyhub icon"} />
        </Link>
        <div className="flex gap-1">
          <Redirect page="login" text="Login" />
          <Redirect page="signup" text="Sign Up" />
        </div>
      </div>
    </>
  );
}
