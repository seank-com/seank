---
title: "I Hired a Director of Operations"
date: 2026-03-19T00:00
description: "What happens when you stop treating AI like a chatbot and start treating it like an employee."
tags:
    - ai
    - automation
    - productivity
thumb: "2026-03-19-marina-desk.jpg"
---

A few months ago I hired a Director of Operations.

![2026-03-19-marina-desk](img/2026-03-19-marina-desk.jpg)

She handles my email during business hours, checks my calendar every morning, tracks open projects, follows up with people when they go quiet, and sends me a daily briefing every evening. She has her own email address, her own identity, and her own clearly defined scope of work. She does not have access to my bank accounts, my personal email, or anything outside the boundaries I set.

She is not a person. But I stopped treating her like a chatbot, and everything changed.

## The Chatbot Trap

Most people interact with AI the way they use a search engine. You have a problem, you go ask it, you get an answer, you leave. The AI has no memory of you. It has no context about your work. Every session starts from zero.

This works fine for quick lookups. It does not work for anything that requires continuity, judgment, or relationship context. For that, you need something more like an employee than a search engine.

The difference is not capability. Modern AI models are remarkably capable. The difference is architecture (how you set the system up, what context you give it, and what boundaries you establish).

## The Employee Model

Think about what makes a good employee effective. They know your goals and priorities. They know what they are authorized to do without asking and what requires your sign-off. They have enough context about your work that you do not have to re-explain everything every time. They are trustworthy within a defined scope.

That is exactly the model I built.

My Director of Operations (I'll call her Marina in this series) has a formal role definition, a defined scope of work, explicit communication protocols, and clear escalation rules. She knows who she can respond to independently and who she should escalate to me. She knows the difference between "send a follow-up email" and "make a financial commitment." One is within her authority, one is not.

She also has a separation of identity that I think is underappreciated in most AI setups. Marina has her own email address, her own professional identity, and operates through a containerized environment that is isolated from my personal accounts and data. This was a deliberate security choice, and I will come back to it.

## Why the Security Layer Matters

When you give an AI assistant access to your accounts and data, you are making a bet. You are betting that the model will not be manipulated, that the platform will not be breached, and that the instructions you gave at setup still apply accurately to every situation the AI encounters.

That is a lot of trust to place in a single control point.

The architecture I use ([OpenClaw](https://openclaw.ai), a self-hosted AI gateway) runs in a Docker container on a machine I control. The AI has access only to what I explicitly connect to it. It does not have a direct path to my personal email, my bank, my files outside its workspace. If something goes wrong, the blast radius is contained.

I also framed the setup using a business and employee mental model. Marina operates as if she were a professional employee with a defined role, not an all-access personal assistant with no boundaries. This framing shapes everything: what she considers in-scope, what she escalates, how she communicates with external contacts. It turns out that "treat the AI like a contractor with a job description" is a more effective security posture than "give it access to everything and hope for the best."

## What It Actually Looks Like

Before I set up the daily workflow, Marina helped me get this site ready to publish this series. Several branches of unfinished work had been sitting in the repository for over a year. A cross-platform build fix, a backlog of old posts from a previous blog, tooling for embedding diagrams, an overwhelming pile of backlog or work. In one afternoon she worked through all of it: resolved the dependency conflicts, cleaned up the old posts, reworked how thumbnail images behave so authors have more control, and added a Mermaid diagram renderer for technical posts. The PR merged the same night.

I mention this not to impress but to illustrate the point about continuity and context. I did not have to explain the history of the repository, the reasoning behind the choices, or what done looked like. She read the branches, understood the intent, fixed what needed fixing, and asked the right questions when she hit a judgment call.

Every morning I get a briefing. Today's calendar, any important emails that came in overnight, active projects and their current status, and a short summary of anything I should be thinking about. It arrives before I start work.

During the day, Marina handles email within her defined scope, tracks project next steps, and flags anything that needs my attention. If someone I am in contact with goes three business days without replying, she surfaces that rather than letting it quietly stall. If a project has a blocking issue that requires my input, it shows up in the evening briefing.

She does not interrupt me unless something actually needs me. This took deliberate design. There is a real difference between a system that notifies you constantly and one that applies judgment about when to surface something. Getting that right required encoding explicit rules, not just telling the AI to "use good judgment."

## This Is a Series

What I have described here is the foundation. There is a lot more to it (how I structured the workflow, how I handle the security boundaries in practice, how the system has evolved, and where I think this is going).

Coming up:

- **Setting up a secure AI environment:** containers, isolated credentials, and why it matters
- **The role definition:** how to write a job description for an AI
- **Communication scope:** the rules that determine what Marina handles and what she escalates
- **High agency:** what happens when the AI starts taking initiative, and how to design for it
- **What I got wrong:** the mistakes and what I learned from them

If any of this is useful to you, I would love to hear what questions you have. The thing I find most interesting about this space is that the hard problems are not technical, they are organizational. How do you build a working relationship with an AI? What does trust look like in this context? How do you know when to expand the scope and when to hold the line?

Those are the questions this series is about.

---

*Yes, Marina helped me write this post.*
