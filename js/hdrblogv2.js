// *********************************************************************
//
// JavaScript code for publishing my blog on GitHub Pages
// JavaScript code file: hdrblogv2.js
//
// Copyright 2020 Hans de Rooij
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied. See the License for the specific
// language governing permissions and limitations under the
// License.
//
// *********************************************************************

'use strict'

//Get the value of a URL query string parameter
function getUrlQryStrParamVal(qryStrParam) {
   qryStrParam = qryStrParam.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

   let regExpr = new RegExp('[\\?&]' + qryStrParam + '=([^&#]*)');

   let rslt = regExpr.exec(location.search);

   return rslt === null ? '' : decodeURIComponent(rslt[1].replace(/\+/g, ' '));
}

//Constructor function for blog navigation object
function BlogNav() {
   //Object containing & exposing (global) blog parameters
   this.blog = {
      protocol: window.location.protocol,
      host: window.location.host,
      path: window.location.pathname,
      contentPath: 'src/',
      javaScript: 'js/',
      contentQryParam: 'content',
      articleList: 'blog_articles.json',
      defaultArticle: 'first_post.html',
      blogIndex: 'blog_index.html',

      history: {
         doPush: 0,
         doReplace: 1,
         doNothing: 2
      },

      getBlogArticleUrl: function() {
         return this.protocol + '//' + this.host + this.path + this.contentPath;
      },

      getBlogArticleListUrl: function() {
         return this.protocol + '//' + this.host + this.path + this.javaScript + this.articleList;
      }
   };

   //Object instance properties
   this.blogCurrIdx = 0;
   this.arrArticles = null;
   this.elemArticle = null;
   this.elemIconNavMenu = null;

   //Set blog's initialArticle property
   let iniContent = getUrlQryStrParamVal(this.blog.contentQryParam);

   if(iniContent) {
      this.blog.initialArticle = iniContent;
   }
   else {
      //Possibly using the back button to return from a visit to an external page
      if(history.state &&
            (typeof history.state.histIdx !== "undefined" || history.state.histIdx === 0)) {

         this.blog.initialArticle = history.state.histIdx;
      }
      else {
         //Last resort, use default
         this.blog.initialArticle = this.blog.defaultArticle;
      }
   }

   //HTTP request to retrieve the article array
   const xhr = new XMLHttpRequest();

   //Format of the content retrieved is JSON
   xhr.responseType = 'json';

   xhr.open('GET', this.blog.getBlogArticleListUrl()); //Fetch the data

   xhr.onload = () => {
      if (xhr.status != 200) { //Record HTTP (exception) status
         console.log(`Error rerieving article list: HTTP status ${xhr.status}, ${xhr.statusText}`);
      }
      else { //Success
         console.log('Successfully loaded the requested article list');

         //The article list can be accessed via arrArticles
         this.arrArticles = xhr.response.hdr_blog_idx;

         this.switchBlogPost(this.blog.initialArticle, this.blog.history.doReplace);
      }
   };

   xhr.onerror = () => { //Technical network error
      console.log('Technical network error occured while retrieving article list');
   };
 
   xhr.send();
}

//Add the event handlers needed for a properly functioning blog
BlogNav.prototype.addEvnts = function(elemTree) {
   elemTree.querySelectorAll('.blog_home').forEach(elem => {
      elem.addEventListener('click', this.home.bind(this));
   });

   elemTree.querySelectorAll('.blog_index').forEach(elem => {
      elem.addEventListener('click', this.index.bind(this));
   });

   elemTree.querySelectorAll('.blog_prev').forEach(elem => {
      elem.addEventListener('click', this.prev.bind(this));
   });

   elemTree.querySelectorAll('.blog_next').forEach(elem => {
      elem.addEventListener('click', this.next.bind(this));
   });

   elemTree.querySelectorAll('.blog_last').forEach(elem => {
      elem.addEventListener('click', this.last.bind(this));
   });

   elemTree.querySelectorAll('.blog_anchor').forEach(elem => {
      elem.addEventListener('click', this.anchor.bind(this));
   });
}

