import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0b1020] text-white">
      <div className="text-center space-y-3">
        <h1 className="text-2xl font-extrabold">Link da Bio</h1>
        <p className="text-white/70 text-sm">Crie e personalize seu link em poucos cliques.</p>
        <Link
          href="/editor"
          className="inline-block px-4 py-2 rounded-xl border bg-white/10 hover:bg-white/15"
        >
          Abrir o Editor
        </Link>
      </div>
    </main>
  );
}
