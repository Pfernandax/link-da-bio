const encodePage = (p: PageConfig) =>
  encodeURIComponent(btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(p)))));

const makeShareUrl = (p: PageConfig) => {
  const url = new URL("/v", window.location.origin);
  url.searchParams.set("d", encodePage(p));
  return url.toString();
};

const publish = () => {
  const url = makeShareUrl(page);
  navigator.clipboard.writeText(url).catch(() => {});
  window.open(url, "_blank");
  alert("Link público copiado!");
};
