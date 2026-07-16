import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const outputDirectory = resolve("out");

await mkdir(outputDirectory, { recursive: true });
await Promise.all([
  writeFile(resolve(outputDirectory, ".nojekyll"), ""),
  writeFile(resolve(outputDirectory, "CNAME"), "www.creativebrandinteractive.com\n"),
]);
