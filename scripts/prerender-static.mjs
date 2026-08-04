import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dist = join(root, "dist");
const ssrEntry = join(root, "node_modules/.nitro/vite/services/ssr/index.js");

function getPrerenderPaths() {
  const postsContent = readFileSync(join(root, "src/lib/blog-posts.ts"), "utf8");
  const rawSection = postsContent.split("const rawPosts")[1]?.split("];")[0] ?? "";
  const slugs = [...rawSection.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
  return ["/", "/blog", ...slugs.map((slug) => `/blog/${slug}`)];
}

function outputFileForPath(path) {
  if (path === "/") return join(dist, "index.html");
  return join(dist, path.slice(1), "index.html");
}

async function main() {
  const paths = getPrerenderPaths();
  const { default: server } = await import(ssrEntry);

  for (const path of paths) {
    const response = await server.fetch(new Request(`https://cassinodesaopaulo.com.br${path}`));
    if (!response.ok) {
      throw new Error(`Falha ao pré-renderizar ${path}: HTTP ${response.status}`);
    }

    const html = await response.text();
    const outFile = outputFileForPath(path);
    mkdirSync(dirname(outFile), { recursive: true });
    writeFileSync(outFile, html, "utf8");
    console.log(`prerender: ${path} → ${outFile.replace(`${root}/`, "")}`);
  }

  const routesFile = join(dist, "_routes.json");
  const routes = JSON.parse(readFileSync(routesFile, "utf8"));
  const exclude = new Set(routes.exclude ?? []);

  for (const path of paths) {
    exclude.add(path);
  }

  routes.exclude = [...exclude].sort();
  writeFileSync(routesFile, `${JSON.stringify(routes, null, 2)}\n`, "utf8");
  console.log(`_routes.json atualizado (${paths.length} rotas excluídas do Worker)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
