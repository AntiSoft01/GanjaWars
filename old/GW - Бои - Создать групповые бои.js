// ==UserScript==
// @name         GW - Бои - Создать групповые бои
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/wargroup.php?war=armed&form=1
// @grant        none
// ==/UserScript==

(function() {

  // Ограничения по численности:15===11
  //document.getElementsByName('lim1')[0].children[0].selected = true

  // Ограничения по численности:15
  document.getElementsByName('lim1')[0].children[3].selected = true

  // Ограничения по уровням: +0 лвла от твоего
  document.getElementsByName('lev1')[0].children[0].selected = true

  // Равномерное распределение по мощности:
  document.getElementsByName('Ravnomernoe')[0].checked = false

  // Начало боя:	через 5 минуты
  document.getElementsByName('starttime')[0].children[2].selected=true

  // Создать
  document.getElementsByName('createform')[0].submit()

})();