//Add dynamic content to the blog post
BlogNav.prototype.addDynamicContent = function(elemTree) {
   elemTree.querySelectorAll('.ghgist').forEach(elemDiv => {
      console.log('Located placeholder for GitHub Gist');

      //For this to work a GitHub Gist ID must be specified
      let sGistID = elemDiv.getAttribute('data-ghgistid');

      if(sGistID) {
         console.log('About to add Gist with ID ' + sGistID + ' to the page');

         addGistToPage(elemDiv, sGistID);
      }
      else {
         console.log('Gist ID evaluates to false');
      }
   });

   let tblBody = elemTree.querySelector('tbody#blog_idx');

   if(tblBody) {
      console.log('Located placeholder for blog post listing');

      const iniNumRows = 20; //The number of rows initially in the index
      const addNumRows = 10; //Incremental number of rows to add

      //initialize the current row to the last in the array
      let currRow = this.arrArticles.length - 1;
      let numRowsToAdd = iniNumRows;

      function addRowToIdx(oRow, fOnClickHandler) {
         let tr, td, anchor;

         tr = document.createElement('tr');
         td = tr.appendChild(document.createElement('td'));

         anchor = td.appendChild(document.createElement('a'));
         anchor.setAttribute('href', oRow.file);
         anchor.appendChild(document.createTextNode(oRow.title));

         anchor.addEventListener('click', fOnClickHandler);

         td = tr.appendChild(document.createElement('td'));
         td.appendChild(document.createTextNode(oRow.desc));

         tblBody.appendChild(tr);
      }

      //Add article rows to the index table
      function addRowsToIdx(evnt) {
         let sMsg = 'Added articles ' + currRow + ', ';

         //If applicable remove the "Add articles" row
         if(tblBody.childNodes && tblBody.childNodes.length) {
            tblBody.childNodes[tblBody.childNodes.length - 1].remove();
         }

         //Create the index table rows
         for(let rowsAdded = 0; 
               currRow > 0 && rowsAdded <= numRowsToAdd;
               currRow--, rowsAdded++) {
   
            addRowToIdx(this.arrArticles[currRow], this.anchor.bind(this));
         }

         console.log(sMsg + (currRow + 1) + ' to the index');

         //Add the "Add atrticles" row (if applicable)
         if(currRow > 0) {
            addRowToIdx({
               title: 'Add articles',
               desc: 'Add more articles to this index',
               file: ''
            }, addRowsToIdx.bind(this));
         }

         //Prevent, if applicable, the click event from bubbling up
         if(evnt) {
            evnt.preventDefault();
         }
      }

      addRowsToIdx.call(this, null);

      numRowsToAdd = addNumRows;
   };

   let hdrNews = elemTree.getElementById('news_header');

   if(hdrNews) {
      console.log('Adding news items');

      //First delete the current content though
      while(hdrNews.firstChild) {
         hdrNews.removeChild(hdrNews.lastChild);
      }

      let p = hdrNews.appendChild(document.createElement('p'));
      p.appendChild(document.createTextNode('👍'));
   }
}

