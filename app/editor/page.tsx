"use client";
import React, { useMemo, useState } from "react";

/* ===================== Tipos ===================== */
export type SocialIcon =
  | "instagram" | "whatsapp" | "youtube" | "tiktok" | "telegram" | "x" | "facebook" | "site" | "email";

export type ThemeConfig = {
  background: { type: "color" | "gradient" | "image"; value: string };
  palette: { text: string; accent: string; muted: string; card: string };
  button: { variant: "solid" | "outline" | "ghost"; radius: number; shadow: "none" | "soft" | "lg" };
};

export type SocialLink = { id: string; type: SocialIcon; url: string };
export type LinkItem   = { id: string; label: string; url: string; icon?: SocialIcon };
export type Category   = { id: string; title: string; limit?: number; items: LinkItem[] };

export type PageConfig = {
  slug: string;
  title: string;
  bio?: string;
  avatar?: { src?: string };
  theme: ThemeConfig;
  socials: SocialLink[];
  categories: Category[];
  topLinks: { id: string; label: string; url: string }[];
};

/* ===================== Defaults ===================== */
const INITIAL_THEME: ThemeConfig = {
  background: { type: "color", value: "#0b1020" },
  palette: { text: "#e5e7eb", accent: "#22d3ee", muted: "#94a3b8", card: "#111827" },
  button: { variant: "solid", radius: 18, shadow: "soft" },
};

const INITIAL: PageConfig = {
  slug: "seu-slug",
  title: "Seu Nome",
  bio: "Bio curtinha de exemplo para contraste.",
  avatar: { src: "" },
  theme: INITIAL_THEME,
  socials: [
    { id: crypto.randomUUID(), type: "instagram", url: "https://instagram.com/seuusuario" },
    { id: crypto.randomUUID(), type: "whatsapp",  url: "https://wa.me/5500000000000" },
  ],
  topLinks: [
    { id: crypto.randomUUID(), label: "Portfólio", url: "#" },
    { id: crypto.randomUUID(), label: "Loja",     url: "#" },
  ],
  categories: [
    {
      id: crypto.randomUUID(),
      title: "Destaques",
      limit: 6,
      items: [
        { id: crypto.randomUUID(), label: "Fale comigo no WhatsApp", url: "#", icon: "whatsapp" },
        { id: crypto.randomUUID(), label: "Agende um horário",      url: "#", icon: "site" },
        { id: crypto.randomUUID(), label: "Me siga no Instagram",   url: "#", icon: "instagram" },
      ],
    },
  ],
};

const ICON_OPTIONS: { value: SocialIcon; label: string }[] = [
  { value: "instagram", label: "Instagram" },
  { value: "whatsapp",  label: "WhatsApp"  },
  { value: "youtube",   label: "YouTube"   },
  { value: "tiktok",    label: "TikTok"    },
  { value: "telegram",  label: "Telegram"  },
  { value: "x",         label: "X/Twitter" },
  { value: "facebook",  label: "Facebook"  },
  { value: "site",      label: "Site"      },
  { value: "email",     label: "E-mail"    },
];

