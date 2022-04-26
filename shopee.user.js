// ==UserScript==
// @name         Shopee 小幫手
// @version      0.1
// @description  Shopee 小幫手
// @author       robfrkiller@gmail.com
// @match        https://shopee.tw/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// ==/UserScript==

(function () {
  "use strict";

  const nowTime = new Date().getTime();
  const cacheCheckKey = "shopee_last_coin_check";
  const lastCheck = GM_getValue(cacheCheckKey, 0);

  if (lastCheck + 86400000 > nowTime) {
    console.log("蝦幣領取近期已執行完成, last: %d, now: %d", lastCheck, nowTime);
    return;
  }

  GM_xmlhttpRequest({
    method: "GET",
    url: "https://shopee.tw/mkt/coins/api/v2/settings",
    responseType: "json",
    onload: function (r) {
      if (!r.response.data.checked_in_today) {
        getCoin();
      }
    },
  });

  function getCoin() {
    GM_xmlhttpRequest({
      method: "POST",
      url: "https://shopee.tw/mkt/coins/api/v2/checkin_new",
      responseType: "json",
      onload: function (r) {
        GM_setValue(cacheCheckKey, nowTime);

        GM_notification({
          timeout: 10000,
          title: "Shopee 小幫手提醒",
          text: r.response.code === 0 ? "已領取蝦幣！" : "蝦幣領取失敗！",
        });
      },
    });
  }
})();
