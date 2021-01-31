// ==UserScript==
// @name         GW - Аут - Бегун
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @description  Бегает по ауту и залетает в заявки
// @author       You
// @match        https://www.gwars.ru/walk*
// @match        http://www.gwars.ru/walk*
// @grant        none
// ==/UserScript==

(() => {

  // timers
  let intervalRunner = 500

  // Simulate keyboard keydown
  let keyPresser = {}
  keyPresser.keydown = (e => {
    var t = document.createEvent("KeyboardEvent")
    Object.defineProperty(t, "keyCode", {
      get() {
        return this.keyCodeVal
      }
    }), Object.defineProperty(t, "which", {
      get() {
        return this.keyCodeVal
      }
    }), t.initKeyboardEvent ? t.initKeyboardEvent("keydown", !0, !0, document.defaultView, e, e, "", "", !1, "") : t.initKeyEvent("keydown", !0, !0, document.defaultView, !1, !1, !1, !1, e, 0), t.keyCodeVal = e, t.keyCode !== e && alert("keyCode mismatch " + t.keyCode + "(" + t.which + ")"), document.body.dispatchEvent(t)
  })

  let topEnd = false
  let rightEnd = false
  let bottomEnd = false
  let leftEnd = false

  let topArrowExist = false
  let rightArrowExist = false
  let bottomArrowExist = false
  let leftArrowExist = false

  let walk_table = ''

  function scanForArrows() {
    walk_table = document.getElementById('walk_table').getElementsByTagName('tbody')[1].innerHTML
    if (!!walk_table.match(/arrow_top\.png/)) {topArrowExist = true} else {topArrowExist = false}
    if (!!walk_table.match(/arrow_right\.png/)) {rightArrowExist = true} else {rightArrowExist = false}
    if (!!walk_table.match(/arrow_bottom\.png/)) {bottomArrowExist = true} else {bottomArrowExist = false}
    if (!!walk_table.match(/arrow_left\.png/)) {leftArrowExist = true} else {leftArrowExist = false}
  }
  function outlandWalkerLeftRight() {
    scanForArrows()

    // left = 37 up = 38 right = 39 down = 40
    if (!leftArrowExist && rightArrowExist) {
      keyPresser.keydown(39)// move right
      leftEnd = true
      rightEnd = false
    } else if (leftArrowExist && rightArrowExist) {
      if (leftEnd) {
        keyPresser.keydown(39)// move right
      } else {
        keyPresser.keydown(37)// move right
      }
    } else if (leftArrowExist && !rightArrowExist) {
      keyPresser.keydown(37)// move right
      leftEnd = false
      rightEnd = true
    }
  }
  function outlandWalkerTopBottom() {
    scanForArrows()

    // left = 37 up = 38 right = 39 down = 40
    if(!topArrowExist && bottomArrowExist && !!document.getElementsByTagName('table')[0].innerText.match(/Threeforce/)){
      keyPresser.keydown(40)// move bottom
      topEnd = true
      bottomEnd = false
    }else if (!topArrowExist && bottomArrowExist) {
      keyPresser.keydown(40)// move bottom
      topEnd = true
      bottomEnd = false
    } else if (topArrowExist && bottomArrowExist) {
      if (topEnd) {
        keyPresser.keydown(40)// move bottom
      } else {
        keyPresser.keydown(38)// move bottom
      }
    } else if (topArrowExist && !bottomArrowExist) {
      keyPresser.keydown(38)// move bottom
      topEnd = false
      bottomEnd = true
    }else{
      // if there are no arrows up/down, move left/right
      outlandWalkerLeftRight()
    }

  }

  // check body mutation if keys (WASD space and arrows) are pressed
  document.addEventListener('keydown', (event) => {
    if (event.keyCode.toString().match(/87|65|83|68|32|37|40|38|39/)) {
      checkBodyMutation()
    }
  })
  // check body mutation if body is clicked
  document.documentElement.addEventListener('click', () => {
    if (document.readyState === 'complete') {
      checkBodyMutation()
    }
  })

  /**
   * Finds the battle on map, any battle
   */
  function findBattleOnMap() {
    let cells = document
      .getElementById('walk_table')
      .getElementsByTagName('tbody')[1]
      .getElementsByTagName('img')

    for(let cell of cells){
      if(cell.getAttribute('src').match(/t_a\.gif/g)){
        // cell.style.background = 'red'
        cell.parentNode.click()

        // document.getElementById('refreshlink').click()
        // location.reload()

        clearInterval(runner)

        break
      }
    }
  }

  /**
   * Checks if there are changes in body DOM, runs findBattleOnMap() and disconnects once done
   */
  function checkBodyMutation() {
    const mutationObserver = new MutationObserver(() => {
      findBattleOnMap()
      mutationObserver.disconnect()
    })
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      subtree: true,
    })
  }

  let runner = setInterval(() => {
    outlandWalkerTopBottom()
  }, intervalRunner)

  // обновить если в заявке
  setInterval(()=>{
    if (document.body.innerText.match(/В режиме ожидания боя Вы не можете двигаться/)){
      clearInterval(runner)
      document.getElementById('refreshlink').click()
    } else if (document.body.innerText.match(/В этом месте сейчас начинается бой, пожалуйста подождите/)){
      location.reload()
    }
  }, 300)


})();