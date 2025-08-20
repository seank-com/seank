# seank
Personal blog built with [Eleventy](https://www.11ty.dev/) v3.

## Quick Start

1. Install Node 22 LTS (recommended) using nvm (see below).
2. Clone and install dependencies:
   ```bash
   npm install
   ```
3. Start local dev server (with watch + reload):
   ```bash
   npm run serve
   ```
4. Open http://localhost:8080 (default Eleventy dev URL).

### Available Scripts

| Script | Purpose |
| ------ | ------- |
| `npm run serve` | Run Eleventy in watch/serve mode (development). |
| `npm run watch` | Watch & rebuild without the local web server. |
| `npm run build` | Production build (sets `NODE_ENV=production`) -> `_site` then copies to `docs` for Pages. |
| `npm run clean` | Remove previous build output directories (`_site`, `docs`). |
| `npm run lint` | Run JSHint across config, library, and source JS. Zero warnings policy. |

## Node Version Management (nvm)

Use nvm instead of the legacy `n` instructions previously in this README.

macOS / Linux (bash/zsh):
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# restart shell
nvm install 22
nvm use 22
```

Windows:
- Option 1 (recommended): Use [nvm-windows](https://github.com/coreybutler/nvm-windows) (independent implementation). After install:
  ```powershell
  nvm install 22
  nvm use 22
  ```
- Option 2: Use WSL + standard nvm (same steps as macOS/Linux inside WSL).

Check version:
```bash
node -v
```

### Github Actions

- [Checkout](https://github.com/marketplace/actions/checkout)
- [Setup Node.js environment](https://github.com/marketplace/actions/setup-node-js-environment)
- [Cache Node.js modules](https://github.com/marketplace/actions/cache)
- [GitHub Pages action](https://github.com/marketplace/actions/github-pages-action)
- Special thanks to [jekyll-cd](https://github.com/victoriadrake/jekyll-cd/) who clued me into the possibility of deploying this way.

### Other Notes

- Finally a straight answer on how to [configure custom domains with HTTPS](https://www.devdiaries.net/blog/How-to-set-up-custom-domain-for-Github-Pages-with-HTTPS/) support for GitHub pages.

### current line of inquiry

- [Eleventy Documentation](https://www.11ty.dev/docs/collections/#how-to-exclude-content-from-collections)
- [RSS PLUGIN](https://www.11ty.dev/docs/plugins/rss/)
- [Eleventy and Github pages](https://www.linkedin.com/pulse/eleventy-github-pages-lea-tortay/)

### Other resources

* [UIKit](https://getuikit.com/docs/alert)
* [Eleventy](https://www.11ty.dev/docs/)
* [vredeburg](https://github.com/dafiulh/vredeburg) [demo](https://vredeburg.netlify.app/)
* [About custom domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
* [Debugging Eleventy](https://griffadev.medium.com/tips-for-debugging-in-11ty-aca887d2c66e)

## Project Structure Highlights

```
src/                Source content (markdown, nunjucks, assets)
  assets/           Static assets (copied through)
  posts/            Blog posts (markdown named YYYY-MM-DD-slug.md)
lib/                Custom filters, transforms, collections
.eleventy.js        Eleventy configuration
.github/workflows/  CI (PR) + CD (deploy) workflows
```

## Image Paths Convenience

In markdown you can write:
```markdown
![Alt text](img/example.jpg)
```
A post‑render transform rewrites `<img src="img/...">` to `/assets/img/...` so the output will reference the correct deployed path. Place images under `src/posts/img/` or `src/assets/img/`.

## Lint & Quality Gates

Run `npm run lint` before committing. The repo treats warnings as failures: fix or very narrowly justify with an inline JSHint directive comment. See the collaboration contract in `.github/copilot-instructions.md` for the full checklist (lint, audit, build) prior to rebasing & fast‑forwarding to `main`.

## CI / CD

Two GitHub Actions workflows:
- `eleventy-ci.yml`: Runs on pull requests (Node 20 & 22 matrix) – install, lint, build.
- `eleventy-cd.yml`: Runs on push to `main` (Node 22) – builds and deploys the `docs` directory to GitHub Pages.

Caching and concurrency keep builds fast and avoid overlapping deploys.

## Building for Production

```bash
npm run build
```
Outputs production site to `_site` then copies to `docs/` (GitHub Pages publishing source). HTML & JS are minified in production only.

## Debugging

JavaScript (filters, transforms, config):
1. Open a VS Code "JavaScript Debug Terminal".
2. Run `npm run serve` (the process starts under the debugger).
3. Set breakpoints in files inside `lib/` or in `.eleventy.js`.
4. Use `console.log` for quick inspection. (Temporary `debugger;` statements are fine locally; remove them before committing to satisfy lint.)

Templates / Data: Add temporary output in Nunjucks, e.g.:
```njk
<pre>{{ pagination | safe }}</pre>
```
(Remove after inspection; large objects may render verbosely.)

## Adding a Post

1. Create `src/posts/YYYY-MM-DD-your-slug.md`.
2. Include front matter, e.g.:
   ```markdown
   ---
   title: My New Post
   description: Short summary.
   tags: [note]
   ---
   Content here.
   ```
3. Optional images: put under `src/posts/img/` and reference via `img/your-image.jpg`.

## Conventions & Workflow

- Linear history: rebase feature branches on `main` before fast‑forward merge.
- Security: keep `npm audit` clean (or document any unavoidable exception).
- Production build uses `NODE_ENV=production` (set by the wrapper script).
- See `.github/copilot-instructions.md` for detailed collaboration contract.

## Troubleshooting

| Issue | Resolution |
| ----- | ---------- |
| Node version error | Ensure `nvm use 22` (or install 22 LTS). |
| Lint fails on globals | Verify globals list in `.jshintrc` or add a very narrow inline directive. |
| Images 404 after deploy | Confirm you used `img/` relative path and placed files under `src/posts/img/` or `src/assets/img/`. |
| Build missing special files (`CNAME`, `.nojekyll`) | These are handled as templates (`*.njk`) with `eleventyAllowMissingExtension: true`; ensure you didn't rename them. |

## License

MIT
