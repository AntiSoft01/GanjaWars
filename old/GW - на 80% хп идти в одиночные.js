// ==UserScript==
// @name         GW - на 80% хп идти в одиночные
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/me.*
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
    if(maxHp * 0.80 <= currentHp){
      location.href = 'https://www.gwars.ru/warlist.php?war=armed'
    }else{
      location.reload()
    }
  }, 500)
})();