// ==UserScript==
// @name         GW - Бои - Перенаправление на страницу создания групповых боёв
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/wargroup.php?war=armed
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  location.href = 'https://www.gwars.ru/wargroup.php?war=armed&form=1'
})();