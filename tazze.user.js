// ==UserScript==
// @name         Taaze 評分器
// @version      0.1
// @description  依據書本內容的豐富程度給予評價
// @author       robfrkiller@gmail.com
// @match        https://www.taaze.tw/products/*.html
// @icon         https://www.google.com/s2/favicons?sz=64&domain=taaze.tw
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const preview = document.getElementById('myPreview');
    if (preview) {
        preview.textContent =
            preview.textContent + (preview.attributes.onclick.value.includes('viewer/epub') ? '(優選)' : '(X)');
    }

    const preview2 = document.getElementById('myPreview2');
    if (preview2) {
        preview2.textContent =
            preview2.textContent + (preview2.attributes.onclick.value.includes('viewer/epub') ? '(優選)' : '(X)');
    }
})();
