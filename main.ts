// The Dog Reviews the Mailman - make.fun bounty entry.
// Writes one funny one-line review a dog gives the mailman to
// (MAKEFUN_OUTPUT_DIR ?? "/output")/entry.txt. Gate: 1-200 characters,
// single line, not only white space.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "One star. Brings bills, never brings treats, and still expects me to guard the house he keeps breaking into.";

function main(): void {
  if (LINE.length < 1 || LINE.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("line must be a single line");
  }
  if (LINE.trim().length === 0) {
    throw new Error("line must not be only white space");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE + "\n", "utf8");
  // Read back what was written and confirm it matches the validated line.
  const written = readFileSync(outPath, "utf8");
  if (written !== LINE + "\n") {
    throw new Error("read-back mismatch: entry.txt does not match the line");
  }
}

main();
