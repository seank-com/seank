---
title: "WordPress Blogs show up blank on IE 6.0"
date: 2006-09-23T00:00
description: "I just spent some time learning that a nifty little feature in..."
tags: 
    - technology
---

I just spent some time learning that a nifty little feature in Wordpress will make your blog show up as a blank page on some versions of Internet Explorer 6.0. I say some because I have 3 computers at home, 2 with IE 6.0 and one with  IE 7.0 beta. I could only produce this on one of my machines with IE 6.0 and so I immediately suspected a virus of some sort. After running a virus scan with eTrust and then running Spybot Search and Destroy, everything came up clean. So next I logged into the control panel of my webhost and started editing files. First I changed index.php in my root to see if I was evening getting to my webpage. I thought the problem might be a redirector incompatibility with my host and so I wanted to rule that out. When I saw that my index.php was actually get executed, I started hacking Wordpress.

The first file that Wordpress loads is wp-blog-header.php which does a little sanity check at the top followed by the following bit of code:

```
require_once( dirname(__FILE__) . '/wp-config.php');
wp();
gzip_compression();
require_once(ABSPATH . WPINC . '/template-loader.php');
endif;
```
I made the following changes trying to narrow down the problem.

```
require_once( dirname(__FILE__) . '/wp-config.php');
echo "Got Here";
#wp();
#gzip_compression();
#require_once(ABSPATH . WPINC . '/template-loader.php');
endif;
```

When I saved and pressed refresh in the browse I saw "Got Here". Next I made the following changes.

```
require_once( dirname(__FILE__) . '/wp-config.php');
wp();
echo "Got Here";
#gzip_compression();
#require_once(ABSPATH . WPINC . '/template-loader.php');
endif;
```

That worked to. So finally on a hunch I tried this.

```
require_once( dirname(__FILE__) . '/wp-config.php');
wp();
#gzip_compression();
require_once(ABSPATH . WPINC . '/template-loader.php');
endif;
```

And it worked. Turns out I had enabled the "WordPress should compress articles (gzip) if browsers ask for them" option and apparently IE 6.0 asks for compressed articles and then fails reading them or something. When I unchecked this option I was able to uncomment out the line above and everything was good to go.
