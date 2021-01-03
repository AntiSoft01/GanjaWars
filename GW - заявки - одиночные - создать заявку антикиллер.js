// ==UserScript==
// @name         GW - заявки - одиночные - создать заявку антикиллер
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/warlist.php?war=armed*
// @grant        none
// ==/UserScript==

(function() {

  setTimeout(()=>{
    location.reload()
  },7584)

  setTimeout(()=>{
    let mainbtn = document.getElementsByClassName('mainbutton')[0]
    if (mainbtn.innerText === "Подать заявку"){
      mainbtn.click()
    }
  },300)

})();