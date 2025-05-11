// ==UserScript==
// @name         GW - Бои - Бой окончен - Перенаправить сразу
// @run-at       document-start
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Когда бой окончен - перенаправить на желаемую страницу
// @author       Антисофт
// @match        https://www.gwars.ru/warlog.php*
// @match        http://www.gwars.ru/warlog.php*
// @grant        none
// ==/UserScript==
const redirectURL = 'https://www.gwars.ru/me.php'
location.href = redirectURL
