---
title: ".Net Decompilation"
date: 2006-04-12T00:00
description: "Darpan Gogia has an article on..."
tags: 
    - technology
---

Darpan Gogia has an article on [.NET Decompilation and Source Code Protection](http://www.codeproject.com/dotnet/dotNetDecompilation.asp). I've used ildasm a few times before to look into the details of other peoples programs, but it never occured to me to use it to aid porting a project from one managed language to another.

I was kind of disappointed that he mentioned a rather poor product in the last section of his article that purports to provide protection for .Net assemblies by merely precompiling your IL to native code, thus losing any optimizations you might gain from JITing it on its intended platform. I'm hoping Darpan was just trying to be thorough in his article and doesn't seriously endorse this stuff.

_**Update:** The article has disappeared from CodeProject and I couldn't find it on archive.org either, so I left it as is._

