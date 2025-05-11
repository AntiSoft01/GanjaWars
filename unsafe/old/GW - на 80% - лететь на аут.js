// ==UserScript==
// @name         GW - на 80% - лететь на аут
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
    if(maxHp * 0.85 <= currentHp){
      // старый
      location.href = 'https://www.gwars.ru/sea.php?seaway=1&sectorin=12&sectorout=2'

      // новый
      //location.href = 'https://www.gwars.ru/sea.php?seaway=1&sectorin=13&sectorout=2'
    }else{
      location.reload()
    }
  }, 1e3)
})();