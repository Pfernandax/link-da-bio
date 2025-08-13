import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editor Link da Bio",
  description: "Personalize seu link da bio (Next.js + Tailwind)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="border-b border-white/10 bg-[#0b1020] text-white">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-extrabold">LinkBio</Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/editor" className="hover:underline">Editor</Link>
              <a href="/v" className="hover:underline">/v</a>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
