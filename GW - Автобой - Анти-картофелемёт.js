// ==UserScript==
// @name         GW - Автобой - Анти-картофелемёт
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/b0/b.php*
// @grant        none
// ==/UserScript==
(() => {

  'use strict';
  /*
   setTimeout(()=>{location.reload()},Math.random() * (5000 - 1000) + 1000)
   setInterval(()=>{fight()}, Math.random() * (1000 - 300) + 300)
   */
  setInterval(()=>{

    // если есть в руках картофелемёт
    // перенаправить на страницу персонажа
    if (!!document.getElementsByClassName('greenlightbg')[0].innerText.match(/Картофелемёт/)){
      location.href='https://www.gwars.ru/forum.php'
    }

  },500)

})();