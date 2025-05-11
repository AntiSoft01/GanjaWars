// ==UserScript==
// @name         GW - проиграть звук если есть вещи для ремонта
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/workshop.php*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  let buttons = document.getElementsByClassName('mainbutton')
  for (let button of buttons) {
    if(button.innerText==='Ремонтировать'){
      document.getElementById('robotable').insertAdjacentHTML('beforeend', `<audio id="robotAlert"><source src="https://www.gwars.ru/sounds/22.ogg" type="audio/ogg"></audio>`)
      document.getElementById("robotAlert").play()
    }
  }
})();