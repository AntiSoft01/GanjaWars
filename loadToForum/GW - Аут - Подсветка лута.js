// ==UserScript==
// @name         GW - Аут - Подсветка лута
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Подсвечивает лут на ауте
// @author       Антисофт
// @match        https://www.gwars.ru/walk*
// @grant        none
// ==/UserScript==
(() => {

  const loot = {
    bad: {
      color: 'grey',
      items: ['heavyboots', 'helmet', 'old_rgd5', 'maskp', 'hk53']
    },
    average: {
      color: 'white',
      items: ['perch', 'dinamit', 'bandage', 'mushroom', 'weedset']
    },
    good: {
      color: 'yellow',
      items: ['rwater', 'coffee', 'l83a1', 'm84']
    },
    super: {
      color: 'red',
      items: ['stimpack', 'cash', 'expbook', 'travelkit']
    }
  }

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
   * Highlights a loot
   */
  function highlightLoot() {

    let cells = document
      .getElementById('walk_table')
      .getElementsByTagName('tbody')[1]
      .getElementsByTagName('img')

    for (let cell of cells) {
      for (let prop in loot) {
        addStyleTo(prop, cell)
      }
    }

  }

  /**
   * Helper function for highlightLoot(), ignore it, Антисофт
   * @param property
   * @param cell
   */
  function addStyleTo(property, cell) {
    if (cell
      .getAttribute('src')
      .match(
        new RegExp(loot[property].items.join('|'), 'g')
      )
    ) {
      cell.style.background = loot[property].color
    }
  }

  /**
   * Checks if there are changes in body DOM, runs highlightLoot() and disconnects once done
   */
  function checkBodyMutation() {
    const mutationObserver = new MutationObserver(() => {
      highlightLoot()
      mutationObserver.disconnect()
    })
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      subtree: true,
    })
  }

})()