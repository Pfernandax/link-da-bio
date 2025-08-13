// app/v/layout.tsx  (Server Component)
export const runtime = "edge";          // exigido pelo next-on-pages
export const dynamic = "force-dynamic"; // garante execução dinâmica
export const revalidate = 0;

export default function VLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
