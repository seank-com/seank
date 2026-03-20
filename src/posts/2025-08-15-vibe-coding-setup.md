---
title: "Vibe Coding: infrastructure, instructions, and a tiny package manifest"
date: 2025-08-15T00:00
tags:
    - unity
    - gamedev
    - workflow
summary: "A project-agnostic blueprint for ambient/procedural scenes, a repo-tuned copilot-instructions.md, and a manifest trick to avoid LFS pain."
---

## Vibe Coding in a vacuum

I have spent many late nights tinkering with small exploration scenes. The goal was always the same: let the player wander, let the world hum along, and do so without hardwiring every object together. That focus on loose coupling eventually grew into what I call vibe coding. A vibe project is an experiment in ambience. It is an exercise in building a space that lives on its own while still playing nicely with a camera that roams through it. The ideas below are distilled from personal experiments and community wisdom and should map to many engines or frameworks.

The central idea is a world composed of tiny procedural actors. A flock script nudges birds around a point, a wind field sways the grass, and a light flicker script pulses a neon sign. None of these scripts know about the camera rig. They simply publish where they are and how they move. The camera system, implemented in something like Cinemachine, listens for spatial hints and decides on a shot. What matters most is the boundary between these layers. The ambient layer is deterministic and self contained. The camera layer is an observer that reacts to public data instead of reaching in with hooks.

![Camera rig, messaging interface, and ambient systems](/assets/img/vibe-coding-diagram.svg)

The diagram sketches the relationship. Ambient systems update on their own and push minimal events to a messaging interface. The camera reads the interface and picks shots. No side holds a reference to the other's internal state. This is the first infrastructure choice: commit to a messaging layer that everyone can talk through. It can be a simple event bus or a more formal observer interface. The important part is that both sides can evolve independently.

### Data driven parameters

Vibe coding favors data over code. Scene parameters live in JSON or YAML and are loaded at runtime. Each ambient system has a file that defines its seed, population count, and any interesting behavior toggles. With files in version control, you can trace the evolution of a scene without sifting through commits that mix code and content. A deterministic seed is the linchpin. When the flock system starts, it takes a seed from its data file, shuffles positions using a basic linear congruential generator, and then saves the seed for replay. Once you have that, a bug report can include a seed and timestamp. Replaying the exact moment of chaos becomes straightforward.

Good defaults help discovery. A wind zone file might only expose amplitude and frequency. Under the hood the script applies a reasonable falloff and clamps extremes. Developers can rely on those defaults while still having room to tune. When a data file is missing a field, the code should fall back to the default rather than fail. This provides a gentle ramp for collaborators. You can drop in an ambient system with minimal configuration and still get pleasing motion.

### Testing motion with golden frames

Procedural motion can feel slippery to test, but simple checks keep regression at bay. I capture golden frames of key shots by rendering to an offscreen buffer. The buffer is hashed and compared against a baseline in version control. The deterministic seed ensures the same sequence of frames each run. When the hash deviates, the build reports which frame changed. This does not replace human review, yet it surfaces surprises early.

For the camera, I run a headless build that sweeps through a list of camera states. Every run seeds the RNG with a fixed value and writes a log of the camera's path. A diffable log makes it obvious when a change ripples through the framing. A simple Node script watches these logs and warns when an edit shifts the camera more than a tolerance. These tests run alongside regular unit tests and keep vibe work grounded in determinism.

### Clear asset boundaries

One problem in exploratory scenes is the slow creep of logic into assets. I have found it useful to treat visuals as dumb assets and keep behavior in graphs or state machines beside them. Prefabs or models live in an `art/` folder, while behavior graphs stay in `logic/`. The linker script that spawns the scene binds the two via IDs defined in data files. This separation keeps artists and programmers from stepping on each other's toes. It also makes it trivial to swap a low poly tree for a high poly one without touching the wind sway behavior. Version history is cleaner when geometry and state machines march in parallel folders.

