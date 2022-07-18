---
title: "TrueCrypt and Private Folders"
date: 2006-07-17T00:00
description: "Microsoft announced this morning that it is..."
tags: 
    - technology
---

Microsoft announced this morning that it is pulling support for private folders, which it had just recently released on the web. This seemed like a good time to mention a free software product that I have been using for a while that I believe is many times better.

## TrueCrypt

Free Open-Source On-The-Fly Encryption

download: http://www.truecrypt.org/ _*Waring:* TrueCrypt is no longer considered secure_

TrueCrypt is really simple to use. After installing (which is optional for all you no-install fans) You merely create a new true crypt volume. The first decision you need to make is the encryption algorithm. There are several to choose from. (AES, Blowfish, CAST5, Serpent, Triple DES, Twofish, AES-Twofish, AES-Twofish-Serpent, Serpent-AES, Serpent-Twofish-AES, Twofish-Serpent). Luckily TrueCrypt provides a detailed description of each so you can pick one that's right for you. Next, you need to choose the size. Finally you need to specify a password. TrueCrypt will then format your volume with randomly encrypted data.

After you have created the volume you can mount it to any available drive letter. From there you just drag and drop the files you want to encrypt onto the drive. That's all there is too it. When the volume is unmounted there is no way to get to the data until you mount it again. (which requires the password)

One of the neatest features of TrueCrypt is "Plausible Deniability." I know that sounds kind of cloak and dagger but practically it means this. You can name your volume anything you want with any extension you want. So call it setup.exe or something common like that. If someone tries to run it it won't work. If someone more savvy looks at a hex dump there is nothing in the file that would clue you into the fact that its an encrypted volume. If I kept sensitive customer data on my laptop in a TrueCrypt volume and my laptop was stolen. A hacker might figure out my administrator password (There are plenty of cracking programs available to do that) but they probably won't notice a temporary file, or a bad setup.exe and think, hey there is probably secret data in there!

_**Update:** Removed link as TrueCrypt is no longer recommended. BitLocker is a reasonable approach now, but lacks the plausible deniability that TrueCrypt had._