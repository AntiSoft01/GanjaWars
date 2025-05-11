// ==UserScript==
// @name         GW - Бои - Бой окончен - Перенаправить не сразу
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Когда бой окончен - перенаправить на желаемую страницу через случайное время (1-4 секунд)
// @author       Антисофт
// @match        https://www.gwars.ru/warlog.php*
// @match        http://www.gwars.ru/warlog.php*
// @grant        none
// ==/UserScript==
(() => {

  const minValue = 1000
  const maxValue = 4000

  const randomDelay = Math.random() * (maxValue - minValue) + minValue
  const redirectURL = 'https://www.gwars.ru/me.php'

  setTimeout(() => {
    location.href = redirectURL
  }, randomDelay)

})()