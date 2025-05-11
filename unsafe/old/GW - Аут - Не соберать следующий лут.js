// ==UserScript==
// @name         GW - Аут - Не соберать следующий лут
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/walk*
// @match        http://www.gwars.ru/walk*
// @grant        none
// ==/UserScript==

(function() {
  setInterval(()=>{
    try{
      if(!document.getElementById('gotakeit').querySelector('tr').innerText.match(/HK-53|РГД-5|плащ|Шлем|ботинки|пояс/)){
        document.getElementById('takebutt').click()
      }
    }catch(e){}
  },300)
})();