//BlogNav member function to change the article displayed in DOM node blog_post
BlogNav.prototype.switchBlogPost = function(newIdx, blogHistory) {
   //Get a reference to the article node
   if(!this.elemArticle) {
      this.elemArticle = document.getElementById('blog_post');

      //Exit if the article node is not present
      if(!this.elemArticle) {
         console.log('getElementById on identifier \'blog_post\' failed');
         return;
      }
   }

   let sFileNamePost;

   //Get the relevant properties associated with the new index/file name
   if(typeof this.arrArticles[newIdx] === 'undefined') {
      //newIdx can also be a file name, let's try to convert it
      let tmpIdx = this.arrArticles.findIndex(artcl => artcl.file === newIdx);

      if(tmpIdx === -1) {
         console.log('Unable to locate file name ' + newIdx + ' in article array');

         //Switching to default article
         newIdx = this.blog.defaultArticle;

         tmpIdx = this.arrArticles.findIndex(artcl => artcl.file === newIdx);

         if(tmpIdx === -1) {
            console.log('Can\'t locate ' + newIdx + ' either, giving up ...');
            return;
         }

         console.log('Default article ' + newIdx + ' will be displayed initially!');
      }

      //Correct parameters associated with the post switch are ...
      sFileNamePost = newIdx;
      newIdx = tmpIdx;
   }
   else {
      sFileNamePost = this.arrArticles[newIdx].file;

      if(!sFileNamePost) {
         console.log('Unable to establish file name of post @ index ' + newIdx);
         return;
      }
   }

   //Old school HTTP request
   const xhr = new XMLHttpRequest();

   //Format of the content is plain text
   xhr.responseType = 'text';

   xhr.open('GET', this.blog.getBlogArticleUrl() + sFileNamePost);

   xhr.onload = () => {
      if (xhr.status != 200) { //Record HTTP (exception) status
         this.elemArticle.innerHTML = `<p>Error rerieving blog post: HTTP status ${xhr.status}, ${xhr.statusText}</p>`;
      }
      else { //Success
         console.log('Successfully retrieved the requested blog post');

         //Replace the existing DOM content
         this.elemArticle.innerHTML = xhr.response;

         //Make sure the required events are defined
         this.addEvnts(this.elemArticle); //Add the blog event handlers for the article

         //Add dynamically loaded content
         this.addDynamicContent(this.elemArticle);

         //Update the current index
         this.blogCurrIdx = newIdx;

         //Keep track of the browsing history by default
         if(typeof blogHistory === 'undefined') {blogHistory = this.blog.history.doPush}

         //Don't break the back button
         switch(blogHistory) {
            case this.blog.history.doPush:
               console.log('Pushing state, ID ' + newIdx);
               history.pushState(
                        {histIdx: newIdx},
                        this.arrArticles[newIdx].desc,
                        this.blog.path
               );
               break;
            case this.blog.history.doReplace:
               console.log('Replacing state, ID ' + newIdx);
               history.replaceState(
                        {histIdx: newIdx},
                        this.arrArticles[newIdx].desc,
                        this.blog.path
               );
               break;
            default:
               console.log('Navigation not added to history stack');
         }

         //Add the navigation menu to the end of the article
         this.elemArticle.appendChild(this.elemIconNavMenu
                                       ? this.elemIconNavMenu
                                       : this.elemIconNavMenu = this.createIconNavMenu());
      }
   };

   xhr.onerror = () => { //Technical network error
      this.elemArticle.innerHTML = '<p>Technical network error occurred</p>';
   };

   xhr.send();
}

//Navigate to the blog home page
BlogNav.prototype.home = function(evnt) {
   this.switchBlogPost(this.blog.defaultArticle)

   evnt.preventDefault();
}

//Navigate to the blog index page
BlogNav.prototype.index = function(evnt) {
   this.switchBlogPost(this.blog.blogIndex)

   evnt.preventDefault();
}

//Navigate to the next blog post
BlogNav.prototype.next = function(evnt) {
   if(this.arrArticles[this.blogCurrIdx + 1]) {
      this.switchBlogPost(this.blogCurrIdx + 1)
   }
   else {
      console.log('Can\'t navigate beyond the last blog post')
   }

   evnt.preventDefault();
}

//Navigate to the previous blog post
BlogNav.prototype.prev = function(evnt) {
   if(this.arrArticles[this.blogCurrIdx - 1]) {
      this.switchBlogPost(this.blogCurrIdx - 1)
   }
   else {
      console.log('Can\'t navigate to a blog post before the 1st one')
   }

   evnt.preventDefault();
}

