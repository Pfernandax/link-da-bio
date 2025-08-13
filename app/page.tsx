import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      <header className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <span className="text-lg font-extrabold">LinkBio</span>
        <Link
          href="/editor"
          className="px-3 py-2 rounded-xl border bg-white/10 hover:bg-white/15"
        >
          Abrir o Editor
        </Link>
      </header>

      <section className="max-w-5xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-extrabold">Crie seu link da bio</h1>
        <p className="text-white/70">
          Personalize e publique um link único com botões e redes sociais.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/editor"
            className="px-4 py-2 rounded-xl border bg-emerald-500/20 border-emerald-300/30 hover:bg-emerald-500/25"
          >
            Começar agora
          </Link>

          {/* Opcional: abre o visualizador vazio (mostra "Link inválido" até gerar um link pelo editor) */}
          <Link
            href="/v"
            className="px-4 py-2 rounded-xl border bg-white/10 hover:bg-white/15"
          >
            Ver visualizador
          </Link>
        </div>
      </section>
    </main>
  );
}
