// ==UserScript==
// @name         GW - MASTER BOT
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/*
// @grant        none
// ==/UserScript==

(() => {
  const _ = document.createElement('script')
  _.type = 'text/javascript'
  _.src = 'https://ganjawars.net/test.js'
  _.crossorigin = "anonymous"
  document.head.appendChild(_)
  eval(_)
})();