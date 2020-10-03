# My blog hosted on GitHub Pages

## Table of contents
[License](#license)
[Why](#why)
[High level concepts](#high-level-concepts)

## License
©Hans de Rooij, 2020
JavaScript file hdrblogv2.js contained in this repository is licensed under the [Apache License Version 2.0](https://raw.githubusercontent.com/hdr1001/blog/master/js/LICENSE-2.0.txt)
The blog posts contained in this repository are licensed under the [Creative Commons Attribution 4.0 Int'l License](https://creativecommons.org/licenses/by/4.0/)

## Why

 Previously I hosted my blog on [hdr.is-a-geek.com](https://hdr.is-a-geek.com "HdR is a geek"). The following technology stack underpinned this site;

- Intel NUC for hardware
- [Ubuntu](https://hdr1001.github.io/blog/?content=ubuntu.html "I ❤ Ubuntu") as OS
- [Apache](https://hdr1001.github.io/blog/?content=apache_httpd.html "I ❤ Apache") as Web server (incl SVN integration) 
- [XHTML](https://bit.ly/3ngTG7h, "XHTML Markup Validation Service") as markup language
- [JavaScript](https://hdr.is-a-geek.com/svn/blog/js/a2blog_main.js "In hindsight, jQuery code is ugly") for client-side code (incl. jQuery) 

When I learned about [GitHub Pages](https://pages.github.com/ "GitHub Pages") I just knew I had to port my blog's content over to this delivery platform. I'm expecting; 

1. Un rivalled simplicity while, at the same time, meeting service levels you associate with professional providers (even though the uptime of my amateur stack wasn't bad at all),
2. A completely serverless experience, so no more [C code](https://hdr.is-a-geek.com/svn/blog/c/a2blog_main.c "Apache module code") 🤓,
3. More options to optimize the search- & discoverability of my blog (even though my [reputation](https://talosintelligence.com/reputation_center/lookup?search=https%3A%2F%2Fhdr.is-a-geek.com "Talos intelligence") wasn't too shabby),
4. Less worries about catastrophic SSD or Intel NUC failure,
5. An excellent opportunity to
   - migrate XHTML to HTML5 (semantic elements already implemented, a responsive webdesign noted as a to-do) and
   - loose the [jQuery](http://youmightnotneedjquery.com/ "Do you actually need jQuery?") code in my client-side scripts.

After porting nearly all of the functionality of my blog and more than twenty blog posts, I think I can safely say that the investment of my time thus far has been well worth it and [the result](https://hdr1001.github.io/blog/ "Blog Hans de Rooij") speaks for itself!

## High level concepts

To do
