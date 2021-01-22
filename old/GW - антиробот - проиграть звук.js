// ==UserScript==
// @name         GW - антиробот - проиграть звук "ошибка Windows"
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.gwars.ru/*
// @match        https://www.gwars.ru/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  setInterval(()=>{
    try{
      document
        .getElementById('robotable')
        .insertAdjacentHTML('beforeend', `<audio id="robotAlert"><source src="https://www.gwars.ru/sounds/22.ogg" type="audio/ogg"></audio>`)

      document.title = 'CAPTCHA'

      setInterval(()=>{document.getElementById("robotAlert").play()}, 500)

      setTimeout(()=>{location.reload()}, 5e3)
    }catch(err){}
  }, 1e3)
})();