/* ===================== UI utils ===================== */
function Section({ title, children }: React.PropsWithChildren<{ title: string }>) {
  return (
    <section className="bg-white/5 border border-white/10 rounded-2xl p-4">
      <h3 className="text-sm font-bold tracking-wide uppercase text-white/70 mb-3">{title}</h3>
      {children}
    </section>
  );
}
function Swatch({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3">
      <label className="w-28 text-sm text-white/80">{label}</label>
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-10 w-12 rounded" />
      <input className="flex-1 bg-black/20 border border-white/15 rounded-xl px-3 py-2 text-sm" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
function Radio<T extends string>({ label, value, options, onChange }:{ label:string; value:T; options:{value:T;label:string}[]; onChange:(v:T)=>void }) {
  return (
    <div className="space-y-2">
      <div className="text-sm text-white/80">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map(o => (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={"px-3 py-1.5 rounded-xl border text-sm " + (value===o.value ? "bg-white/15 border-white/25" : "bg-white/5 border-white/10 hover:bg-white/10")}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
function Slider({ label, min, max, step = 1, value, onChange, unit = "px" }:{ label:string; min:number; max:number; step?:number; value:number; unit?:string; onChange:(n:number)=>void }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm text-white/80">
        <span>{label}</span><span className="tabular-nums text-white/60">{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(parseInt(e.target.value))} className="w-full accent-white/80" />
    </div>
  );
}

/* ===================== Preview ===================== */
function ButtonPreview({ label, cfg }:{ label:string; cfg:ThemeConfig }) {
  const style: React.CSSProperties = useMemo(() => ({
    borderRadius: cfg.button.radius,
    color:        cfg.button.variant === "solid" ? "#0b1020" : cfg.palette.accent,
    background:   cfg.button.variant === "solid" ? cfg.palette.accent : "transparent",
    borderColor:  cfg.button.variant === "outline" ? cfg.palette.accent : "transparent",
    boxShadow:
      cfg.button.shadow === "none" ? "none" :
      cfg.button.shadow === "soft" ? "0 8px 24px rgba(0,0,0,.25)" :
                                     "0 12px 36px rgba(0,0,0,.35)",
  }), [cfg]);

  const cn = "w-full font-semibold px-4 py-3 border transition-transform active:translate-y-px " +
             (cfg.button.variant === "ghost" ? "hover:bg-white/10" : "hover:opacity-90");

  return <button className={cn} style={style}>{label}</button>;
}

function PhonePreview({ page }:{ page: PageConfig }) {
  const cfg = page.theme;
  const bgStyle: React.CSSProperties = useMemo(() => ({ background: cfg.background.value }), [cfg.background]);

  return (
    <div className="rounded-[40px] border border-white/10 bg-black/20 p-4 shadow-2xl w-[360px] mx-auto">
      <div className="rounded-3xl overflow-hidden" style={bgStyle}>
        {/* Top Links */}
        {page.topLinks.length > 0 && (
          <nav className="flex items-center justify-center gap-3 px-4 pt-4 text-xs" style={{ color: cfg.palette.muted }}>
            {page.topLinks.map(t => (
              <a key={t.id} href={t.url} target="_blank" className="hover:underline">{t.label}</a>
            ))}
          </nav>
        )}

        {/* Header */}
        <div className="p-6 text-center" style={{ color: cfg.palette.text }}>
          <div className="w-24 h-24 rounded-full bg-white/20 mx-auto mb-3 border border-white/20 overflow-hidden">
            {page.avatar?.src ? <img src={page.avatar.src} alt="avatar" className="w-full h-full object-cover" /> : null}
          </div>
          <h2 className="text-xl font-extrabold">{page.title}</h2>
          {page.bio && <p className="text-sm" style={{ color: cfg.palette.muted }}>{page.bio}</p>}
          {page.socials.length > 0 && (
            <div className="flex items-center justify-center gap-3 mt-3">
              {page.socials.map(s => (
                <a key={s.id} href={s.url} target="_blank" className="px-2 py-1 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 text-[11px] uppercase tracking-wide">
                  {s.type}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Categorias e Botões */}
        <div className="px-4 pb-6 space-y-6">
          {page.categories.map(cat => (
            <div key={cat.id}>
              <div className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: cfg.palette.muted }}>{cat.title}</div>
              <div className="space-y-3">
                {(cat.limit ? cat.items.slice(0, cat.limit) : cat.items).map(l => (
                  <a key={l.id} href={l.url} target="_blank" className="block">
                    <ButtonPreview label={l.label} cfg={cfg} />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-[10px] pb-5" style={{ color: cfg.palette.muted }}>
          {`seu.dominio.com/${page.slug}`}
        </div>
      </div>
    </div>
  );
}

/* ===================== Editor ===================== */
export default function EditorLinkBio() {
  const [page, setPage] = useState<PageConfig>(INITIAL);

  // mover item em array
  const move = <T,>(arr: T[], from: number, to: number) => {
    const copy = [...arr]; const [item] = copy.splice(from, 1); copy.splice(to, 0, item); return copy;
  };

  /* ------ GERAR LINK PÚBLICO (base64url) ------ */
  const encodePage = (p: PageConfig) => {
    const json = JSON.stringify(p);
    const bin  = new TextEncoder().encode(json);
    const b64  = btoa(String.fromCharCode(...bin));
    const b64url = b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
    return encodeURIComponent(b64url);
  };
  const makeShareUrl = (p: PageConfig) => {
    const url = new URL("/v", window.location.origin);
    url.searchParams.set("d", encodePage(p));
    return url.toString();
  };
  const publish = () => {
    const url = makeShareUrl(page);
    navigator.clipboard.writeText(url).catch(()=>{});
    window.open(url, "_blank");
    alert("Link público copiado!");
  };
  /* -------------------------------------------- */

  // helpers simples
  const updateTheme = (patch: Partial<ThemeConfig>) =>
    setPage(p => ({ ...p, theme: { ...p.theme, ...patch } }));

  const addTopLink = () =>
    setPage(p => ({ ...p, topLinks: [...p.topLinks, { id: crypto.randomUUID(), label: "Novo", url: "#" }] }));
  const rmTopLink = (id: string) =>
    setPage(p => ({ ...p, topLinks: p.topLinks.filter(t => t.id !== id) }));

  const addSocial = () =>
    setPage(p => ({ ...p, socials: [...p.socials, { id: crypto.randomUUID(), type: "site", url: "#" }] }));
  const rmSocial = (id: string) =>
    setPage(p => ({ ...p, socials: p.socials.filter(s => s.id !== id) }));

  const addCategory = () =>
    setPage(p => ({ ...p, categories: [...p.categories, { id: crypto.randomUUID(), title: "Nova categoria", limit: 6, items: [] }] }));
  const rmCategory = (id: string) =>
    setPage(p => ({ ...p, categories: p.categories.filter(c => c.id !== id) }));

  const addLink = (catId: string) =>
    setPage(p => ({
      ...p,
      categories: p.categories.map(c =>
        c.id === catId
          ? { ...c, items: [...c.items, { id: crypto.randomUUID(), label: "Novo link", url: "#", icon: "site" }] }
          : c
      ),
    }));
  const rmLink = (catId: string, id: string) =>
    setPage(p => ({
      ...p,
      categories: p.categories.map(c =>
        c.id === catId ? { ...c, items: c.items.filter(i => i.id !== id) } : c
      ),
    }));

  return (
    <div className="min-h-screen bg-[#0b1020] text-white">
      <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 xl:grid-cols-[520px_1fr] gap-6">
        {/* Controles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-2xl font-extrabold">Editor do Link da Bio</h1>
            <button onClick={publish} className="px-3 py-2 rounded-xl border bg-emerald-500/20 border-emerald-300/30 hover:bg-emerald-500/25 text-sm">
              Gerar link público
            </button>
          </div>
          <p className="text-white/70 text-sm">Personalize e publique. O link abre em <code>/v?d=...</code>.</p>

          <Section title="Identidade & URL">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm text-white/80">Título</label>
                <input className="w-full bg-black/20 border border-white/15 rounded-xl px-3 py-2 text-sm"
                  value={page.title} onChange={e=>setPage(p=>({...p,title:e.target.value}))}/>
              </div>
              <div>
                <label className="text-sm text-white/80">Slug</label>
                <input className="w-full bg-black/20 border border-white/15 rounded-xl px-3 py-2 text-sm"
                  value={page.slug} onChange={e=>setPage(p=>({...p,slug:e.target.value.toLowerCase().replace(/\s+/g,"-")}))}/>
              </div>
            </div>
            <div className="mt-2">
              <label className="text-sm text-white/80">Bio</label>
              <textarea rows={2} className="w-full bg-black/20 border border-white/15 rounded-xl px-3 py-2 text-sm"
                value={page.bio} onChange={e=>setPage(p=>({...p,bio:e.target.value}))}/>
            </div>
            <div className="mt-2">
              <label className="text-sm text-white/80">Avatar por URL (opcional)</label>
              <input className="w-full bg-black/20 border border-white/15 rounded-xl px-3 py-2 text-sm"
                placeholder="https://..." value={page.avatar?.src ?? ""}
                onChange={(e)=>setPage(p=>({...p, avatar:{ src:e.target.value }}))}/>
            </div>
          </Section>

          <Section title="Tema (cores, fundo, botões)">
            <div className="space-y-4">
              <div className="space-y-3">
                <Swatch label="Texto"  value={page.theme.palette.text}  onChange={(v)=>updateTheme({ palette:{...page.theme.palette, text:v  } })}/>
                <Swatch label="Suave"  value={page.theme.palette.muted} onChange={(v)=>updateTheme({ palette:{...page.theme.palette, muted:v } })}/>
                <Swatch label="Cartão" value={page.theme.palette.card}  onChange={(v)=>updateTheme({ palette:{...page.theme.palette, card:v  } })}/>
                <Swatch label="Acento" value={page.theme.palette.accent}onChange={(v)=>updateTheme({ palette:{...page.theme.palette, accent:v} })}/>
              </div>

              <div className="space-y-3">
                <Radio
                  label="Fundo: tipo"
                  value={page.theme.background.type}
                  options={[{value:"color",label:"Cor"},{value:"gradient",label:"Gradiente"},{value:"image",label:"Imagem"}]}
                  onChange={(v)=>updateTheme({ background:{...page.theme.background, type:v} })}
                />
                <input className="w-full bg-black/20 border border-white/15 rounded-xl px-3 py-2 text-sm"
                  placeholder={page.theme.background.type==="color" ? "#0b1020" :
                              page.theme.background.type==="gradient" ? "linear-gradient(135deg, #22d3ee, #a78bfa)" :
                              "url(https://...) center/cover no-repeat"}
                  value={page.theme.background.value}
                  onChange={(e)=>updateTheme({ background:{...page.theme.background, value:e.target.value} })}
                />
                {page.theme.background.type==="color" && (
                  <input type="color" className="h-10 w-12 rounded"
                    value={page.theme.background.value}
                    onChange={(e)=>updateTheme({ background:{...page.theme.background, value:e.target.value} })}/>
                )}
              </div>

              <div className="space-y-4">
                <Radio
                  label="Botão: tipo"
                  value={page.theme.button.variant}
                  options={[{value:"solid",label:"Solid"},{value:"outline",label:"Outline"},{value:"ghost",label:"Ghost"}]}
                  onChange={(v)=>updateTheme({ button:{...page.theme.button, variant:v} })}
                />
                <Slider label="Raio (bordas)" min={0} max={28} value={page.theme.button.radius}
                  onChange={(n)=>updateTheme({ button:{...page.theme.button, radius:n} })}/>
                <Radio
                  label="Sombra"
                  value={page.theme.button.shadow}
                  options={[{value:"none",label:"Sem"},{value:"soft",label:"Suave"},{value:"lg",label:"Forte"}]}
                  onChange={(v)=>updateTheme({ button:{...page.theme.button, shadow:v} })}
                />
              </div>
            </div>
          </Section>

          <Section title="Links de topo">
            <div className="space-y-3">
              {page.topLinks.map((t,i)=>(
                <div key={t.id} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                  <input className="bg-black/20 border border-white/15 rounded-xl px-3 py-2 text-sm"
                    value={t.label} onChange={e=>setPage(p=>({...p, topLinks:p.topLinks.map(x=>x.id===t.id?{...x,label:e.target.value}:x)}))} placeholder="Rótulo"/>
                  <input className="bg-black/20 border border-white/15 rounded-xl px-3 py-2 text-sm"
                    value={t.url} onChange={e=>setPage(p=>({...p, topLinks:p.topLinks.map(x=>x.id===t.id?{...x,url:e.target.value}:x)}))} placeholder="https://..."/>
                  <div className="flex gap-1">
                    <button className="px-2 py-1 rounded-lg border bg-white/5" disabled={i===0} onClick={()=>setPage(p=>({...p, topLinks:move(p.topLinks,i,i-1)}))}>↑</button>
                    <button className="px-2 py-1 rounded-lg border bg-white/5" disabled={i===page.topLinks.length-1} onClick={()=>setPage(p=>({...p, topLinks:move(p.topLinks,i,i+1)}))}>↓</button>
                    <button className="px-2 py-1 rounded-lg border bg-white/5" onClick={()=>rmTopLink(t.id)}>✕</button>
                  </div>
                </div>
              ))}
              <button className="mt-1 px-3 py-2 rounded-xl border bg-white/5" onClick={addTopLink}>+ Adicionar</button>
            </div>
          </Section>

          <Section title="Ícones sociais">
            <div className="space-y-3">
              {page.socials.map(s=>(
                <div key={s.id} className="grid grid-cols-[150px_1fr_auto] gap-2 items-center">
                  <select className="bg-black/20 border border-white/15 rounded-xl px-3 py-2 text-sm"
                    value={s.type} onChange={e=>setPage(p=>({...p, socials:p.socials.map(x=>x.id===s.id?{...x,type:e.target.value as SocialIcon}:x)}))}>
                    {ICON_OPTIONS.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <input className="bg-black/20 border border-white/15 rounded-xl px-3 py-2 text-sm"
                    value={s.url} onChange={e=>setPage(p=>({...p, socials:p.socials.map(x=>x.id===s.id?{...x,url:e.target.value}:x)}))} placeholder="https://..."/>
                  <button className="px-2 py-1 rounded-lg border bg-white/5" onClick={()=>rmSocial(s.id)}>✕</button>
                </div>
              ))}
              <button className="mt-1 px-3 py-2 rounded-xl border bg-white/5" onClick={addSocial}>+ Adicionar ícone</button>
            </div>
          </Section>

          <Section title="Categorias & links">
            <div className="space-y-5">
              {page.categories.map((cat,ci)=>(
                <div key={cat.id} className="bg-white/5 border border-white/10 rounded-2xl p-3">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <input className="bg-black/20 border border-white/15 rounded-xl px-3 py-2 text-sm flex-1"
                      value={cat.title} onChange={e=>setPage(p=>({...p, categories:p.categories.map(c=>c.id===cat.id?{...c,title:e.target.value}:c)}))}/>
                    <div className="flex items-center gap-2">
                      <label className="text-xs opacity-80">Mostrar até</label>
                      <input type="number" min={1} className="w-16 bg-black/20 border border-white/15 rounded-xl px-2 py-1 text-sm"
                        value={cat.limit ?? 6} onChange={e=>setPage(p=>({...p, categories:p.categories.map(c=>c.id===cat.id?{...c,limit:Math.max(1,parseInt(e.target.value||"1"))}:c)}))}/>
                      <button className="px-2 py-1 rounded-lg border bg-white/5" disabled={ci===0} onClick={()=>setPage(p=>({...p, categories:move(p.categories,ci,ci-1)}))}>↑</button>
                      <button className="px-2 py-1 rounded-lg border bg-white/5" disabled={ci===page.categories.length-1} onClick={()=>setPage(p=>({...p, categories:move(p.categories,ci,ci+1)}))}>↓</button>
                      <button className="px-2 py-1 rounded-lg border bg-white/5" onClick={()=>rmCategory(cat.id)}>✕</button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {cat.items.map((l,li)=>(
                      <div key={l.id} className="grid grid-cols-[1fr_1fr_150px_auto] gap-2 items-center">
                        <input className="bg-black/20 border border-white/15 rounded-xl px-3 py-2 text-sm"
                          value={l.label} onChange={e=>setPage(p=>({...p, categories:p.categories.map(c=>c.id===cat.id?{...c,items:c.items.map(x=>x.id===l.id?{...x,label:e.target.value}:x)}:c)}))} placeholder="Rótulo"/>
                        <input className="bg-black/20 border border-white/15 rounded-xl px-3 py-2 text-sm"
                          value={l.url} onChange={e=>setPage(p=>({...p, categories:p.categories.map(c=>c.id===cat.id?{...c,items:c.items.map(x=>x.id===l.id?{...x,url:e.target.value}:x)}:c)}))} placeholder="https://..."/>
                        <select className="bg-black/20 border border-white/15 rounded-xl px-3 py-2 text-sm"
                          value={l.icon ?? "site"} onChange={e=>setPage(p=>({...p, categories:p.categories.map(c=>c.id===cat.id?{...c,items:c.items.map(x=>x.id===l.id?{...x,icon:e.target.value as SocialIcon}:x)}:c)}))}>
                          {ICON_OPTIONS.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                        <div className="flex gap-1 justify-end">
                          <button className="px-2 py-1 rounded-lg border bg-white/5" disabled={li===0} onClick={()=>setPage(p=>({...p, categories:p.categories.map(c=>c.id===cat.id?{...c,items:move(c.items,li,li-1)}:c)}))}>↑</button>
                          <button className="px-2 py-1 rounded-lg border bg-white/5" disabled={li===cat.items.length-1} onClick={()=>setPage(p=>({...p, categories:p.categories.map(c=>c.id===cat.id?{...c,items:move(c.items,li,li+1)}:c)}))}>↓</button>
                          <button className="px-2 py-1 rounded-lg border bg-white/5" onClick={()=>rmLink(cat.id, l.id)}>✕</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="mt-2 px-3 py-2 rounded-xl border bg-white/5" onClick={()=>addLink(cat.id)}>+ Adicionar link</button>
                </div>
              ))}

              <button className="px-3 py-2 rounded-xl border bg-white/5" onClick={addCategory}>+ Adicionar categoria</button>
            </div>
          </Section>
        </div>

        {/* Preview */}
        <div className="grid place-items-center">
          <PhonePreview page={page} />
        </div>
      </div>
    </div>
  );
}
