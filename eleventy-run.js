#!/usr/bin/env node
"use strict";
/* Cross-platform Eleventy runner that sets NODE_ENV and forwards args. */
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const env = Object.assign({}, process.env, {
  NODE_ENV: args.includes('--prod') ? 'production' : 'development'
});
const filtered = args.filter(a => a !== '--prod');

function findPackageRootFromResolvedFile(resolvedFile, expectedPackageName) {
  let currentDir = path.dirname(resolvedFile);
  while (true) {
    const pkgPath = path.join(currentDir, 'package.json');
    if (fs.existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        if (!expectedPackageName || pkg.name === expectedPackageName) {
          return currentDir;
        }
      } catch (error) {
        // ignore and keep walking
      }
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      return null;
    }
    currentDir = parentDir;
  }
}

function resolveEleventyCliPath() {
  let eleventyMain;
  try {
    eleventyMain = require.resolve('@11ty/eleventy');
  } catch (error) {
    throw new Error(`Unable to resolve @11ty/eleventy. Is it installed? Original error: ${error && error.message ? error.message : String(error)}`);
  }

  const eleventyRoot = findPackageRootFromResolvedFile(eleventyMain, '@11ty/eleventy');
  if (!eleventyRoot) {
    throw new Error('Unable to locate @11ty/eleventy package root directory.');
  }

  const candidatePaths = [
    path.join(eleventyRoot, 'cmd.cjs'),
    path.join(eleventyRoot, 'cmd.js'),
  ];

  for (const candidatePath of candidatePaths) {
    if (fs.existsSync(candidatePath)) {
      return candidatePath;
    }
  }

  throw new Error('Unable to locate Eleventy CLI entrypoint (cmd.cjs/cmd.js) inside @11ty/eleventy.');
}

const eleventyCliPath = resolveEleventyCliPath();
const child = spawn(process.execPath, [eleventyCliPath, ...filtered], {
  stdio: 'inherit',
  env,
  shell: false,
  windowsHide: true,
  cwd: process.cwd(),
});
child.on('exit', code => process.exit(code));
