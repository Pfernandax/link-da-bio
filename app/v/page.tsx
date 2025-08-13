"use client";
import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";

/* ======================= Tipos ======================= */
type SocialIcon =
  | "instagram" | "whatsapp" | "youtube" | "tiktok" | "telegram" | "x" | "facebook" | "site" | "email";

type ThemeConfig = {
  background: { type: "color" | "gradient" | "image"; value: string };
  palette: { text: string; accent: string; muted: string; card: string };
  button: { variant: "solid" | "outline" | "ghost"; radius: number; shadow: "none" | "soft" | "lg" };
};

type LinkItem = { id: string; label: string; url: string; icon?: SocialIcon };
type Category = { id: string; title: string; limit?: number; items: LinkItem[] };
type SocialLink = { id: string; type: SocialIcon; url: string };

type PageConfig = {
  slug: string;
  title: string;
  bio?: string;
  avatar?: { src?: string };
  theme: ThemeConfig;
  socials: SocialLink[];
  categories: Category[];
  topLinks: { id: string; label: string; url: string }[];
};

/* ================== Helpers/Decoders ================= */
function decodePageParam(b64Uri: string): PageConfig | null {
  try {
    const b64 = decodeURIComponent(b64Uri);
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(json) as PageConfig;

    // defaults defensivos (caso venha faltando algo)
    if (!parsed.theme) {
      parsed.theme = {
        background: { type: "color", value: "#0b1020" },
        palette: { text: "#e5e7eb", accent: "#22d3ee", muted: "#94a3b8", card: "#111827" },
        button: { variant: "solid", radius: 18, shadow: "soft" },
      };
    }
    parsed.socials ??= [];
    parsed.categories ??= [];
    parsed.topLinks ??= [];

    return parsed;
  } catch {
    return null;
  }
}

function bgStyleFromTheme(theme: ThemeConfig): React.CSSProperties {
  // Aceita color, gradient ou image (url(...))
  return { background: theme.background.value };
}

/* ======================= Ícones ====================== */
const Icon = ({ name, className = "w-5 h-5" }: { name: SocialIcon; className?: string }) => {
  const common = { className, fill: "currentColor" } as any;
  switch (name) {
    case "instagram":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10.5 3.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M20.5 3.5A11 11 0 103.48 20.52L2 22l1.6-.47A11 11 0 1020.5 3.5z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M23.5 6.5s-.23-1.64-.95-2.36c-.91-.95-1.93-.95-2.4-1C16.97 3 12 3 12 3S7.03 3 3.85 3.14c-.47.05-1.49.05-2.4 1C.73 4.86.5 6.5.5 6.5S.36 8.42.36 10.34v1.32C.36 13.58.5 15.5.5 15.5s.23 1.64.95 2.36c.91.95 2.1.92 2.64 1.02C6.56 19.06 12 19.1 12 19.1s4.97-.01 8.15-.15c.47-.05 1.49-.05 2.4-1 .72-.72.95-2.36.95-2.36s.14-1.92.14-3.84V10.34c0-1.92-.14-3.84-.14-3.84zM9.75 14.3V8.7L15 11.5l-5.25 2.8z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M14 3c.7 2.3 2.3 4 4.5 4.5V11a7 7 0 11-7-7h2.5z" />
        </svg>
      );
    case "telegram":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M9.04 16.46l-.39 5.49 2.71-2.6 5.43 3.97c.99.55 1.69.26 1.96-.92l3.55-16.63c.31-1.46-.53-2.03-1.49-1.68L1.7 9.66c-1.45.56-1.43 1.37-.25 1.74l5.45 1.7L19.66 6.2c.6-.41 1.15-.18.7.23" />
        </svg>
      );
    case "x":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M13 22V12h3l1-4h-4V6a2 2 0 012-2h2V1h-3a5 5 0 00-5 5v2H7v4h3v10h3z" />
        </svg>
      );
    case "site":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M3 4h18v16H3zM3 9h18" />
        </svg>
      );
    case "email":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2z" />
          <path d="M22 7l-10 6L2 7" />
        </svg>
      );
  }
};

