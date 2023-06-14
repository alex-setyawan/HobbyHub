import Link from "next/link";

type RedirectProps = {
  page: string;
  text: string;
};

export default function Redirect({ page, text }: RedirectProps) {
  return (
    <Link
      className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
      href={"/" + page}
    >
      {text}
    </Link>
  );
}
