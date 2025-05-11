// ==UserScript==
// @name         GW - Уличные бои - перейти на создание уличных боёв
// @run-at        document-start
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Если никто не зашел в бой то создать новый
// @author       You
// @match        https://www.gwars.ru/wargroup.php?war=street
// @grant        none
// ==/UserScript==


location.href = 'https://www.gwars.ru/wargroup.php?war=street&form=1';

