// ==UserScript==
// @name         GW - Антиставки
// @run-at       document-start
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Запрет на рулетку и лотерею
// @author       Антисофт
// @match        https://www.gwars.ru/roulette.php*
// @match        https://www.gwars.ru/realty.php*
// @grant        none
// ==/UserScript==
location.href = 'https://www.gwars.ru/info.php?id='