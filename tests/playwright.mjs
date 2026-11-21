import { execFileSync } from "node:child_process";
import { globSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

const cache = execFileSync("npm", ["config", "get", "cache"], { encoding: "utf8" }).trim();
const pacote = globSync(join(cache, "_npx/*/node_modules/@playwright/test/package.json"))[0];
export const { chromium } = pacote
  ? createRequire(pacote)("playwright")
  : createRequire(import.meta.url)("playwright");