//Navigate to the last blog post
BlogNav.prototype.last = function(evnt) {
   if(this.blogCurrIdx < this.arrArticles.length - 1) {
      this.switchBlogPost(this.arrArticles.length - 1)
   }
   else {
      if(this.blogCurrIdx === this.arrArticles.length - 1) {
         console.log('No need to navigate to the last post if already there');
      }
      else {
         let sHmmm = '🤨 ➡️ Clicked last, blogCurrIdx = ' + this.blogCurrIdx;
         sHmmm += ', arrArticles.length = ' + this.arrArticles.length;

         console.log(sHmmm);
      }
   }

   evnt.preventDefault();
}

//Navigate to the post specified in the anchor's the href attribute
BlogNav.prototype.anchor = function(evnt) {
   let artclFile = evnt.target.getAttribute('href');
   let artclIdx = -1;

   if(artclFile) {
      artclIdx = this.arrArticles.findIndex(artcl => artcl.file === artclFile);
   }

   if(artclIdx === -1) {
      if(!artclFile) {
         console.log('Anchor tag clicked, can\'t get a proper href value though');
      }
      else {
         console.log('Anchor tag clicked, href value ' + artclFile);
         console.log('Can\'t find this post on the article array though');
      }
   }
   else {
      this.switchBlogPost(artclIdx)
   }

   evnt.preventDefault();
}

//Create the icon navigation menu
BlogNav.prototype.createIconNavMenu = function() {
   const icons = [
      {class: 'blog_home', title: 'Home', clickHandler: this.home,
         file: 'home.svg', alt: 'Click to go to home page'},
      {class: 'blog_index', title: 'Blog index', clickHandler: this.index,
         file: 'index.svg', alt: 'Click to go to blog index'},
      {class: 'blog_prev', title: 'Previous blog post', clickHandler: this.prev,
         file: 'prev.svg', alt: 'Click to go to previous post'},
      {class: 'blog_next', title: 'Next blog post', clickHandler: this.next,
         file: 'next.svg', alt: 'Click to go to next post'},
      {class: 'blog_last', title: 'Most recent blog post', clickHandler: this.last,
         file: 'last.svg', alt: 'Click to go to most recent post'}
   ];

   const elemIconNav = document.createElement('nav');
   elemIconNav.setAttribute('id', 'icon_menu');

   icons.forEach(icon => {
      let elemAnchor = document.createElement('a');
      elemAnchor.className = icon.class + ' no_underline';
      elemAnchor.setAttribute('title', icon.title);
   
      let elemIcon = document.createElement('img');
      elemIcon.className = 'icon';
      elemIcon.setAttribute('src', './assets/svg/' + icon.file);
      elemIcon.setAttribute('alt', icon.alt);
      elemIcon.setAttribute('title', icon.title);
   
      elemAnchor.appendChild(elemIcon);
      elemIconNav.appendChild(elemAnchor);   
   });

   this.addEvnts(elemIconNav); //Add the blog event handlers

   return elemIconNav;
}

//Further initialize the HTML page when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
   console.log('DOM content loaded, hosted on URL ' + window.location.pathname);

   //Instantiate a new navigation object
   let blogNav = new BlogNav;

   blogNav.addEvnts(document); //Add the blog event handlers

   window.addEventListener('load', () => {
      console.log('Blog completely loaded');

      let divAnnc = document.querySelector('div#announce');

      if(divAnnc) {
         BlogNav.addDynamicContent(divAnnc);
      }
   });
   
   window.addEventListener('popstate', psEvnt => {
      if(psEvnt && psEvnt.state
            && (psEvnt.state.histIdx || psEvnt.state.histIdx === 0)) {

         blogNav.switchBlogPost(psEvnt.state.histIdx, blogNav.blog.history.doNothing);
      }
      else {
         console.log('Unable to restore previous page HdR blog')
      }
   });
});
