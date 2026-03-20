---
title: "JSLint for WSH"
date: 2010-11-28T00:00
description: "As Mr. Crockford is removing JSLint's support for WSH"
tags: 
    - cool
---

As Mr. Crockford is removing [JSLint](http://jslint.com/)'s support for WSH citing other community improvements, I thought I would post one such improvement. To create s WSH version of JSLint follow these easy steps:
1. Paste the following code into Notepad or your [favorite editor](http://www.sourceinsight.com/) and save as wsh.js.

    ```javascript
    (function () {
      var i, j, e, filename, file, source, fso = new ActiveXObject("Scripting.FileSystemObject");
      if (WScript.Arguments.length > 0) {
        for (i = 0; i < WScript.Arguments.length; i += 1) {
          filename = WScript.Arguments(i);
          if (fso.FileExists(filename)) {
            file = fso.OpenTextFile(filename, 1, false, -2);
            source = file.ReadAll()
              .replace(/\r\n/g, '\n')
              .replace(/\r/g, '\n')
              .split('\n');
            if (!JSLINT(source, {})) {
              for(j = 0; j < JSLINT.errors.length; j += 1) {
                e = JSLINT.errors[j];
                if (e && e.line) {
                  WScript.StdErr.WriteLine(filename + '(' + e.line + ') : ' + e.reason);
                }
              }
              WScript.Quit(1);
            } else {
              WScript.StdOut.WriteLine(filename);
              WScript.Quit(0);
            }
          } else {
            WScript.StdErr.WriteLine(filename + ' : File Not Found');
          }
        }
      } else {
        WScript.StdOut.WriteLine('jslint - Windows Scripting front end for JSLint');
        WScript.StdOut.WriteLine('Usage: jslint filename [filename] ...');
      }
    }());
    ```

    _**Update:** The code above includes a fix suggested by Marina Schiff on the [jslint Yahoo group](http://tech.groups.yahoo.com/group/jslint_com/) after Mr. Crockford removed a similar workaround from jslint._

2. Download the latest version of fulljslint.js from Mr. Crockford's [GITHUB](https://github.com/douglascrockford/JSLint).

3. Concatenate the two files into one file named jslint.js (You can do this any way you want but the following DOS command will work if you run it from the directory that contains both files)

    ```dos
    copy fulljslint.js+wsh.js jslint.js
    ```

4. To ease typing, paste the following command into jslint.cmd

    ```dos
    @cscript "C:\PATH TO YOUR TOOLS DIRECTORY\jslint.js" //Nologo %*
    ```

Now to check foobar.js just run the following command

```
jslint foobar.js
```

Since I am an avid Source Insight user, I hooked the above up to a "compile" (F5) key and use si's output parser to quickly take me to the lines containing lint.
