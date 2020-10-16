# My blog hosted on GitHub Pages

## Table of contents
1. [License](#license)
2. [Why](#why)
3. [High level concepts](#high-level-concepts)

## License
©Hans de Rooij, 2020

JavaScript file hdrblogv2.js contained in this repository is licensed under the [Apache License Version 2.0](https://raw.githubusercontent.com/hdr1001/blog/master/js/LICENSE-2.0.txt)

The blog posts contained in this repository are licensed under the [Creative Commons Attribution 4.0 Int'l License](https://creativecommons.org/licenses/by/4.0/)

## Why

 Previously I hosted my blog on [hdr.is-a-geek.com](https://hdr.is-a-geek.com "HdR is a geek"). The following technology stack underpinned this site;

- Intel NUC for hardware ![What a Trooper!](https://github.com/hdr1001/blog/raw/master/assets/imgs/BubbleBoyII.jpg "My Intel NUC marches on (& on)")
- [Ubuntu](https://hdr1001.github.io/blog/?content=ubuntu.html "I ❤ Ubuntu") as operating system
- [Apache](https://hdr1001.github.io/blog/?content=apache_httpd.html "I ❤ Apache") as Web server (incl [SVN](https://subversion.apache.org/ "Apache Subversion") for version control) 
- [XHTML](https://bit.ly/3ngTG7h, "XHTML Markup Validation Service") as markup language
- [JavaScript](https://hdr.is-a-geek.com/svn/blog/js/a2blog_main.js "In hindsight, jQuery code is ugly") for client-side code (incl. [jQuery](https://jquery.com/ "A fast, small, and feature-rich JavaScript library")) 

When I learned about [GitHub Pages](https://pages.github.com/ "GitHub Pages") I just knew I had to port my blog's content over to this delivery platform. I'm expecting; 

1. Unrivalled simplicity while, at the same time, meeting service levels associated with professional hosting providers (even though the uptime of my amateur stack wasn't bad at all),
2. A completely serverless experience with;
   - no more worries about catastrophic SSD or Intel NUC failure and
   - no more [C code](https://hdr.is-a-geek.com/svn/blog/c/a2blog_main.c "Apache module code") 🤓,
3. Higher [SEO](https://marketbusinessnews.com/financial-glossary/search-engine-optimization-seo/ "Search Engine Optimization") scores because the domain *github.io* is more reputable than *is-a-geek.com* (even though my [reputation](https://talosintelligence.com/reputation_center/lookup?search=https%3A%2F%2Fhdr.is-a-geek.com "Talos intelligence") isn't too shabby),
4. An excellent opportunity to;
   - migrate from XHTML to HTML5 (semantic elements already implemented, a responsive webdesign noted as a to-do) and
   - switch from [SVN](https://hdr.is-a-geek.com/svn/blog/ "Previous blog code") version control to [Git(Hub)](https://github.com/hdr1001/blog "Latest version of my blog code") and
   - loose the [jQuery](http://youmightnotneedjquery.com/ "Do you actually need jQuery?") code in my client-side scripts.

After porting nearly all of the functionality of my blog and more than twenty blog posts, I think I can safely say that the investment of my time thus far has been well worth it and [the result](https://hdr1001.github.io/blog/ "Blog Hans de Rooij") speaks for itself!

## High level concepts

The three most important concepts behind my blog are;

1. My blog is [an ordered collection](#an-ordered-collection-of-posts) of blog posts,
2. The blog posts are displayed in an [HTML framework](#the-html-framework),
3. [JavaScript code](#the-javascript-code) makes end-user navigation possible.

### An ordered collection of posts

In code the ordered collection op posts is implemented as a [JSON array](https://hdr1001.github.io/blog/js/blog_articles.json "JSON array blog articles").

![JSON array blog articles](https://github.com/hdr1001/blog/raw/master/assets/imgs/blog_articles.png "Blog articles ordered in a JSON array")

In my [GitHub repository](https://github.com/hdr1001/blog "GitHub repository blog") all available blog posts are stored in directory [src](https://github.com/hdr1001/blog/tree/master/src "All blog posts are stored in directory src").

![Directory src](https://github.com/hdr1001/blog/raw/master/assets/imgs/posts_on_gh.png "The blog posts as available in directory src")

Blog posts are regular HTML files.

![Blog post example](https://github.com/hdr1001/blog/raw/master/assets/imgs/blog_post_html.png "Blog posts are HTML files")

The ordering of the blog posts is done in file [blog_articles.json](https://raw.githubusercontent.com/hdr1001/blog/master/js/blog_articles.json "The articles are ordered in a JSON array"). This file can be found in directory [js](https://github.com/hdr1001/blog/tree/master/js "Directory js of the blog repository") of the blog's repository. When the blog is loaded the array defined in the JSON file is read and a reference stored in the navigation object.

![Reference to the article array](https://github.com/hdr1001/blog/raw/master/assets/imgs/artcl_arr_ref.png "Set the article array reference")

One entry in the array is set as the current index. The blog post associated with the current index will be displayed.

![The blog's current index](https://github.com/hdr1001/blog/raw/master/assets/imgs/blog_curr_idx.png "Set the current index")

Please note that the first post (i.e. element 0) in the array must always be reserved for the blog's [index](https://hdr1001.github.io/blog/?content=blog_index.html "Blog index").

### The HTML framework

### The JavaScript code

To do
