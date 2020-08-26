'use strict'

//Object containing & exposing blog parameters
const blog = {
   protocol: 'https://',
   domain: 'hdr1001.github.io/',
   path: 'blog/',
   contentPath: 'src/',
   javaScript: 'js/',
   defaultArticle: 'l_halliday_blog.html',
   contentQryParam: 'content',
   articleList: 'blog_articles.json',

   getBlogArticleUrl: function() {
      return this.protocol + this.domain + this.path + this.contentPath;
   },

   getBlogArticleListUrl: function() {
      return this.protocol + this.domain + this.path + this.javaScript + this.articleList;
   }
};

//Constructor function for blog navigation object
function BlogNav() {
   this.blogCurrIdx = 0;
   this.arrArticles = null;

   //HTTP request to retrieve the article array
   const xhr = new XMLHttpRequest();

   //Format of the content retrieved is JSON
   xhr.responseType = 'json';

   xhr.open('GET', blog.getBlogArticleListUrl()); //Fetch the data

   xhr.onload = () => {
      if (xhr.status != 200) { //Record HTTP (exception) status
         console.log(`Error rerieving article list: HTTP status ${xhr.status}, ${xhr.statusText}`);
      }
      else { //Success
         console.log('Successfully loaded the requested article list');

         //The article list can be accessed via oArticles
         this.arrArticles = xhr.response.hdr_blog_idx;

         this.arrArticles.forEach(article => {
            console.log(article.title)
         });
      }
   };

   xhr.onerror = () => { //Technical network error
      console.log('Technical network error occured while retrieving article list');
   };
 
   xhr.send();
}
//Get the value of a URL query string parameter
function getUrlQryStrParamVal(qryStrParam) {
   qryStrParam = qryStrParam.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

   let regExpr = new RegExp('[\\?&]' + qryStrParam + '=([^&#]*)');

   let rslt = regExpr.exec(location.search);

   return rslt === null ? '' : decodeURIComponent(rslt[1].replace(/\+/g, ' '));
}

//Update the blog post displayed
function updateBlogPost() {
   //Get a reference to the article node
   const article = document.getElementById('blog_post');

   //Exit if the article node is not present
   if(!article) {
      console.log('getElementById on identifier \'blog_post\' failed');
      return;
   }

   //Old school HTTP request
   const xhr = new XMLHttpRequest();

   //Format of the content is plain text
   xhr.responseType = 'text';

   xhr.open('GET', blog.getBlogArticleUrl() + blog.defaultArticle);

   xhr.onload = () => {
      if (xhr.status != 200) { //Record HTTP (exception) status
         article.innerHTML = `<p>Error rerieving blog post: HTTP status ${xhr.status}, ${xhr.statusText}</p>`;
      }
      else { //Success
         console.log('Successfully retrieved the requested blog post');

         //Replace the existing DOM content
         article.innerHTML = xhr.response;
      }
   };

   xhr.onerror = () => { //Technical network error
      article.innerHTML = '<p>Technical network error occurred</p>';
   };
 
   xhr.send();
}

document.addEventListener('DOMContentLoaded', event => {
   console.log('Hosted on URL ' + window.location.pathname);

   let blogNav = new BlogNav;

   updateBlogPost();

   document.querySelector('.blog_index').addEventListener('click', evnt => {
      console.log(evnt.target.className);
      evnt.preventDefault();
   });
   document.querySelector('.blog_prev').addEventListener('click', evnt => {
      console.log(evnt.target.className);
      evnt.preventDefault();
   });
   document.querySelector('.blog_next').addEventListener('click', evnt => {
      console.log(evnt.target.className);
      evnt.preventDefault();
   });
   document.querySelector('.blog_last').addEventListener('click', evnt => {
      console.log(evnt.target.className);
      evnt.preventDefault();
   });
});
