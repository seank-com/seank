#!/usr/bin/env node
/* Cross-platform Eleventy runner that sets NODE_ENV and forwards args.
   Usage examples:
     node eleventy-run.js --serve
     node eleventy-run.js --watch
     node eleventy-run.js --prod --output=docs
*/
const { spawn } = require('child_process');

const args = process.argv.slice(2);
let env = { ...process.env };
if (args.includes('--prod')) {
  env.NODE_ENV = 'production';
} else {
  env.NODE_ENV = 'development';
}
// Remove our custom flag before passing to eleventy
const filtered = args.filter(a => a !== '--prod');

const child = spawn('npx', ['eleventy', ...filtered], { stdio: 'inherit', shell: true, env });
child.on('exit', code => process.exit(code));
