// ==UserScript==
// @name         GW - Аут - Подсветка поков
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Подсвечивает покемонов на ауте
// @author       Антисофт
// @match        https://www.gwars.ru/walk*
// @grant        none
// ==/UserScript==
(() => {

  const animationDuration = .3
  const animationColors = ['red', 'yellow']
  const pokemonsToHighlight = [1]

  // add style tag which contains css animation transition
  const style = `
    <style>
      .gold{
        animation-name:anim;
        animation-duration:${animationDuration}s;
        animation-iteration-count:infinite
      }
      @keyframes anim{
        0%{background-color:${animationColors[0]}}
        50%{background-color:${animationColors[1]}}
        100%{background-color:${animationColors[0]}}
      }
    </style>`
  document
    .getElementsByTagName("head")[0]
    .insertAdjacentHTML("beforeend", style)

  // highlight pokemons if keys (WASD space and arrows) are pressed
  document.addEventListener('keydown', (event) => {
    if (event.keyCode.toString().match(/87|65|83|68|32|37|40|38|39/)) {
      checkBodyMutation()
    }
  })
  // highlight pokemons if document is clicked
  document.documentElement.addEventListener('click', () => {
    if (document.readyState === 'complete') {
      checkBodyMutation()
    }
  })

  /**
   * Highlights a pokemons floatlayer like "1, 180%"
   */
  function highlightPokemon() {
    const floatLayers = document.getElementsByClassName('floatdiv')
    const regexr = generateRegex()
    for (let layer of floatLayers) {
      if (layer.innerText.match(regexr)) {
        layer.style.opacity = 1
        layer.setAttribute('class', `floatdiv gold`)
      }
    }
  }

  /**
   * Checks if there are changes in body DOM, runs highlightPokemon() and disconnects once done
   */
  function checkBodyMutation() {
    const mutationObserver = new MutationObserver(() => {
      highlightPokemon()
      mutationObserver.disconnect()
    })
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      subtree: true,
    })
  }

  /**
   * Generates correct regex for pokemon quantity, e.g.: /1, |2, /g
   * @returns {RegExp}
   */
  function generateRegex(){
    let regex = ''
    if (pokemonsToHighlight.includes(1)) {regex += '1, '}
    if (pokemonsToHighlight.includes(2)) {regex += '2, '}
    if (pokemonsToHighlight.includes(3)) {regex += '3, '}
    regex = regex.replace(/, /g, ', |').replace(/\|$/, '')
    return new RegExp(regex, 'g')
  }

})()