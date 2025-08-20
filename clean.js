#!/usr/bin/env node
// Cross-platform clean: remove Eleventy output directories.
// Adjust array if additional build output dirs are added.
const fs = require('fs');
const path = require('path');

const targets = ['_site', 'docs'];

for (const dir of targets) {
  const p = path.join(__dirname, dir);
  if (fs.existsSync(p)) {
    try {
      fs.rmSync(p, { recursive: true, force: true });
      console.log(`Removed ${dir}`);
    } catch (e) {
      console.error(`Failed to remove ${dir}:`, e.message);
      process.exitCode = 1;
    }
  } else {
    console.log(`Skip ${dir} (not found)`);
  }
}
