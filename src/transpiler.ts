const libs = [
  "/solc/soljson-v0.4.26+commit.4563c3fc.js",
  "/solc/soljson-v0.5.11+commit.c082d0b4.js",
  "/solc/sol_wrapper.js",
  "/sol2ligo.js",
].map((item) => `${process.env.PUBLIC_URL || ""}${item}`);

const cache = new Map<string, HTMLScriptElement>(); // naive tracking of loaded scripts for HMR
const body = document.getElementsByTagName("body")[0];

const loadScriptTag = (src: string): Promise<HTMLScriptElement> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (cache.has(src)) {
        return resolve(cache.get(src)!);
      }

      const tag = document.createElement("script");
      tag.addEventListener("load", () => {
        cache.set(src, tag);
        resolve(tag);
      });

      tag.addEventListener("error", () => reject());
      tag.type = "text/javascript";
      tag.src = src;

      body.appendChild(tag);
    }, 0);
  });

export const loadTranspilerResources = async () => {
  for (const lib of libs) {
    await loadScriptTag(lib);
  }
};
