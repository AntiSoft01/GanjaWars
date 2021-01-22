// ==UserScript==
// @name         GW - запрет на рулетку и лотерею
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Ант
// @match        https://www.gwars.ru/roulette.php*
// @match        https://www.gwars.ru/realty.php*
// @grant        none
// ==/UserScript==
(()=> {
  'use strict';

  location.href = 'https://www.gwars.ru/info.php?id='
})();