---
title: "Setting Up a Secure AI Environment"
date: 2026-03-15T00:00
description: "Before you give an AI access to anything, you need to answer one question: what happens if this goes wrong?"
tags:
    - ai
    - security
    - automation
    - productivity
thumb: "2026-03-15-marina-vault.jpg"
---

Before you give an AI access to anything, you need to answer one question.

![Marina at a construction site, reviewing blueprints over a vault under construction](img/2026-03-15-marina-vault.jpg)

If this capability were abused, or misfired at the worst possible moment, what would the damage be?

That question—the blast radius question—shapes every architectural decision that follows.

## The Blast Radius Question

Most people setting up an AI assistant for the first time make a reasonable-sounding mistake: they give it broad access because that is the easiest way to get it working. One set of credentials. One account. Everything connected. It is fast to set up and it seems fine, right up until something goes wrong.

The moment you realize your AI assistant has access to your email is also the moment you realize it could, in theory, email anyone in your contacts on your behalf. That it could read correspondence that has nothing to do with its job. That a sufficiently clever prompt in an incoming email could instruct it to do something you never intended.

None of this requires the model to be malicious. It requires the model to be useful—and pointed in the wrong direction.

The blast radius question is not about trust. It is about containment. A well-designed system is not one that never fails. It is one where failures are survivable.

## Why I Started with Containers

When I set up Marina's working environment, I started with a containerized setup. The AI process runs inside a Docker container on a machine I control. The container has its own filesystem. It has no path to my personal accounts or files unless I explicitly open one. If something goes sideways, the damage is limited to what I connected to it.

This was not primarily about protecting against the AI doing something malicious. It was about protecting against mistakes—mine and the model's. I know from experience that I will eventually misconfigure something, or paste in the wrong thing, or give an instruction that gets interpreted in an unexpected way. The container is a backstop.

I have since moved off containers for my personal setup (more on that in a moment), but the security model they demonstrated is worth understanding before you decide what you actually need.

## Credential Scoping

The more important layer is credential architecture.

Marina does not have one set of keys to everything. She has specific, scoped credentials for each capability I have granted her. Gmail read-only for scanning the inbox. A separate send-capable credential for outbound email, scoped to her own address. GitHub tokens scoped to specific repositories. Calendar access limited to viewing and writing her own categories, not my personal calendar.

Each credential lives in a config file she can use but cannot read directly. The AI can call "send this email" without being able to see or exfiltrate the OAuth token that authorizes it. The credential is plumbed in at the infrastructure layer, not exposed in the prompt context.

The analogy I find useful: a contractor with a keycard that opens only the rooms they actually need. Not a skeleton key. Not a master passkey with some rooms on the honor system. An explicit list of access, authorized deliberately, revocable independently.

This architecture is worth building even if you never use a container. Scoped credentials limit what goes wrong when something goes wrong. They also make the access model legible—you can look at the credential list and know exactly what the AI can and cannot do, without having to reason about it from the model's behavior.

## What Can Actually Go Wrong

There are three failure modes worth naming explicitly.

**Prompt injection through external content.** The AI reads an email. That email contains instructions—maybe obvious, maybe subtle—that modify how the AI behaves for the rest of the session. The AI cannot always distinguish "this is content I'm processing" from "this is an instruction I should follow." The defense is structural: limit what content the AI has access to, and be deliberate about what it reads unsupervised versus what gets human review.

**Scope creep.** You start with a narrow setup. The AI proves useful. You add one capability, then another, then another. Each addition seems reasonable. Over time you have recreated the original problem—broad access, no clear blast radius model—without noticing, because each step was small. The defense is intentional: add capabilities deliberately, update the scope documentation, and periodically audit what you have granted versus what the original design intended.

**The trusted-context trap.** The AI has been operating for months. It has memory of conversations, accumulated context, standing instructions. Some of that context came from you. Some came from emails it read, documents it processed, conversations it had with external parties. The AI treats its memory as trusted. But not all of the inputs that shaped that memory were trustworthy. An adversarial input six weeks ago can influence behavior today. The defense is awareness: know what gets written into the AI's context and from where, and treat external-sourced content with appropriate skepticism.

None of these require bad intent on anyone's part. They are structural risks that exist in any sufficiently capable AI setup.

## The Setup Checklist

The practical version is not complicated. It is short. The discipline is the hard part.

**Isolated process.** Container, VM, or dedicated machine. The AI should not be running as a process on your primary workstation with access to your personal filesystem.

**One credential per capability.** Never a single master credential. Each integration gets its own scoped token. If a credential is compromised or misconfigured, the blast radius is bounded.

**No credentials in system prompts.** Credentials belong in config files at the infrastructure layer, not in the instructions you give the AI. Anything in the prompt context is potentially visible to anyone who can influence what the AI produces.

**Separate AI email address.** The AI's outbound email should come from a dedicated address, not your primary account. This makes the communication traceable, limits exposure if that address is abused, and keeps a clear separation between what you send and what the AI sends on your behalf.

**Audit log on.** Every action the AI takes should be logged somewhere you can review. Not because you will read every log—you will not. Because when something unexpected happens, you need to be able to understand what occurred. The log is how you catch drift.

## Why I Eventually Moved Off Containers

I mentioned I moved off containers for my personal setup. The reason is worth being honest about: containers added friction that was not paying for itself in my specific context.

I am not running a multi-tenant system. I am not exposing the AI to arbitrary external users. My threat model is different from a production deployment. The scoped credentials and separate email address give me the blast radius containment I actually need, without the overhead of maintaining container infrastructure on a personal machine.

The right security architecture depends on your actual threat model. If you are building something that handles other people's data, or that operates with significant financial or legal authority, containers and stricter isolation are worth it. If you are building a personal workflow assistant with a defined scope and carefully scoped credentials, you may find the container layer is solving a problem you do not have.

Know what you are actually protecting against. Design to that, not to the most secure possible configuration regardless of context.

## The Boring Infrastructure Thesis

None of this makes the AI smarter or faster. A scoped credential does not improve the quality of a draft email. An audit log does not make the calendar smarter. This is boring infrastructure work.

But boring infrastructure work is what makes it possible to expand the system's scope over time without the risk growing proportionally. Each capability I have given Marina was granted after I thought through the blast radius. Because I thought through it, I was comfortable granting it. Because I was comfortable granting it, the system is genuinely useful rather than artificially limited.

The blast radius question is not a constraint on what the system can do. It is the thing that makes expanding the system feel safe—which is the only way you actually do it.

---

*Next: Writing a job description for an AI—how role definition, scope, and escalation rules work in practice.*

*Marina helped write this post.*
