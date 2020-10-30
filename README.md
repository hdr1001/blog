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
2. A serverless experience with;
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

In code the ordered collection of blog posts is implemented as a [JSON array](https://hdr1001.github.io/blog/js/blog_articles.json "JSON array blog articles") of article objects. The article object at [index 0](https://hdr1001.github.io/blog/?content=0 "Blog index") references the blog index page. New blog posts can simply be added to the end of the array.

![JSON array blog articles](https://github.com/hdr1001/blog/raw/master/assets/imgs/blog_articles.png "Blog articles ordered in a JSON array")

Event [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event "Document event DOMContentLoaded") is triggered when the blog is loaded. In the associated [event handler](https://hdr1001.github.io/blog/js/hdrblogv2.js "Arrow function for handling the DOMContentLoaded event") a new navigation object is instantiated.

![Blog navigation object instantiation](https://github.com/hdr1001/blog/raw/master/assets/imgs/dom_content_loaded.png "Event handler DOMContentLoaded")

In the navigation object's [constructor](https://github.com/hdr1001/blog/blob/master/js/hdrblogv2.js "Constructor function of the BlogNav object") the articles array defined in the JSON file is read and a reference to the array is stored in property arrArticles.

![Reference to the article array](https://github.com/hdr1001/blog/raw/master/assets/imgs/artcl_arr_ref.png "Set the article array reference")

The navigation object also has a property for keeping track of which blog post is currently displayed, blogCurrIdx. This property can be used as an index value for array arrArticles to retrieve the article object associated with the currently displayed post.

![The blog's current index](https://github.com/hdr1001/blog/raw/master/assets/imgs/blog_curr_idx.png "Set the current index")

The file property of an article object should match up to an actual file in subdirectory [src](https://github.com/hdr1001/blog/tree/master/src "All blog posts are stored in directory src") of the [GitHub repository](https://github.com/hdr1001/blog "GitHub repository blog").

![Directory src](https://github.com/hdr1001/blog/raw/master/assets/imgs/posts_on_gh.png "The blog posts as available in directory src")

The [individual blog posts](https://github.com/hdr1001/blog/blob/master/src/blog_ghp_pt1.html "Example blog post") listed in subdirectory [src](https://github.com/hdr1001/blog/tree/master/src "All blog posts are stored in directory src") are regular (albeit partial) HTML files.

![Blog post example](https://github.com/hdr1001/blog/raw/master/assets/imgs/blog_post_html.png "Blog posts are HTML files")

### The HTML framework

A couple of years ago my preferred approach to [building websites](https://hdr.is-a-geek.com/svn/blog/c/ "SVN repository of hdr.is-a-geek.com") was to develop [Apache modules](https://httpd.apache.org/docs/2.4/developer/modguide.html "Developing modules for Apache"). In 2020 I find it so much easier to either (1) take a serverless approach and push the entire application logic to the client or (2) use [Node.js](https://nodejs.org/en/ "Node.js is a JavaScript runtime"), [Express](https://expressjs.com/ "Express is a minimalist web framework") and [NGINX](https://www.nginx.com/ "NGINX is an HTTP & reverse proxy server") on the server and go a bit lighter on the client side. This GitHub based implementation of my blog is an example of the first approach, my [API Hub](https://github.com/hdr1001/api_hub_rpr_v3x "API Hub - Request Persist Respond v3x") project is an example of the second. In its latest iteration my blog's HTML framework is completely statically defined in the [index.html](https://github.com/hdr1001/blog/blob/master/index.html "My blog's default page") file located in the root of the code repository.

The starting point for the design of the framework of my previous blog, [hdr.is-a-geek.com](https://hdr.is-a-geek.com "my previous blog"), was the first version of [Andreas01](https://andreasviklund.com/files/demo/andreas01/ "A simple & clean multi-layout XHTML/CSS template") as developed by [Andreas Viklund](https://www.linkedin.com/in/viklundandreas/ "Andreas Viklund on LinkedIn"). I still like this design very much and I have invested a lot of time in tweaking it. I personally developed a (more or less) standard [HTML form](http://hdr.is-a-geek.com/dev/cheat/xhtml_css/form.html "XHTML form basics cheat sheet") to go along with the template and also [experimented](https://hdr.is-a-geek.com/dev/cheat/test/js_css.html "JavaScript CSS scripting") with dynamically switching certain CSS properties on and off. In short, even after all these years, I am still a big fan and I therefore decided to port the overall design to this version of my blog as well. One major issue definitely is that the template predates the concept of a [responsive web design](https://web.dev/responsive-web-design-basics/ "Responsive web design basics"). This is a to-do which is on my radar for sure if only because Google [penalizes](https://webmasters.googleblog.com/2018/03/rolling-out-mobile-first-indexing.html "mobile-first indexing") websites with a non-responsive design.

![The Andreas01 inspired HTML framework](https://github.com/hdr1001/blog/raw/master/assets/imgs/html_blog_frmwk.png "Blog posts are displayed in a framework")

[HTML5](https://html.spec.whatwg.org/ "HTML Living Standard") introduces the concept of [semantic elements](https://www.w3schools.com/html/html5_semantic_elements.asp "HTML Semantic Elements"). In my blog's framework I use the following semantic elements;

- header, which contains the following div's;
   1. URL
   2. quote
   3. banner
- nav, which contains the menu div
- article
- footer, which contains the following div's;
   1. contact
   2. dedication
   3. legal

The article element is the node in the HTML framework where the [blog posts](https://github.com/hdr1001/blog/tree/master/src "Blog posts in the GitHub repo") will be displayed;

![The article element in HTML](https://github.com/hdr1001/blog/raw/master/assets/imgs/article_tag.png "The article tag is where blog posts will be displayed")

Property elemArticle of the navigation object contains a permanent reference to this node;

![Property elemArticle](https://github.com/hdr1001/blog/raw/master/assets/imgs/article_ref.png "Property elemArticle of my blog's navigation object")

The article reference is used each time the reader navigates to a different blog post;

![Switching articles](https://github.com/hdr1001/blog/raw/master/assets/imgs/article_content.png "The article element is updated when another post is requested")

### The JavaScript code

To do
