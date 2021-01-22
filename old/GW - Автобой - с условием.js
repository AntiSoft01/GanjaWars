// ==UserScript==
// @name         GW - Автобой - с условием
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/b0/b.php*
// @grant        none
// ==/UserScript==
(() => {
  'use strict';

  setTimeout(()=>{location.reload()},1000)
  setInterval(()=>{


    try{
      botWorker()
      fight()
    }catch(err){}


  },900)

})();

function botWorker(){
  let userHp = document.getElementsByClassName('battletags')[0].parentNode.innerText.match(/\d+\/\d+/)[0].match(/\d+/g)
  let currentUserHp = +userHp[0]
  let maxUserHp = +userHp[1]

  let targetHp = document.getElementsByClassName('battletags')[1].parentNode.innerText.match(/\d+\/\d+/)[0].match(/\d+/g)
  let currentTargetHp = +targetHp[0]
  let maxTargetHp = +targetHp[1]

  /*
   // если меньше 100% хп то активировать "Перевязка"
   try{
   if(currentUserHp <= maxUserHp * 1){
   document.getElementById('apmid').checked = true
   }
   }catch(err){}
   */

  // кинуть грену
  try{document.getElementById('bagaboom').checked = true}catch(err){}

  // если у пока меньше 150 хп то активки
  try{
    if(currentTargetHp <= 80){


      // инсайт
      document.getElementById('apmid').checked = true
      document.getElementById('apsid').checked = true
    }
  }catch(err){}
}