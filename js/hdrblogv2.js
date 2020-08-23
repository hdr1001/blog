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
   const xhr = new XMLHttpRequest();

   const sURL = blogProtocol + blogDomain + blogPath + blogContentPath + blogContent;

   xhr.responseType = 'document';

   xhr.open('GET', sURL);

   xhr.onload = () => {
      if (xhr.status != 200) { //Record HTTP (exception) status
         console.log(`Error ${xhr.status}: ${xhr.statusText}`);
      }
      else { //Success
         console.log(xhr.response);
      }
   };    

   xhr.send();
}

document.addEventListener('DOMContentLoaded', event => {
   console.log('Hosted on URL ' + window.location.pathname);

   updateBlogPost();
});
