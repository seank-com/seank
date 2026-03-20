---
title: "Automation server can't create object"
date: 2010-12-03T00:00
description: "Ahhhhh, I spent thrity minutes scratching my head over this before a coworker pointed out an easy solution to my problem."
tags: 
    - cool
---

Ahhhhh, I spent thrity minutes scratching my head over this before a coworker pointed out an easy solution to my problem. Since most of my time was spent searching the web for a possible solution without finding any, I decided to post this entry in hopes that a search engine or two might pick it up and help someone else who doesn't have awesome coworkers walk past their office on a regular basis.

I just used Visual Studio 2010 to create an ATL project and added an object to it and added a method to the object. This is all the stuff you see on stage at every PDC. CodeProject has a tutorial very similar to what I did. Anyway I write a quick 2 line test.js file that uses ActiveXObject to create it and call the method and I get the following error (0x800A01AD).

test.js(1, 1) Microsoft JScript runtime error: Automation server can't create object

So what did I do wrong. Turns out, nothing except trying to run the test.js file from a 64 bit command console. All I had to do to get it working the way I expected was launch the 32 bit command console (commonly found at C:\Windows\SysWOW64\cmd.exe) and run it from there.