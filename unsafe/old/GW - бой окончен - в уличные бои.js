// ==UserScript==
// @name         GW - бой окончен - в уличные бои
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/warlog.php*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  location.href = 'https://www.gwars.ru/wargroup.php?war=street&form=1';
})();