// ==UserScript==
// @name         GW - Заявки - обновлять страницу
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/wargroup.php*
// @grant        none
// ==/UserScript==

(function() {
  setTimeout(()=>{location.reload()}, 1000)
})();