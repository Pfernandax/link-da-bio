"use client";
export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const runtime = 'edge';

import { redirect } from 'next/navigation';

export default function Page({ params }: { params: { data: string } }) {
  // Encaminha para o leitor público que usa ?d=...
  redirect(`/v?d=${encodeURIComponent(params.data)}`);
}
