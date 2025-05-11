// ==UserScript==
// @name         GW - Бои - Создать уличные бои
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/wargroup.php?war=street&form=1
// @grant        none
// ==/UserScript==

(function() {
  setInterval(()=>{
    // Ограничения по численности:3
    document.getElementsByName('lim1')[0].children[0].selected = true

    // Ограничения по уровням: +0 лвла от твоего
    document.getElementsByName('lev1')[0].children[0].selected = true

    // Ограничение по умениям
    //document.getElementsByName('skills_limit_max')[0].children[1].selected = true

    // Равномерное распределение по мощности:
    document.getElementsByName('Ravnomernoe')[0].checked = false

    // время на ход 20 секунд
    document.getElementsByName('timeout')[0].children[2].selected = true

    // Начало боя:	через 3 минуты
    document.getElementsByName('starttime')[0].children[0].selected=true

    // Создать
    document.getElementsByName('createform')[0].submit()
  }, 300)

})();