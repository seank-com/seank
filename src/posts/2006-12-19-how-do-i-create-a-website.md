---
title: "How Do I Create A Website? – Part 1"
date: 2006-12-19T00:00
description: "I received a call earlier this month from..."
tags: 
    - technology
---

I received a call earlier this month from Hillary, a motivated young entrepreneur. She had already started a small business with her brother and sister and they wanted to create a website. Like most small businesses, they could not afford to hire a professional web designer to author, host and maintain their web properties. Consequently, they were researching how they can learn to do it themselves. After Hillary called me with her query, I composed an email with the first steps to getting started. I realized others out there might be facing the same kind of questions and so I decided to start a multi-part post to share the ideas and strategies that Hillary and I discussed.

## Step 1 - Learn HTML

First off, you need to learn HTML (stand for Hyperext Markup Language). You don't have to buy anything to start learning how to create web pages with HTML. Just open notepad and enter the following:

```
<html>
<head>
<title>The webpage title goes here</title>
</head>
<body>
<h1>This is a big heading</h1>
<h2>This is a slightly smaller heading</h2>
<p>Paragraphs are generally marked like this one. Within paragraphs you can have <b>bold</b> and <i>italic</i> text.</p>
</body>
</html>
```

Save this file on your desktop with any name. Click on the file on the desktop and change it's extension from .txt to .htm 

If you don't see a .txt behind the filename, you need to unhide extensions. Do the following:

- Go to Start | My Computer
- Select "Folder Options..." From the Tools menu
- Select the View tab,
- Uncheck "Hide extensions for known file types"
- Click OK

Once you've renamed the file, double-click it and it should open in your default web browser (most likely IE7 or Firefox)

HTML is really pretty simple. It's just text with some tags. Tags typically surround the text that you want to do something special to. For example to bold some text you surround it with a 'b' tag (b stands for bold) like so:

```
<b>some bold text</b>
```

Opening tags have <>s around them and closing tags add an extra / between the < and the first letter of the tag name. The only tags that must be in a webpage are the HTML, HEAD and BODY tags. The HTML tag should be the first tag in a webpage, and consequently its closing tag should be the last tag in a webpage. The first tag inside a HTML tag is the HEAD tag. Within the HEAD tags you describe the features of the webpage. Most commonly you use a TITLE tag to specify the title of the webpage. You can use other page wide tags within the HEAD tag. Once you have closed the HEAD section using a closing HEAD tag, you should begin the BODY section using an opening BODY tag. The majority of the contents should go in the BODY section. (within the BODY tags) Don't worry if you forget one. Most browsers are very forgiving and will try to guess what you meant. However, computers that guess often guess wrong so if something doesn't look the way you expect it to you should check your tags to see if any were missing or forgotten.

Some tags stand on their own and don't need to surround text, as in the 'hr' tag. In which case you use just use a single opening tag <hr>. Recently people have decided this is ambiguous since you can't tell if the author expected not to close the tag or just forgot to close it. So instead, they want you to do it like this <hr/> indicating that you intended to use the tag with no closing counterpart. Most browsers will graciously handle both in case you are old school or new school in your HTML usage.

Some tags have attributes. For example if you want to create one of those underlines (called a link) where you click on it and it goes to another page you use an 'a' tag (a stands for anchor, I don't know why they call it anchor) with a 'href' attribute indicating the url you want to go to when the user clicks the link. For example:

```
<a href="http://www.seank.com">Click here to go to my website</a>
```

The best place to learn what all the different tags are and what each of the possible attributes do is at the Microsoft Developer Network website. To find the page that lists all the HTML tags do the following:

- Goto http://msdn.microsoft.com/
- Click on Library on the topic bar across the top.
- Click the + in front of Web Development in the tree on the left
- Click the + in front of HTML and CSS in the tree on the left
- Click on HTML and DHTML Reference in the tree on the left
- Click the HTML Elements link about half way down in the page on the right.

Here you will find the exhaustive list of all HTML tags. Try them out and see what you get.

From here I would recommend browsing web pages on the Internet. When you find something that looks interesting and you'd like to know how they did it, select Source from the View menu. (IE7 hides the menu bar. You can see it by pressing Alt-v)

## Step 2 - Find a domain name

Once you have a handle on HTML and have a webpage created that you'd like to put on the Internet, the next thing you will want to do is reserve a domain name.

Go to [http://www.godaddy.com/](http://www.godaddy.com/) and do a domain search. Type your desired domain name. It can have letters, numbers and hyphens. No spaces or anything else. Then select your TLD (Top Level Domain) .com .net and .org are the most popular. Originally .com was supposed to be for commercial websites, .net for networking infrastructure websites and .org for non-profit organizations but for a while the official website for the Seattle Mariners was seattlemariners.org which is a pretty good indication that no one knows or cares what they stand for. Personally, I'd recommend reserving all three if they are available. I did this with a few of my websites.

That way, you can go to http://www.somesite.com, http://www.somesite.net, or http://www.somesite.org and they will all take you to the same place. I didn't do this back when I registered http://www.seank.com and so if you go to http://www.seank.net or http://www.seank.org you'll get someone elses site. Of course back when I registered seank.com it cost $50/year and not $9/year so I had a good excuse. You probably don't need private domain registration if you already have a PO box for your business, otherwise it might be a good idea since you must provide a mailing address and an email address and this information will be public. To see the difference do a domain search on google.com You'll see a message that the domain is taken. To the right of that is a link that says (click here for info) You'll see Google's address and email address. Now do a domain search on seank.com when you click the (click here for info) You'll see some address in Arizona and a cryptic email address. I paid extra to make seank.com a private registration. Unless you choose a private registration, the email address that you provide will get a considerable amount of SPAM. Before I had private registration, I had my public email addresses setup to automatically delete anything that doesn't come directly from godaddy.com. You can do this easily with the email package from your webhost, so when you register you could give the webmaster@whateveryouendupregistering.com as the email address. This is a good one since a lot of spammers will send email to the webmaster address anyway even if you don't use it. Once you've found the domain name you want, just follow the steps to register it. Don't sign up for free email or anything and just parking the domain for now.

Finally, go to [http://www.webhost4life.com/](http://www.webhost4life.com/) and pick a webhosting plan. You can probably get by with the Basic Plan unless you think you will need more than 8 unique email addresses (They say 10 but one of them is postmaster and you'll need another one to be webmaster), or you know for certain you'll want ASP.Net or MSSQL instead of MySQL. I'm sure you can upgrade later if you find you need one or more of those so don't feel like you have to over-buy now. When you sign up for webhosting they will ask you your domain name and then provide instructions on what domain name servers (DNS) to point to. You'll need to then login to your godaddy.com account and unpark/update your DNS entries. Once you do this it typically takes anywhere from an hour to 24 hours for the new name server information to propagate its way around the internet and there you go.

From here you'll want to upload your web pages and so forth, but we'll have to cover that in part 2, you are probably already feeling overwhelmed. Feel free to comment if any of this is confusing. I'm more than happy to explain it. What is outlined here is a great start to hosting your own website. No matter how big or small your web requirements. GoDaddy and Webhost4Life are both outstanding services that scale well. You won't be painting yourself into a corner with either of them.

_**Update:** Today I would not recommend GoDaddy or Webhost4Life. I personally use Namecheap. I use their free forwarding to forward email to my gmail account and then use GitHubs free hosting to host the web content. Soon I will have a post or video explaining how to set this up._