// ==UserScript==
// @name         GW - Антиробот - Проиграть звук
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Проиграть звук если появляется проверка на робота
// @author       Антисофт
// @match        http://www.gwars.ru/*
// @match        https://www.gwars.ru/*
// @grant        none
// ==/UserScript==

(() => {

  const randomId = generateRandomId()
  const elementToAppend = '#robotable'

  const audioElement = generateAudioElement('https://www.gwars.ru/sounds/22.ogg')
  const randomDelaySound = generateRandomDelay(500, 1000)
  const randomDelayPageReload = generateRandomDelay(2000, 5000)

  /**
   * Generates a random string with length between 6 and 12 characters by default
   * - editable with min max arguments
   * @param lengthMin
   * @param lengthMax
   * @returns {string}
   */
  function generateRandomId(lengthMin = 6, lengthMax = 12) {

    const randomArrayLength = Math.floor(Math.random() * (lengthMax - lengthMin)) + lengthMin
    const stringBase = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

    return Array(randomArrayLength)
      .join()
      .split(',')
      .map(() => {
        return stringBase.charAt(Math.floor(Math.random() * stringBase.length))
      })
      .join('')
  }

  /**
   * Generates an HTML audio element if antibot check is detected
   * @param audioSource
   * @returns {string}
   */
  function generateAudioElement(audioSource = 'https://www.gwars.ru/sounds/22.ogg') {

    return `
        <audio id="${randomId}">
          <source src="${audioSource}" type="audio/ogg">
        </audio>`
  }

  /**
   * Generates a random number between two arguments
   * @param numberMin
   * @param numberMax
   * @returns {*}
   */
  function generateRandomDelay(numberMin, numberMax) {
    return Math.floor(Math.random() * (numberMax - numberMin)) + numberMin
  }

  // Append an audio element to #robotable div
  document
    .querySelector(elementToAppend)
    .insertAdjacentHTML('beforeend', audioElement)

  // Play a sound
  setTimeout(() => {
    document
      .getElementById(randomId)
      .play()
  }, randomDelaySound)

  // Reload a page
  setTimeout(() => {
    location.reload()
  }, randomDelayPageReload)

})()
