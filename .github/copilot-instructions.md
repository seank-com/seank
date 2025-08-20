# Project Collaboration Contract (Assistant Guidance)

Location: `.github/copilot-instructions.md` (kept out of published site via `.eleventyignore`).

## Dependency and Library Practices
- Use `npm install/uninstall --save-dev` (or `--save`)—avoid manual `package.json` edits.
- Add new libraries only with clear benefit (security, reliability, productivity). State rationale first.
- Remove experimental or abandoned dependencies promptly.
- Keep Eleventy on the current maintained major; review release notes before bumping majors.

## Security and Audits
- Run `npm audit` after dependency changes.
- Apply `npm audit fix` for safe patches; replace or document residual vulnerabilities.
- Prefer maintained forks over unmaintained vulnerable packages (e.g. `html-minifier-terser` vs `html-minifier`).

## Linting and Code Quality
- `npm run lint` must pass with zero warnings (warnings treated as failures).
- Any intentional exception must be justified inline with a code comment.
- Centralize lint rules in `.jshintrc`—don’t scatter inline directives unless narrowly scoped.

## Build and Environment
- Node: target active LTS (currently 22); CI matrix also tests previous LTS (20).
- Use Node scripts for cross‑platform tasks (e.g. `clean.js`); avoid shell-specific commands.
- Production build: `npm run build` sets `NODE_ENV=production` via `eleventy-run.js` wrapper.

## Eleventy Conventions
- Files without extensions (e.g., `CNAME`, `.nojekyll`) include `eleventyAllowMissingExtension: true`.
- Markdown image paths may use `img/...`; transform rewrites to `/assets/img/...` in output.
- Production-only transforms/filters guard with `process.env.NODE_ENV === 'production'`.

## Workflow: Branching, History, and Integration
- Maintain a linear history: prefer `git rebase` over merge commits for feature branches.
- Rebase interactive (`git rebase -i main`) to squash/fixup before pushing for review.
- Avoid force-pushing to `main`; force-push only to personal feature branches during refinement.
- Keep feature branches focused and short-lived.

## CI/CD
- CD workflow deploys on push to `main` (Node 22).
- CI workflow validates PRs (Node 20, 22): install, lint, build.
- Concurrency prevents overlapping deploy deployments.

## Commit Hygiene
- Use conventional style (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `perf:`, `test:`).
- Scope commit messages to a single logical change; rebase-squash noisy WIP commits before merging.
- No merge commits from feature branches—use rebase to integrate upstream changes.

## Performance
- Profile before optimizing; justify transforms adding noticeable build time (>10%).
- Keep transforms stateless and idempotent.

## Documentation
- Update `README.md` when commands, Node versions, or deployment behavior changes.
- Document new environment variables or required secrets immediately.

## Pre-Rebase Checklist Before Fast-Forwarding to Main
1. Lint passes (no warnings).
2. `npm audit` clean or documented exceptions.
3. Local `npm run build` succeeds.
4. Dependencies reviewed (no stray additions).
5. Commits squashed/reworded for clarity (linear history maintained).
6. README and contract updated (if needed).

---
_Last updated: 2025-08-20_
