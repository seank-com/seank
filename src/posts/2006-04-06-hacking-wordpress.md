---
title: "Hacking WordPress"
date: 2006-04-06T00:00
description: "My web hosting company is very good, but for some reason..."
tags: 
    - technology
---

My [web hosting company](http://www.webhost4life.com/) is very good, but for some reason they have this one nickel and dime feature. I can have as many domains as I want pointed to the root directory of my account. However, if I want to point a domain to a subdirectory of my account, they want to charge an additional $15/year. Since I have 4 different domains (soon to be five) pointed to my account and being OCAR ([obsessive compulsive anal retentive](http://en.wikipedia.org/wiki/Obsessive-compulsive_disorder)) I was driven to find another way to do this and save myself the annual $60 tax for being lazy and stupid. So what did I do? I start hacking. Most of my techie friends and I use the term hacking to describe the process of trying to [jerry-rig](https://www.merriam-webster.com/words-at-play/jerry-built-vs-jury-rigged-vs-jerry-rigged-usage-history) a solution together to work around the limits of a technology.

I had separately decided to use [WordPress](http://www.wordpress.org/) on each of my sites to make updating quick and easy. During the installation I read in the online documentation (Real men may not read directions, but real geeks at least scan them) that you could share the same database with multiple installs by merely changing the table prefix in the wp-config.php file. So I was thinking if I could just hack the wp-config.php to change the table prefix based on which domain I came in on, I'd have me 5 websites all running on one hacked installation of Wordpress. The first thing I needed to do was learn some PHP. It took me less than a second to google [extensive documentation on PHP](http://www.php.net/docs.php) including a few samples that I could cut and paste into an index.php and upload and run on my site. In under an hour I had pieced together the code and had everything up and running. The reason I call this hacking is because before this, I knew nothing about PHP and now I still know almost nothing, but it works. :)

_**Update:** Change jury-rig to jerry-rig based on further research._




