// ==UserScript==
// @name         GW - на 95% хп идти прибрежку
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/workshop*
// @match        https://www.gwars.ru/me.*
// @match        https://www.gwars.ru/items.php*
// @match        http://www.gwars.ru/map.php*
// @
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  setInterval(()=>{
    let hpText = document.getElementById('hpheader').innerText
    let currentHp = +hpText.match(/\d+/g)[0]
    let maxHp = +hpText.match(/\d+/g)[1]
    if(maxHp * 0.95 <= currentHp){
      location.href = 'https://www.gwars.ru/walk.php'
    }else{
      location.reload()
    }
  }, 3e3)
})();