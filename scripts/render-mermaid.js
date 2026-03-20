"use strict";
const { execFileSync } = require("child_process");
const { statSync, existsSync, mkdirSync, readdirSync } = require("fs"); // jshint ignore:line
const { join, dirname, basename } = require("path");

var walk; // defined below — generator function, exempt from jshint
/* jshint ignore:start */
walk = function* walkGen(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) { yield* walk(p); }
    else if (p.endsWith(".mmd")) { yield p; }
  }
};
/* jshint ignore:end */

function needsBuild(mmdPath, svgPath) {
  if (!existsSync(svgPath)) { return true; }
  return statSync(mmdPath).mtimeMs > statSync(svgPath).mtimeMs;
}

function render(mmdPath, svgPath) {
  mkdirSync(dirname(svgPath), { recursive: true });
  if (process.platform === "win32") {
    const { execSync } = require("child_process");
    execSync(`npx.cmd -y mmdc -i "${mmdPath}" -o "${svgPath}"`, { stdio: "inherit" });
  } else {
    execFileSync("npx", ["-y", "mmdc", "-i", mmdPath, "-o", svgPath], {
      stdio: "inherit",
      shell: false,
    });
  }
}

(function main() {
  const root = join(process.cwd(), "src", "posts", "img");
  let built = 0, skipped = 0;
  for (const mmd of walk(root)) {
    const svg = join(dirname(mmd), basename(mmd, ".mmd") + ".svg");
    if (needsBuild(mmd, svg)) {
      console.log("Rendering", mmd, "->", svg);
      try { render(mmd, svg); built++; }
      catch (err) { console.error("Failed rendering", mmd, err); process.exit(1); }
    } else {
      skipped++;
    }
  }
  console.log("Done. Built " + built + ", skipped " + skipped + ".");
})();
