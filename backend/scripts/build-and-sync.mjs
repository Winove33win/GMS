#!/usr/bin/env node
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.join(__dirname, "..", "..");
const FRONT = path.join(ROOT, "frontend");
const FRONT_DIST = path.join(FRONT, "dist");
const BACK = path.join(ROOT, "backend");
const BACK_DIST = (() => {
  const target = process.env.SSR_DIST_DIR;
  if (!target) return path.join(BACK, "dist");
  return path.isAbsolute(target) ? target : path.join(BACK, target);
})();

const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";

const shouldSkipInstall = () => {
  const args = new Set(process.argv.slice(2));
  if (args.has("--skip-install")) return true;
  const checks = [
    "BYPASS_FRONTEND_INSTALL",
    "SKIP_FRONTEND_INSTALL",
    "CI_SKIP_FRONTEND_INSTALL"
  ];
  return checks.some((key) => {
    const value = process.env[key];
    return typeof value === "string" && ["1", "true", "yes"].includes(value.toLowerCase());
  });
};

function sh(cmd, args, cwd = ROOT) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd, stdio: "inherit" });
    child.on("close", (code) => {
      if (code === 0) return resolve();
      reject(new Error(`${cmd} ${args.join(" ")} -> ${code}`));
    });
  });
}

async function copyDir(src, dst) {
  await fsp.rm(dst, { recursive: true, force: true });
  await fsp.mkdir(dst, { recursive: true });

  if (process.platform === "win32") {
    await sh("xcopy", ["/E", "/I", "/Y", src, dst], path.dirname(src));
  } else {
    await sh("cp", ["-r", `${src}/`, `${dst}/`], path.dirname(src));
  }
}

(async () => {
  try {
    console.log("▶ build-and-sync");

    if (!shouldSkipInstall()) {
      try {
        await sh(npmCmd, ["ci", "--no-audit", "--prefer-offline"], FRONT);
      } catch (err) {
        console.warn("npm ci falhou, tentando npm install", err.message);
        await sh(npmCmd, ["install"], FRONT);
      }
    } else {
      console.log("(build-and-sync) Skip install sinalizado");
    }

    await sh(npmCmd, ["run", "build"], FRONT);

    if (!fs.existsSync(FRONT_DIST)) {
      throw new Error("dist inexistente");
    }

    await copyDir(FRONT_DIST, BACK_DIST);
    console.log("✅ sync ok →", BACK_DIST);
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
})();
