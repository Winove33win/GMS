import fs from "node:fs";
import path from "node:path";
import https from "node:https";

const root = path.resolve(process.cwd(), "./");
const manifestPath = path.join(root, "assets.manifest.json");

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function download(url, dest) {
  return new Promise((ok, fail) => {
    const f = fs.createWriteStream(dest);
    https
      .get(url, (r) => {
        if (r.statusCode !== 200) return fail(new Error(`GET ${url} -> ${r.statusCode}`));
        r.pipe(f);
        f.on("finish", () => f.close(ok));
      })
      .on("error", (e) => {
        fs.unlink(dest, () => fail(e));
      });
  });
}

function readParts(files) {
  return files
    .map((f) => fs.readFileSync(path.join(root, f), "utf8").trim())
    .join("");
}

async function run() {
  if (!fs.existsSync(manifestPath)) {
    console.warn("[assets] manifest not found. skip.");
    return;
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  for (const entry of manifest.assets) {
    const out = path.join(root, entry.out);
    ensureDir(path.dirname(out));
    if (entry.b64 || entry.parts) {
      const b64 = entry.b64 || readParts(entry.parts);
      const buf = Buffer.from(b64, "base64");
      fs.writeFileSync(out, buf);
      console.log(`[assets] wrote ${entry.out} (${buf.length} bytes)`);
      continue;
    }
    if (entry.url) {
      await download(entry.url, out);
      console.log(`[assets] downloaded ${entry.url} -> ${entry.out}`);
      continue;
    }
    console.warn(`[assets] skipped ${entry.out} (no b64, parts or url)`);
  }
}

run().catch((e) => {
  console.error("[assets] error:", e);
  process.exit(1);
});
