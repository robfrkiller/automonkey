// ==UserScript==
// @name         591 kind filter
// @description  加強原本 591 房屋類型過濾功能
// @require      https://gist.githubusercontent.com/BrockA/2625891/raw/9c97aa67ff9c5d56be34a55ad6c18a314e5eb548/waitForKeyElements.js
// @version      0.1
// @author       robfrkiller@gmail.com
// @match        https://rent.591.com.tw/*
// @exclude      https://rent.591.com.tw/home/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    waitForKeyElements (".switch-list-content > .vue-list-rent-item", hideContent);
    let timeC;
    window.navigation.addEventListener("navigate", (event) => {
        if (timeC) {
            clearInterval(timeC);
        }
        console.log('location changed!');
        timeC = setInterval(() => {
            if ($('#j-loading').is(':hidden')) {
                hideContent();
                clearInterval(timeC);
            }
        }, 300);
    })
})();

function hideContent () {
    $(".community-advert").hide();
    $(".switch-list-content > .vue-list-rent-item").each(function () {
        const $this = $(this);
        $this.is(':contains("雅房")')
            ? $this.hide()
            : $this.show();
    });
}
