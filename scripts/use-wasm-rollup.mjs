// -----------------------------------------------------------------------------
//  Conserto automático para máquinas que bloqueiam binários nativos (WDAC /
//  "Application Control policy"). Roda sozinho no postinstall.
//
//  - Em máquina normal / Vercel / Linux: o Rollup nativo carrega, e este script
//    NÃO faz nada.
//  - Em máquina com o binário nativo bloqueado: ele troca o Rollup nativo pela
//    versão em WebAssembly (@rollup/wasm-node), e o "npm run dev" volta a funcionar.
// -----------------------------------------------------------------------------
import { createRequire } from "module";
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";

const require = createRequire(import.meta.url);

try {
  // Resolve pelo package.json (sempre exportado) para contornar o "exports" do pacote.
  const rollupDir = dirname(require.resolve("rollup/package.json"));
  const nativePath = join(rollupDir, "dist", "native.js");
  const conteudo = readFileSync(nativePath, "utf8");

  // Já aplicado antes (marcador exclusivo deste patch, não existe no arquivo original).
  if (conteudo.includes("use-wasm-rollup")) {
    process.exit(0);
  }

  try {
    // Tenta carregar o Rollup nativo.
    require(nativePath);
    // Carregou: máquina normal, não precisa fazer nada.
  } catch (erro) {
    const bloqueado =
      erro?.code === "ERR_DLOPEN_FAILED" ||
      /Application Control|dlopen/i.test(String(erro?.message));
    if (!bloqueado) process.exit(0);

    // Garante que o pacote WASM está instalado.
    require.resolve("@rollup/wasm-node/dist/native.js");

    writeFileSync(
      nativePath,
      "// Substituído automaticamente por scripts/use-wasm-rollup.mjs\n" +
        "// (esta máquina bloqueia binários nativos — usando a versão WebAssembly).\n" +
        "module.exports = require('@rollup/wasm-node/dist/native.js');\n"
    );
    console.log(
      "[use-wasm-rollup] Rollup nativo bloqueado nesta máquina -> usando a versão WebAssembly."
    );
  }
} catch {
  // Se algo der errado, não quebra o install.
  process.exit(0);
}
