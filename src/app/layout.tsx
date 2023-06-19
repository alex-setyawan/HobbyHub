import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/Toaster";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HobbyHub",
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased light",
        inter.className
      )}
    >
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className="min-h-screen pt-12 bg-slate-50 antialiased">
        <Providers>
          <Navbar />

          {authModal}

          <div className="container max-w-7xl mx-auto h-full pt-12">
            {children}
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
