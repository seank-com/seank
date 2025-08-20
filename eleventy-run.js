#!/usr/bin/env node
"use strict";
/* Cross-platform Eleventy runner that sets NODE_ENV and forwards args. */
const { spawn } = require('child_process');

const args = process.argv.slice(2);
const env = Object.assign({}, process.env, {
  NODE_ENV: args.includes('--prod') ? 'production' : 'development'
});
const filtered = args.filter(a => a !== '--prod');

const child = spawn('npx', ['eleventy', ...filtered], { stdio: 'inherit', shell: true, env });
child.on('exit', code => process.exit(code));
