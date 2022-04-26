// ==UserScript==
// @name         救救痞X邦
// @version      0.1
// @description  幫助痞X邦修正在 Google 搜尋結果上不知道什麼時候才會修好的發文日期
// @author       robfrkiller@gmail.com
// @match        https://www.google.com/search*
// @match        https://www.google.com.tw/search*
// @require      https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.2/dayjs.min.js
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
  "use strict";

  document
    .querySelectorAll('#search div[data-header-feature="0"]')
    .forEach((element) => {
      const tagA = element.querySelector("a");
      const link = tagA.href.match(
        /^https?:\/\/(\w+?)\.pixnet\.net\/blog\/post\/(\d+)\b/
      );

      if (!link) {
        return;
      }

      const cacheKey = `pixnet_${link[1]}_${link[2]}`;
      const cachedData = GM_getValue(cacheKey);

      if (cachedData) {
        setRealDate(cachedData, tagA);
        return;
      }

      fetch(
        `https://emma.pixnet.cc/blog/articles/${link[2]}?user=${link[1]}`
      ).then(async (response) => {
        const data = await response.json();

        if (data.error !== 0) {
          return;
        }

        const cacheObject = {
          public_at: data.article.public_at,
        };
        GM_setValue(cacheKey, cacheObject);

        setRealDate(data.article, tagA);
      });
    });

  function setRealDate(article, node) {
    const correctDate = dayjs.unix(article.public_at).format("YYYY年M月D日");
    const subTitle = node.parentNode.parentNode.nextElementSibling;

    subTitle.querySelectorAll("div span span").forEach((element) => {
      if (!/^\d+年\d+月\d+日$/.test(element.textContent)) {
        return;
      }

      element.textContent = `${correctDate} (${element.textContent})`;
    });
  }
})();
