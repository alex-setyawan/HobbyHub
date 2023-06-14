import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type ImgRedirectProps = {
  img: StaticImageData;
  text: string;
};

export default function ImgRedirect({ img, text }: ImgRedirectProps) {
  return (
    <>
      <Link
        href={"/" + text}
        className="rounded-lg overflow-hidden inline-block"
      >
        <div className="relative">
          <Image src={img} width={300} alt={text} />
          <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
            {text}
          </div>
        </div>
      </Link>
    </>
  );
}
