export default function Home() {
  return (
    <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 shadow">
      <h1 className="text-2xl font-extrabold mb-2">Bem-vinda!</h1>
      <p className="opacity-80 mb-4">
        Use o menu acima para abrir o <strong>Editor</strong>.
      </p>
      <a
        className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-semibold border border-white/15 bg-white/5"
        href="/editor"
      >
        Ir para o Editor →
      </a>
    </div>
  );
}
