// ==UserScript==
// @name         GW - передвижение по карте - обновлять каждую секунду
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/map.move.php
// @match        https://www.gwars.ru/map.moving.php
// @grant        none
// ==/UserScript==

(function() {
  setTimeout(()=>{location.reload()}, 1e3)
})();