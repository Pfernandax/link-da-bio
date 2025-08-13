export const runtime = 'edge';

import { redirect } from 'next/navigation';

export default function Page({ params }: { params: { data: string } }) {
  // Encaminha para o leitor público que usa ?d=...
  redirect(`/v?d=${encodeURIComponent(params.data)}`);
}