function Button({ label, cfg }: { label: string; cfg: ThemeConfig }) {
  const style: React.CSSProperties = useMemo(
    () => ({
      borderRadius: cfg.button.radius,
      color: cfg.button.variant === "solid" ? "#0b1020" : cfg.palette.accent,
      backgroundColor: cfg.button.variant === "solid" ? cfg.palette.accent : "transparent",
      borderColor: cfg.button.variant === "outline" ? cfg.palette.accent : "transparent",
      boxShadow:
        cfg.button.shadow === "none"
          ? "none"
          : cfg.button.shadow === "soft"
          ? "0 8px 24px rgba(0,0,0,.25)"
          : "0 12px 36px rgba(0,0,0,.35)",
    }),
    [cfg]
  );

  const cn =
    "w-full font-semibold px-4 py-3 border transition-transform active:translate-y-px " +
    (cfg.button.variant === "ghost" ? "hover:bg-white/10" : "hover:opacity-90");

  return <button className={cn} style={style}>{label}</button>;
}

/* ===================== Página Pública ===================== */
export default function PublicPage() {
  const q = useSearchParams();
  const d = q.get("d");
  const page = d ? decodePageParam(d) : null;

  if (!page) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#0b1020] text-white">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-md text-center">
          <h1 className="text-xl font-bold mb-2">Link inválido</h1>
          <p className="opacity-80 text-sm">Gere o link novamente no editor.</p>
          <a
            href="/editor"
            className="inline-block mt-3 px-3 py-2 rounded-xl border bg-white/10 hover:bg-white/15 text-sm"
          >
            Abrir editor
          </a>
        </div>
      </div>
    );
  }

  const cfg = page.theme;
  const bgStyle = useMemo(() => bgStyleFromTheme(cfg), [cfg]);

  return (
    <div className="min-h-screen" style={{ ...bgStyle, color: cfg.palette.text }}>
      <div className="max-w-xl mx-auto px-4 pt-8 pb-16">
        {/* Top links */}
        {page.topLinks.length > 0 && (
          <nav className="flex items-center justify-center gap-3 text-xs mb-4" style={{ color: cfg.palette.muted }}>
            {page.topLinks.map((t) => (
              <a key={t.id} href={t.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {t.label}
              </a>
            ))}
          </nav>
        )}

        {/* Header */}
        <div className="text-center mb-5">
          <div
            className="w-28 h-28 rounded-full mx-auto mb-3 border border-white/20 overflow-hidden"
            style={{ background: "rgba(255,255,255,.12)" }}
          >
            {page.avatar?.src && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={page.avatar.src} alt="avatar" className="w-full h-full object-cover" />
            )}
          </div>
          <h1 className="text-2xl font-extrabold">{page.title}</h1>
          {page.bio && (
            <p className="text-sm mt-1" style={{ color: cfg.palette.muted }}>
              {page.bio}
            </p>
          )}

          {/* Socials */}
          {page.socials.length > 0 && (
            <div className="flex items-center justify-center gap-3 mt-3">
              {page.socials.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl"
                  style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)" }}
                  aria-label={s.type}
                >
                  <Icon name={s.type} />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Categorias / Botões */}
        <div className="space-y-6">
          {page.categories.map((cat) => (
            <div key={cat.id}>
              <div
                className="text-xs font-bold uppercase tracking-wide mb-2"
                style={{ color: cfg.palette.muted }}
              >
                {cat.title}
              </div>
              <div className="space-y-3">
                {(cat.limit ? cat.items.slice(0, cat.limit) : cat.items).map((l) => (
                  <a key={l.id} href={l.url} target="_blank" rel="noopener noreferrer" className="block">
                    <Button label={l.label} cfg={cfg} />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé */}
        <div className="text-center text-[10px] opacity-60 mt-8" style={{ color: cfg.palette.muted }}>
          {`/${page.slug}`}
        </div>
      </div>
    </div>
  );
}
