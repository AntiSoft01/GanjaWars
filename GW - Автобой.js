// ==UserScript==
// @name         GW - Автобой - ПП
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/b0/b.php*
// @grant        none
// ==/UserScript==
(() => {

  'use strict';
  /*
   setTimeout(()=>{location.reload()},Math.random() * (5000 - 1000) + 1000)
   setInterval(()=>{fight()}, Math.random() * (1000 - 300) + 300)
   */
  setTimeout(()=>{location.reload()},1000)
  setInterval(()=>{




    // ПП
    try{
      //document.getElementById('left_attack1').checked = true
      //document.getElementById('right_attack3').checked = true
    }catch(err){}


    // всегда вправо
    //try{document.getElementById('right_attack3').checked = true}catch(err){}

    // кинуть грену
    try{document.getElementById('bagaboom').checked = true}catch(err){}


    // использовать активку общую
    try{document.getElementById('apmid').checked = true}catch(err){}

    // использовать активку оружие
    //try{document.getElementById('apsid').checked = true}catch(err){}



    // если есть недостающие цели в бою
    if (!document.getElementById('targetslist').innerText.match(/\d+\!/g)){
      // использовать активку общую
      try{document.getElementById('apmid').checked = true}catch(err){}
      // использовать активку оружие
      try{document.getElementById('apsid').checked = true}catch(err){}
    }else{
      // подходить
      try{document.getElementById('walk').checked = true}catch(err){}
      // кинуть грену
      try{document.getElementById('bagaboom').checked = true}catch(err){}
    }

    // всегда стоять
    //try{document.getElementById('walk').checked = false}catch(err){}

    // сказать куда стреляю
    //document.getElementById('walkietext').click()


    fight()
  },500)

})();