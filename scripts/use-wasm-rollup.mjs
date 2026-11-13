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
    // Carregou: máquina normal (inclui Vercel/Linux com o binário certo) -> nada a fazer.
  } catch {
    // O Rollup nativo não carregou. Dois casos conhecidos, ambos resolvidos com WASM:
    //  - WDAC / Application Control bloqueia o binário nativo (máquina do dev);
    //  - o binário nativo da plataforma não foi instalado (bug do npm com
    //    dependência opcional quando o package-lock vem de outro SO — acontece
    //    no build da Vercel/CI).
    // A versão WebAssembly funciona em qualquer plataforma, então caímos nela.
    require.resolve("@rollup/wasm-node/dist/native.js");

    writeFileSync(
      nativePath,
      "// Substituído automaticamente por scripts/use-wasm-rollup.mjs\n" +
        "// (Rollup nativo indisponível aqui — usando a versão WebAssembly).\n" +
        "module.exports = require('@rollup/wasm-node/dist/native.js');\n"
    );
    console.log(
      "[use-wasm-rollup] Rollup nativo indisponivel -> usando a versao WebAssembly."
    );
  }
} catch {
  // Se algo der errado, não quebra o install.
  process.exit(0);
}
