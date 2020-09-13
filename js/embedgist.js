// *********************************************************************
//
// JavaScript code for embedding GitHub Gists in an HTML page
// JavaScript code file: embedgist.js
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

//Add a gist to an HTML5 web page
function addGistToPage(elem, sGistID) {
   //GitHub API is used to retrieve Gists
   const apiGitHubGistUrl = 'https://api.github.com/gists/';

   //Function to create a DOM element node for the GitHub Gist
   function getGitHubGistElem(oGist, htmlUrl) {
      let arrContent;

      if(oGist.content) {
         arrContent = oGist.content.split('\n');
      }
      else {
         console.log('🤔, GitHub Gist contains no content');
         return null;
      }

      let gistTopDiv = document.createElement('div');
      gistTopDiv.setAttribute('class', 'gist');
      gistTopDiv.setAttribute('style', 'max-width:480px;');

      let gistFileDiv = document.createElement('div');
      gistFileDiv.setAttribute('class', 'gist-file');

      let gistBottomDiv = gistTopDiv.appendChild(gistFileDiv);

      let gistDiv = document.createElement('div');
      gistDiv.setAttribute('class', 'gist-data');

      gistBottomDiv = gistBottomDiv.appendChild(gistDiv);

      gistDiv = document.createElement('div');
      gistDiv.setAttribute('class', 'js-gist-file-update-container js-task-list-container file-box');

      gistBottomDiv = gistBottomDiv.appendChild(gistDiv);

      gistDiv = document.createElement('div');
      gistDiv.setAttribute('id', 'file-agist-txt');
      gistDiv.setAttribute('class', 'file my-2');

      gistBottomDiv = gistBottomDiv.appendChild(gistDiv);

      gistDiv = document.createElement('div');
      gistDiv.setAttribute('itemprop', 'text');
      gistDiv.setAttribute('class', 'Box-body p-0 blob-wrapper data type-text');

      gistBottomDiv = gistBottomDiv.appendChild(gistDiv);

      let gistTable = document.createElement('table');
      gistTable.setAttribute('data-tab-size', '8');
      gistTable.setAttribute('data-paste-markdown-skip', '');
      gistTable.setAttribute('class', 'highlight tab-size js-file-line-container');

      gistBottomDiv.appendChild(gistTable);

      let tr, td1, td2;

      for(let i = 0; i < arrContent.length; i++) {
         tr = document.createElement('tr');
         td1 = document.createElement('td');
         td2 = document.createElement('td');
      
         td1.setAttribute('id', 'file-agist-txt-L' + (i + 1));
         td1.setAttribute('class', 'blob-num js-line-number');
         td1.setAttribute('data-line-number', (i + 1).toString());
      
         td2.setAttribute('id', 'file-agist-txt-LC' + (i + 1));
         td2.setAttribute('class', 'blob-code blob-code-inner js-file-line');
         td2.appendChild(document.createTextNode(arrContent[i]));

         tr.appendChild(td1);
         tr.appendChild(td2);
         
         gistTable.appendChild(tr);
      }

      gistDiv = document.createElement('div');
      gistDiv.setAttribute('class', 'gist-meta');

      let anchor = document.createElement('a');
      anchor.setAttribute('href', oGist.raw_url);
      anchor.setAttribute('style', 'float:right');
      anchor.appendChild(document.createTextNode('view raw'));

      gistDiv.appendChild(anchor);

      anchor = document.createElement('a');
      anchor.setAttribute('href', htmlUrl);
      anchor.appendChild(document.createTextNode(oGist.filename));

      gistDiv.appendChild(anchor);

      gistDiv.appendChild(document.createTextNode(' hosted with ❤️ by '));

      anchor = document.createElement('a');
      anchor.setAttribute('href', 'https://github.com');
      anchor.appendChild(document.createTextNode('GitHub'));

      gistDiv.appendChild(anchor);
      gistFileDiv.appendChild(gistDiv);

      return gistTopDiv;
   }

   //HTTP request to retrieve the Gist
   const xhr = new XMLHttpRequest();

   //Format of the content retrieved is JSON
   xhr.responseType = 'json';

   xhr.open('GET', apiGitHubGistUrl + sGistID);

   xhr.onload = () => {
      if (xhr.status != 200) { //Record HTTP (exception) status
         console.log(`Error rerieving Gist: HTTP status ${xhr.status}, ${xhr.statusText}`);
      }
      else { //Success
         console.log('Successfully loaded the Gist');

         if(xhr.response.files) {
            //Send the content of the gist(s) to the console
            Object.keys(xhr.response.files).forEach(key => {
               let elemGist = getGitHubGistElem(xhr.response.files[key], xhr.response.html_url);

               if(elemGist) {
                  elem.parentNode.replaceChild(elemGist, elem);
               }
            });
         }
         else {
            console.log('No \"files\" property on the object returned')
         }
      }
   };

   xhr.onerror = () => { //Technical network error
      console.log('Technical network error occured while retrieving the Gist');
   };
 
   xhr.send(); //Fetch the data
}
