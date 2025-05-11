// ==UserScript==
// @name         GW - Аут - СТАРОЕ - автопоиск одиночного покемона
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/walk*
// @grant        none
// ==/UserScript==

(() => {
  'use strict';
  let myInterval = 100

  function checkPokemonCell(x, y) {
    if (document.elementFromPoint(x, y).getAttribute('src').match(/t_a.gif/g)) {
      //document.elementFromPoint(x, y).style.background = 'red'
      document.elementFromPoint(x, y).click()
      return true
    } else {
      return false
    }
  }


  let test01 = setInterval(() => {
    for (let user of users) {
      if (user.type === 'bot' && +user.floatinfo[0] === 1) {
        let x = user.x * 25
        let y = user.y * 25
        // add pokemon yellow background
        //document.elementFromPoint(x+35, y+35).style.background='yellow'
        // check top cell from center pokemon position
        if (checkPokemonCell(x + 35, y + 60)) {
          clearInterval(test01)
          break
        }
        // check right cell from center pokemon position
        if (checkPokemonCell(x + 55, y + 35)) {
          clearInterval(test01)
          break
        }
        // check bottom cell from center pokemon position
        if (checkPokemonCell(x + 35, y + 10)) {
          clearInterval(test01)
          break
        }
        // check left cell from center pokemon position
        if (checkPokemonCell(x + 10, y + 35)) {
          clearInterval(test01)
          break
        }
      }
    }
  }, myInterval)

  //setInterval(()=>{document.getElementById('refreshlink').click()}, 1000)

})();