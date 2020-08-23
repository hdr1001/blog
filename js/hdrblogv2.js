'use strict'

const blogProtocol = 'https://';
const blogDomain = 'hdr1001.github.io/';
const blogPath = 'blog/';
const blogContentPath = 'src/';
const blogContentQryParam = 'content';
let blogContent = 'first_post.html'

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

   const sURL = blogProtocol + blogDomain + blogPath + blogContentPath + blogContent;

   const xhr = new XMLHttpRequest();

   xhr.responseType = 'text';

   xhr.open('GET', sURL);

   xhr.onload = () => {
      if (xhr.status != 200) { //Record HTTP (exception) status
         article.innerHTML = `<p>Error ${xhr.status}: ${xhr.statusText}</p>`;
      }
      else { //Success
         console.log('Successfully retrieved the requested blog post');

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

   updateBlogPost();
});
