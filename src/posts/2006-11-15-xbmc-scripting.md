---
title: "XBMC Scripting"
date: 2006-11-15T00:00
description: "I've been promising to write a post about scripting in..."
tags: 
    - technology
---

I've been promising to write a post about scripting in Xbox Media Center and so here it is. In case you haven't heard, Xbox Media Center is the single biggest reason to go out and buy an old Xbox (not 360). It can access media from just about any source, be it local, FTP, SMB or UPnP so you can play movies, or play mp3s while viewing a slideshow of your photos or just watching the awesome Milkdrop visualizations. It will also launch your Xbox games and even display the weather for up to 3 customizable locations. Both my brother and I are heavy XBMC fans. He uses a Plextor PVR to record TV shows and then saves them to his 2TB server, then he accesses them from one of his three Xboxs (he has one for each TV in the house). I obtain my content from a variety of sources (Windows Media Center, TiVo, Podcasts and Videocasts, etc) and store them on my Buffalo NAS and then access them from my Xbox in my living room or the PC in the kitchen upstairs.

One of the coolest geek features of XBMC is its integrated support for python scripts. Most copies of XBMC come with a few scripts already installed. One of the quick favorites is called XBMCScripts. This script will help you download and install other scripts. Like most open source projects, the documentation and support are kind of lite, but if you are not afraid to dig in and try to figure things out, there is enough there to get you started. What follows is a narrative of my adventure discovering how to write my first script for XBMC.

## The Goal

Being really into podcasts and videocasts, I wanted to write a script that would list the podcasts or videocasts in a RRS feed and let you download and play them directly on XBMC. I realized that the MultiRSS Reader would be a great place to start as that was almost exactly what I wanted to do. So I connect to my Xbox using [Filezilla](http://filezilla.sourceforge.net/) and downloaded the MultiRSS.py file from the XBMC/scripts directory. Next I opened it up and gazed at the code. Now, I've written programs in BASIC, 6502, Pascal, Fortran, iSETL, [Redcode](http://vyznev.net/corewar/guide.html), C, 68000, C++, Visual Basic, VBScript, JScript, Perl, C#, PHP and a few more I don't remember so alot of it looked familiar, but after trying to make a few obvious modifications, it became clear I would need to read some documentation. Thus began my first hunt.

## Information Gathering

I started by combing over the XBOXMediaCenter site until I found the wiki page titled Building Scripts this gave some great background information as well as a link to XBMCScripts. From here I was able to download lots of script to use as samples. I also found the most useful link of all to Alexpoet's XBMC Scripts. Alex shares a few scripts, a XBMCEmulator script and a great tutorial! I also found links to what looked like automatic generated documentation to the xbmc and xbmcgui imports.

After reading the tutorial I wanted to try to install the emulator so I read through Alex's installation instructions and got a desktop installation of Python up and working. The online documentation that I could find for Python stinks compared to say PHP, but if you take the time to download and unzip the complete documentation it is very good and very thorough.

## Synthesis

At this point I realized that python was more bolted onto XBMC than integrated into it. This is good and bad. Good, because python has a rich set of support libraries that makes it very easy to do very powerful things and also good because that meant I could do most of my development on the desktop which greatly sped things up. However it was bad because it meant that accessing the features unique to XBMC could be spotty (which they were). As I was working with MultiRSS.py I quickly realized that it was designed to handle RSS feeds that were signifcantly smaller than the ones I wanted to handle. So I would need to use a different parsing method. I also want to handle OPML directories of RSS feeds and some of these could be huge ( > 2MB ). I eventually discovered and settled on using the xml.parsers.expat library as it lightweight enough to handle monsterous files and could easily be made very robust and recoverable (something I came to appreciate in python scripts). 

## Providence

**When the student is ready the teacher will emerge....**

It was here that I had a most happy accident. I had been playing around with MC360, a very cool skin that almost exactly mimics an Xbox 360 (I know because I have an Xbox360, though it is hardly ever turned on), and noticed some .py files in the extras directory. Here I realized that some of the functionality of this skin was coded in python. I opened up one of these .py files and saw code like the following:

```
self.addControl(xbmcgui.ControlImage(0,0, 720,576, 'background-green.png'))
self.addControl(xbmcgui.ControlImage(70,0, 16,64, 'bkgd-whitewash-glass-top-left.png'))
self.addControl(xbmcgui.ControlImage(86,0, 667,64, 'bkgd-whitewash-glass-top-middle.png'))
self.addControl(xbmcgui.ControlImage(753,0, 16,64, 'bkgd-whitewash-glass-top-right.png'))
self.addControl(xbmcgui.ControlImage(86,427, 667,64, 'bkgd-whitewash-glass-bottom-middle.png'))
self.addControl(xbmcgui.ControlImage(70,427, 16,64, 'bkgd-whitewash-glass-bottom-left.png'))
self.addControl(xbmcgui.ControlImage(753,427, 667,64, 'bkgd-whitewash-glass-bottom-right.png'))
self.addControl(xbmcgui.ControlImage(60,0, 32,576, 'background-overlay-whitewash-left.png'))
self.addControl(xbmcgui.ControlImage(92,0, 628,576, 'background-overlay-whitewash-centertile.png'))
```

A quick grep in the skin directory revealed that these files were actually contained in the monsterous Textures.xpr file. So I opened Textures.xpr in my favorite hex editor (Notepad) and lo and behold there at the beginning of the file was a list of all the resource files contained therein. I quickly copied and pasted and cleaned this up into a nice list of resources for the MC360 skin and then I opened the main Textures.xpr and created another nice list of resources for the Mayhem skin. Next I wrote a quick script called ResourceBrowser that merely displayed each Mayhem resource (full-screen) one at a time. With this new found list of resources it was a simple task to create a harness that used xbmc.getSkinDir to determine which resources to try and load.

## Hack and Slash

At this point I had a desktop python script that would read RSS and OPML files and parse out the enclosures and an XBMC python script that would display the right kind of UI. All I had to do was merge the two together. Here is where I ran into my first limitation. Since I was working on this at work (long story, don't ask) I discovered that I couldn't access the internet, because I was behind a corporate firewall. I had configured XBMC to access the internet through our proxy server, but those settings are not accessible from script, so scripts have no way of knowing what proxy settings you have configured in XBMC.

Before I just added proxy server info to my own settings, I decided to do some poking around. Being fairly confident that I had found all the documentation there was to find on the internet for XBMC, it was time to look at the code. I found the link on XBOXMediaCenter to the SourceForge project and quickly discovered that I could browse the CVS directly from the web. I eventually determined that the code behind the xbmc and xbmcgui imports was in /XBMC/xbmc/lib/libPython/xbmcmodule/ I also discovered browsing the code in xbmcmodule.cpp that a list of all functions that could be called from xbmc.executebuiltin were listed here and all the functions that could be called from xbmc.executehttpapi were listed here. It was here I noticed the FileDownloadFromInternet function. So I ripped out urllib and urllib2 and all the code that went with it and replaced them with a single call that merely downloads the feed to temporary file on the Z drive. I also noticed that built-in PlayMedia command works a lot more consistently than downloading to a temporary file and calling the ```xbmx.Player().play()``` function. Why, I am not sure.

## Release

So without further ado, here is my first XBMC python script. (I've also tried to post this on xbmcscripts but just in case it gets rejected for some reason I'll leave it up here as well.)

**Media Feed Browser** - Allows the user to browse a configurable set of RSS and OPML feeds and play any content contained therein.

_**Update:** Pruned dead links, XBMC is a very dated._
