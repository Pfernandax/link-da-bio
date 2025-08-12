// --------- GERAR LINK PÚBLICO (query string robusta) ---------
const encodePage = (p: PageConfig) => {
  const json = JSON.stringify(p);
  const b64 = btoa(String.fromCharCode(...new TextEncoder().encode(json)));
  return encodeURIComponent(b64);
};

const makeShareUrl = (p: PageConfig) => `${location.origin}/v?d=${encodePage(p)}`;

const publish = () => {
  const url = makeShareUrl(page);
  navigator.clipboard.writeText(url).catch(() => {});
  window.open(url, "_blank");
  alert("Link público copiado para a área de transferência!");
};
// --------------------------------------------------------------
