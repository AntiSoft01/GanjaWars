// ==UserScript==
// @name         GW - AAA - АВТООБНОВЛЕНИЕ
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Обновляет страницу на ауте
// @author       You
// @match        https://www.gwars.ru/walk*
// @grant        none
// ==/UserScript==

(function() {
    setInterval(()=>{document.getElementById('refreshlink').click()}, 500)
})();