'use strict'

//Get the value of a URL query string parameter
function getUrlQryStrParamVal(qryStrParam) {
   qryStrParam = qryStrParam.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

   let regExpr = new RegExp('[\\?&]' + qryStrParam + '=([^&#]*)');

   let rslt = regExpr.exec(location.search);

   return rslt === null ? '' : decodeURIComponent(rslt[1].replace(/\+/g, ' '));
}

//Object containing & exposing blog parameters
const blog = {
   protocol: 'https://',
   domain: 'hdr1001.github.io/',
   path: 'blog/',
   contentPath: 'src/',
   javaScript: 'js/',
   defaultArticle: 'first_post.html',
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
   //Object instance properties
   this.blogCurrIdx = 0;
   this.arrArticles = null;

   //Change the article displayed in DOM node blog_post
   function switchBlogPost() {
      //Get a reference to the article node
      const elemArticle = document.getElementById('blog_post');

      //Exit if the article node is not present
      if(!elemArticle) {
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
            elemArticle.innerHTML = `<p>Error rerieving blog post: HTTP status ${xhr.status}, ${xhr.statusText}</p>`;
         }
         else { //Success
            console.log('Successfully retrieved the requested blog post');

            //Replace the existing DOM content
            elemArticle.innerHTML = xhr.response;
         }
      };

      xhr.onerror = () => { //Technical network error
         elemArticle.innerHTML = '<p>Technical network error occurred</p>';
      };
   
      xhr.send();
   }

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

         switchBlogPost();
      }
   };

   xhr.onerror = () => { //Technical network error
      console.log('Technical network error occured while retrieving article list');
   };
 
   xhr.send();
}

document.addEventListener('DOMContentLoaded', event => {
   console.log('Hosted on URL ' + window.location.pathname);

   //Instantiate a new navigation object
   let blogNav = new BlogNav;

   //Add a couple of event handlers
   document.querySelectorAll('.blog_index').forEach(elem => {
      elem.addEventListener('click', evnt => {
         console.log(evnt.target.className);
         evnt.preventDefault();
      });
   });

   document.querySelectorAll('.blog_prev').forEach(elem => {
      elem.addEventListener('click', evnt => {
         console.log(evnt.target.className);
         evnt.preventDefault();
      });
   });

   document.querySelectorAll('.blog_next').forEach(elem => {
      elem.addEventListener('click', evnt => {
         console.log(evnt.target.className);
         evnt.preventDefault();
      });
   });

   document.querySelectorAll('.blog_last').forEach(elem => {
      elem.addEventListener('click', evnt => {
         console.log(evnt.target.className);
         evnt.preventDefault();
      });
   });
});