## The copilot appendix

Many projects now invite tooling or automated assistants into the workflow. I keep a `copilot-instructions.md` in the root of every repository. It is a living document that spells out expectations for tools that offer suggestions. The appendix below is tuned for a vibe coding project. It reminds the assistant to check official docs, to stick to known APIs, and to respect mundane conventions like straight quotes. A lightweight ruleset like this reduces friction and keeps generated commits digestible.

```markdown
# copilot-instructions.md

- Guardrails
  - Verify claims against official documentation.
  - Favor battle tested patterns over speculative APIs.
  - Decline to guess when sources conflict.
- Repo awareness
  - Keep files in their existing folders.
  - Use straight quotes and plain hyphens.
  - Mirror the project's naming and tag style.
- PR etiquette
  - Keep diffs small and scripts runnable.
  - Use short commit subjects with conventional prefixes.
  - Explain builds or tests that were run.
- When in doubt, ask
  - What context am I missing?
  - What constraints or deadlines apply?
  - What are the acceptance criteria?
```

Having these instructions in the repository makes the rules explicit. It also gives contributors a quick way to tune the assistant. They can update the file when conventions change, and the project history shows when that happened. The instructions behave like code style configs, yet they are plain English and easy to skim.

## A tiny manifest to dodge LFS

Large binary assets are a perennial pain in version control. Rather than check in heavy data, I use a small manifest that points to remote sources. The file, `unity-assets.json`, lists an array of objects with a slug and a URL or registry ID. A tiny CLI reads this file, checks for corresponding folders under `Assets/`, and prints a table. If a folder is missing, the tool notes the slug and emits a suggested download command. It exits with a nonzero status when anything is out of place so continuous integration jobs can fail fast.

The key is to keep the manifest human editable and the tool light. No LFS configuration is required. When a teammate pulls the repo, they run `node tools/check-assets.js`. The script tells them which asset packs they need. Because the manifest maps slugs to URLs rather than hosting binaries in the repository, the repo stays lean and forks easily. Asset licenses remain clear because each entry can link to an official store page or an open source archive.

Below is a concise pseudo implementation. It uses Node's built in modules and fits in twenty lines. In a real project this file would live in `tools/` and run as part of a prebuild check.

```js
const fs = require('fs');
const path = require('path');
const manifest = JSON.parse(fs.readFileSync('unity-assets.json'));
const rows = [];
let ok = true;
manifest.forEach(a => {
  const dir = path.join('Assets', a.slug);
  const exists = fs.existsSync(dir);
  rows.push({slug: a.slug, status: exists ? 'present' : 'missing'});
  if (!exists) ok = false;
});
fs.readdirSync('Assets').filter(f => !manifest.find(a => a.slug === f)).forEach(f => rows.push({slug: f, status: 'untracked'}));
console.table(rows);
if (!ok) process.exit(1);
```

Running the CLI after cloning the project shows what needs to be installed without ever committing heavy binary data. A future extension could emit a shell script that downloads each missing asset. The goal is modest: help collaborators avoid the slow churn of setting up game assets and keep the repository friendly to forks and pull requests.

## Safety and openness

This entire workflow leans toward openness. The scene parameter files, the copilot instructions, and the asset manifest are all plain text. They invite discussion in commits and issues. None of the examples above rely on secret services or proprietary plugins. You can swap Unity for Godot or another engine and the principles remain. Keep systems decoupled, drive behavior from data, test with reproducible seeds, and keep assets outside of the versioned history. That approach makes it easier to share experiments and to invite strangers to collaborate.

By leaning on deterministic seeds and golden frames, vibe coding becomes less mysterious. The assistant instructions keep tooling honest. The asset manifest sidesteps LFS while still holding the project together. None of these pieces are new on their own, but combined they form a lightweight blueprint for ambient projects. I hope these notes inspire more open scene experiments and fewer tangled prototypes.

