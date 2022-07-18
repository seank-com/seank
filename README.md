# seank
Personal Blog

### Dev Notes

setup environment for WSL2 Ubuntu

```bash
npm install
npm start
```

if you get an error saying node version is too low then install n (from [SimpleNerd](https://simplernerd.com/node-update-version/))

```bash
npm cache clean -f
sudo npm install -g n
sudo n stable
```

To create the initial gh-pages branch (from [jiafulow](https://jiafulow.github.io/blog/2020/07/09/create-gh-pages-branch-in-existing-repo/))

```bash
git checkout --orphan gh-pages
git reset --hard
git commit --allow-empty -m "Initializing gh-pages branch"
git push origin gh-pages
git checkout main
```

### To Debug

Drop the following code or similar

```
{{ { paged: paged, page: page, pagination: pagination } | debugger }}
```

In VS Code, goto debug tab and press Javascript Debug Terminal the run ```npm start```

### Github Actions

- [Checkount](https://github.com/marketplace/actions/checkout)
- [Setup Node.js environment](https://github.com/marketplace/actions/setup-node-js-environment)
- [GitHub Pages action](https://github.com/marketplace/actions/github-pages-action)
- Special thanks to [jekyll-cd](https://github.com/victoriadrake/jekyll-cd/) who clued me into the possibility of deploynig this way.

### Other Notes

- Finally a straight answer on how to [configure custom domains with HTTPS](https://www.devdiaries.net/blog/How-to-set-up-custom-domain-for-Github-Pages-with-HTTPS/) support for GitHub pages.

### current line of inquiry

- [Eleventy Documentation](https://www.11ty.dev/docs/collections/#how-to-exclude-content-from-collections)
- [RSS PLUGIN](https://www.11ty.dev/docs/plugins/rss/)
- [Eleventy and Github pages](https://www.linkedin.com/pulse/eleventy-github-pages-lea-tortay/)

### Other resources 

* [UIKit](https://getuikit.com/docs/alert)
* [Eleventy](https://www.11ty.dev/docs/)
* [vredeburg](https://github.com/dafiulh/vredeburg) [demo](https://vredeburg.netlify.app/)
* [About custom domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
* [Debugging Eleventy](https://griffadev.medium.com/tips-for-debugging-in-11ty-aca887d2c66e)
