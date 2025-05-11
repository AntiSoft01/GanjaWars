// ==UserScript==
// @name         GW - Аут - СТАРОЕ - бегать + поиск одиночной заявки
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/walk*
// @match        http://www.gwars.ru/walk*
// @grant        none
// ==/UserScript==

(() => {

  // timers
  let intervalRunner = 1000





  // runner
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  // Simulate keyboard keydown
  let keyPresser = {};
  keyPresser.keydown = (e => {
    var t = document.createEvent("KeyboardEvent");
    Object.defineProperty(t, "keyCode", {
      get() {
        return this.keyCodeVal
      }
    }), Object.defineProperty(t, "which", {
      get() {
        return this.keyCodeVal
      }
    }), t.initKeyboardEvent ? t.initKeyboardEvent("keydown", !0, !0, document.defaultView, e, e, "", "", !1, "") : t.initKeyEvent("keydown", !0, !0, document.defaultView, !1, !1, !1, !1, e, 0), t.keyCodeVal = e, t.keyCode !== e && alert("keyCode mismatch " + t.keyCode + "(" + t.which + ")"), document.body.dispatchEvent(t)
  });

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
      outlandWalkerLeftRight()
    }

  }








  // look for a fight
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  let myInterval1 = setInterval(() => {










// find afight
    let floatLayers = document.getElementsByClassName('floatdiv')
    let openPokemons = []
    loopMain:
      for(let layer of floatLayers){

        if(layer.innerText.match(/2, |3, /g)){
          layer.style.opacity = 1
          layer.setAttribute('class', `floatdiv gold`)
        }else if(layer.innerText.match(/1, /g)){

          // console.log(document.elementFromPoint(layer.offsetLeft, layer.offsetTop + 25))

          if( document.elementFromPoint(layer.offsetLeft, layer.offsetTop + 50).parentElement.tagName === 'A'){
            if (document.elementFromPoint(layer.offsetLeft, layer.offsetTop + 50).parentElement.getAttribute('href').match(/red/)
              &&document.elementFromPoint(layer.offsetLeft, layer.offsetTop + 50).getAttribute('src').match(/t_a\.gif/g)){
              document.elementFromPoint(layer.offsetLeft, layer.offsetTop + 50).parentElement.click()
              break loopMain
            }
          } else if( document.elementFromPoint(layer.offsetLeft-25, layer.offsetTop + 50).parentElement.tagName === 'A'){
            if (document.elementFromPoint(layer.offsetLeft-25, layer.offsetTop + 50).parentElement.getAttribute('href').match(/red/)
              &&document.elementFromPoint(layer.offsetLeft-25, layer.offsetTop + 50).getAttribute('src').match(/t_a\.gif/g)){
              document.elementFromPoint(layer.offsetLeft-25, layer.offsetTop + 50).parentElement.click()
              break loopMain
            }
          } else if( document.elementFromPoint(layer.offsetLeft, layer.offsetTop + 70).parentElement.tagName === 'A'){
            if (document.elementFromPoint(layer.offsetLeft, layer.offsetTop + 70).parentElement.getAttribute('href').match(/red/)
              &&document.elementFromPoint(layer.offsetLeft, layer.offsetTop + 70).getAttribute('src').match(/t_a\.gif/g)){
              document.elementFromPoint(layer.offsetLeft, layer.offsetTop + 70).parentElement.click()
              break loopMain
            }
          } else if( document.elementFromPoint(layer.offsetLeft, layer.offsetTop).parentElement.tagName === 'A'){
            if (document.elementFromPoint(layer.offsetLeft, layer.offsetTop).parentElement.getAttribute('href').match(/red/)
              &&document.elementFromPoint(layer.offsetLeft, layer.offsetTop).getAttribute('src').match(/t_a\.gif/g)){
              document.elementFromPoint(layer.offsetLeft, layer.offsetTop).parentElement.click()
              break loopMain
            }
          } else if( document.elementFromPoint(layer.offsetLeft+25, layer.offsetTop).parentElement.tagName === 'A'){
            if (document.elementFromPoint(layer.offsetLeft+25, layer.offsetTop).parentElement.getAttribute('href').match(/red/)
              &&document.elementFromPoint(layer.offsetLeft+25, layer.offsetTop).getAttribute('src').match(/t_a\.gif/g)){
              document.elementFromPoint(layer.offsetLeft+25, layer.offsetTop).parentElement.click()
              break loopMain
            }
          } else if( document.elementFromPoint(layer.offsetLeft, layer.offsetTop - 25).parentElement.tagName === 'A'){
            if (document.elementFromPoint(layer.offsetLeft, layer.offsetTop - 25).parentElement.getAttribute('href').match(/red/)
              &&document.elementFromPoint(layer.offsetLeft, layer.offsetTop - 25).getAttribute('src').match(/t_a\.gif/g)){
              document.elementFromPoint(layer.offsetLeft, layer.offsetTop - 25).parentElement.click()
              break loopMain
            }
          } else if( document.elementFromPoint(layer.offsetLeft - 25, layer.offsetTop + 25).parentElement.tagName === 'A'){
            if (document.elementFromPoint(layer.offsetLeft - 25, layer.offsetTop + 25).parentElement.getAttribute('href').match(/red/)
              &&document.elementFromPoint(layer.offsetLeft - 25, layer.offsetTop + 25).getAttribute('src').match(/t_a\.gif/g)){
              document.elementFromPoint(layer.offsetLeft - 25, layer.offsetTop + 25).parentElement.click()
              break loopMain
            }
          } else if( document.elementFromPoint(layer.offsetLeft - 25, layer.offsetTop).parentElement.tagName === 'A'){
            if (document.elementFromPoint(layer.offsetLeft - 25, layer.offsetTop).parentElement.getAttribute('href').match(/red/)
              &&document.elementFromPoint(layer.offsetLeft - 25, layer.offsetTop).getAttribute('src').match(/t_a\.gif/g)){
              document.elementFromPoint(layer.offsetLeft - 25, layer.offsetTop).parentElement.click()
              break loopMain
            }
          } else if( document.elementFromPoint(layer.offsetLeft - 50, layer.offsetTop + 25).parentElement.tagName === 'A'){
            if (document.elementFromPoint(layer.offsetLeft - 50, layer.offsetTop + 25).parentElement.getAttribute('href').match(/red/)
              &&document.elementFromPoint(layer.offsetLeft - 50, layer.offsetTop + 25).getAttribute('src').match(/t_a\.gif/g)){
              document.elementFromPoint(layer.offsetLeft - 50, layer.offsetTop + 25).parentElement.click()
              break loopMain
            }
          } else if( document.elementFromPoint(layer.offsetLeft + 25, layer.offsetTop + 25).parentElement.tagName === 'A'){
            if (document.elementFromPoint(layer.offsetLeft + 25, layer.offsetTop + 25).parentElement.getAttribute('href').match(/red/)
              &&document.elementFromPoint(layer.offsetLeft + 25, layer.offsetTop + 25).getAttribute('src').match(/t_a\.gif/g)){
              document.elementFromPoint(layer.offsetLeft + 25, layer.offsetTop + 25).parentElement.click()
              break loopMain
            }
          } else if( document.elementFromPoint(layer.offsetLeft + 25, layer.offsetTop + 50).parentElement.tagName === 'A'){
            if (document.elementFromPoint(layer.offsetLeft + 25, layer.offsetTop + 50).parentElement.getAttribute('href').match(/red/)
              &&document.elementFromPoint(layer.offsetLeft + 25, layer.offsetTop + 50).getAttribute('src').match(/t_a\.gif/g)){
              document.elementFromPoint(layer.offsetLeft + 25, layer.offsetTop + 50).parentElement.click()
              break loopMain
            }
          } else if( document.elementFromPoint(layer.offsetLeft + 50, layer.offsetTop + 25).parentElement.tagName === 'A'){
            if (document.elementFromPoint(layer.offsetLeft + 50, layer.offsetTop + 25).parentElement.getAttribute('href').match(/red/)
              &&document.elementFromPoint(layer.offsetLeft + 50, layer.offsetTop + 25).getAttribute('src').match(/t_a\.gif/g)){
              document.elementFromPoint(layer.offsetLeft + 50, layer.offsetTop + 25).parentElement.click()
              break loopMain
            }
          }

          document.getElementById('refreshlink').click()
          location.reload()

          clearInterval(myInterval1)
          clearInterval(runner1)


        }

      }












  }, 200)






  let runner1 = setInterval(() => {
    //outlandWalkerLeftRight()



    outlandWalkerTopBottom()
  }, intervalRunner)



  // обновить моментально если в заявке
  setInterval(()=>{
    if (document.body.innerText.match(/В режиме ожидания боя Вы не можете двигаться/)){
      clearInterval(myInterval1)
      clearInterval(runner1)
      document.getElementById('refreshlink').click()
    } else if (document.body.innerText.match(/В этом месте сейчас начинается бой, пожалуйста подождите/)){
      location.reload()
    }
  }, 400)



  /*
   setTimeout(()=>{
   clearInterval(myInterval1)
   clearInterval(runner1)
   }, 20e3)

   setTimeout(()=>{
   location.reload()
   }, 21e3)
   */


})();