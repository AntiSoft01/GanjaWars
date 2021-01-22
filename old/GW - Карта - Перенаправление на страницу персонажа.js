// ==UserScript==
// @name         GW - Карта - Перенаправление на страницу персонажа
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/map.php
// @match        https://www.gwars.ru/map.php?no_red_key
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  location.href="https://www.gwars.ru/me.php"
})();