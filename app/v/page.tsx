"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

/** Os mesmos tipos simplificados do editor (apenas o que usamos aqui) */
type ThemeConfig = {
  background:{type:"color"|"gradient"|"image"; value:string};
  palette:{text:string; accent:string; muted:string; card:string};
  button:{variant:"solid"|"outline"|"ghost"; radius:number; shadow:"none"|"soft"|"lg"};
};
type LinkItem   = { id:string; label:string; url:string; icon?:string };
type Category   = { id:string; title:string; limit?:number; items:LinkItem[] };
type SocialLink = { id:string; type:string; url:string };
type PageConfig = {
  slug:string; title:string; bio?:string; avatar?:{src?:string};
  theme:ThemeConfig; socials:SocialLink[]; categories:Category[]; topLinks:{id:string;label:string;url:string}[];
};

function decodePageParam(b64Uri:string): PageConfig | null {
  try {
    const b64   = decodeURIComponent(b64Uri);
    const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    const json  = new TextDecoder().decode(bytes);
    return JSON.parse(json) as PageConfig;
  } catch { return null; }
}

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
        </div>
      </div>
    );
  }

  const cfg = page.theme;

  return (
    <div className="min-h-screen" style={{ background: cfg.background.value, color: cfg.palette.text }}>
      <div className="max-w-xl mx-auto px-4 pt-8 pb-16">
        <div className="text-center mb-5">
          <div className="w-28 h-28 rounded-full mx-auto mb-3 border border-white/20 overflow-hidden"
               style={{ background:"rgba(255,255,255,.12)" }}>
            {page.avatar?.src && <img src={page.avatar.src} alt="avatar" className="w-full h-full object-cover" />}
          </div>
          <h1 className="text-2xl font-extrabold">{page.title}</h1>
          {page.bio && <p className="text-sm" style={{ color: cfg.palette.muted }}>{page.bio}</p>}
        </div>

        <div className="space-y-6">
          {page.categories.map(cat => (
            <div key={cat.id}>
              <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: cfg.palette.muted }}>{cat.title}</div>
              <div className="space-y-3">
                {(cat.limit ? cat.items.slice(0, cat.limit) : cat.items).map(l => (
                  <a key={l.id} href={l.url} target="_blank" className="block">
                    <button
                      className={"w-full font-semibold px-4 py-3 border transition-transform active:translate-y-px "+
                        (cfg.button.variant==="ghost" ? "hover:bg-white/10" : "hover:opacity-90")}
                      style={{
                        borderRadius: cfg.button.radius,
                        color: cfg.button.variant==="solid" ? "#0b1020" : cfg.palette.accent,
                        backgroundColor: cfg.button.variant==="solid" ? cfg.palette.accent : "transparent",
                        borderColor: cfg.button.variant==="outline" ? cfg.palette.accent : "transparent",
                        boxShadow: cfg.button.shadow==="none" ? "none" :
                                   cfg.button.shadow==="soft" ? "0 8px 24px rgba(0,0,0,.25)" : "0 12px 36px rgba(0,0,0,.35)"
                      }}>
                      {l.label}
                    </button>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-[10px] opacity-60 mt-8" style={{ color: cfg.palette.muted }}>
          {`/${page.slug}`}
        </div>
      </div>
    </div>
  );
}
