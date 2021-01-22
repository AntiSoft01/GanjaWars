// ==UserScript==
// @name         GW - непись - обновлять страницу каждые 5 секунд
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/info.php?id=2366221*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  setTimeout(()=>{location.reload()},5e3)
})();