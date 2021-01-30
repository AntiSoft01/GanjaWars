// ==UserScript==
// @name         GW - Бои - Автобой
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @description  Проведение автобоя
// @author       Антисофт
// @match        https://www.gwars.ru/b0/b.php*
// @match        http://www.gwars.ru/b0/b.php*
// @grant        none
// ==/UserScript==
(() => {

  const randomDelayFight = generateRandomDelay(1000, 3000)
  const randomDelayPageReload = generateRandomDelay(3001, 5000)

  let fightIDs = {
    mode: 0,
    attack: {
      left: ['left_attack1', 'left_attack2', 'left_attack3'],
      right: ['right_attack1', 'right_attack2', 'right_attack3'],
    },
    defense: ['defence1', 'defence2', 'defence3'],
  }

  /**
   * Generates the random number between two arguments
   * @param numberMin
   * @param numberMax
   * @returns {*}
   */
  function generateRandomDelay(numberMin, numberMax) {
    return Math.floor(Math.random() * (numberMax - numberMin)) + numberMin
  }

  /**
   * Defines the battle mode and fill the fightIDs with appropiate data IDs
   * mode 1 : современное графическое
   * mode 2 : современное упрощенное
   */
  function getFightMode() {

    let mode = document.getElementById('firebutton').className

    if (mode === 'maketurnbutton') { // современное графическое
      fightIDs = {
        ...fightIDs, ...{
          mode: 1,
          walk: 'walk',
          grenade: 'bagaboom',
          activeGeneral: 'apmid',
          activeWeapon: 'apsid'
        }
      }
    } else if (mode === 'battle_pda_make_turn') { // современное упрощенное
      fightIDs = {
        ...fightIDs, ...{
          mode: 2,
          walk: 'walkbutton',
          grenade: 'grenadebutton',
          activeGeneral: 'apm_button',
          activeWeapon: 'aps_button'
        }
      }
    }
  }

  // Reload current page
  setTimeout(() => {location.reload()}, randomDelayPageReload)

  // Initiate fight
  setInterval(() => {

    getFightMode()

    if (fightIDs.mode === 1) { // современное графическое

      if (!document.getElementById('targetslist').innerText.match(/\d+\!/g)) {
        // если есть достающие цели в бою
        // использовать активку общую
        try {document.getElementById(fightIDs.activeGeneral).checked = true} catch (err) {}
        // использовать активку оружие
        try {document.getElementById(fightIDs.activeWeapon).checked = true} catch (err) {}
      } else {
        // если есть недостающие цели в бою
        // подходить
        try {document.getElementById(fightIDs.walk).checked = true} catch (err) {}
        // кинуть грену
        try {document.getElementById(fightIDs.grenade).checked = true} catch (err) {}
      }

    } else if (fightIDs.mode === 2) { // современное упрощенное

      if (!document.getElementById('targetslist').innerText.match(/\d+\!/g)) {
        // если есть достающие цели в бою
        // использовать активку общую
        try {document.getElementById(fightIDs.activeGeneral).click()} catch (err) {}
        // использовать активку оружие
        try {document.getElementById(fightIDs.activeWeapon).click()} catch (err) {}
      } else {
        // если есть недостающие цели в бою
        // подходить
        try {
          if (document.getElementById(fightIDs.walk).className === "graybutton_nh") {
            document.getElementById(fightIDs.walk).click()
          }
        } catch (err) {}
        // кинуть грену
        try {
          if (document.getElementById(fightIDs.grenade).className === "graybutton_nh") {
            document.getElementById(fightIDs.grenade).click()
          }
        } catch (err) {}

      }
    }

    fight()

  }, randomDelayFight)

})()