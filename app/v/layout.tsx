// app/v/layout.tsx
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function VLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
