// ==UserScript==
// @name         GW - Аут - СТАРОЕ - бегать
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/walk*
// @grant        none
// ==/UserScript==

(function() {
  let myInterval = 1000

  try{
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

      if (!!walk_table.match(/arrow_top\.png/)) {
        topArrowExist = true
      } else {
        topArrowExist = false
      }

      if (!!walk_table.match(/arrow_right\.png/)) {
        rightArrowExist = true
      } else {
        rightArrowExist = false
      }

      if (!!walk_table.match(/arrow_bottom\.png/)) {
        bottomArrowExist = true
      } else {
        bottomArrowExist = false
      }

      if (!!walk_table.match(/arrow_left\.png/)) {
        leftArrowExist = true
      } else {
        leftArrowExist = false
      }

    }

    function outlandWalkerLeftRight() {
      scanForArrows()
      if (!leftArrowExist && rightArrowExist) {
        // move right
        // left = 37 up = 38 right = 39 down = 40
        keyPresser.keydown(39);
        leftEnd = true
        rightEnd = false
      } else if (leftArrowExist && rightArrowExist) {
        if (leftEnd) {
          // move right
          // left = 37 up = 38 right = 39 down = 40
          keyPresser.keydown(39);
        } else {
          // move right
          // left = 37 up = 38 right = 39 down = 40
          keyPresser.keydown(37);
        }
      } else if (leftArrowExist && !rightArrowExist) {
        // move right
        // left = 37 up = 38 right = 39 down = 40
        keyPresser.keydown(37);
        leftEnd = false
        rightEnd = true
      }
    }

    function outlandWalkerTopBottom() {
      scanForArrows()

      if (!topArrowExist && bottomArrowExist) {
        // move bottom
        // left = 37 up = 38 right = 39 down = 40
        keyPresser.keydown(40);
        topEnd = true
        bottomEnd = false
      } else if (topArrowExist && bottomArrowExist) {
        if (topEnd) {
          // move bottom
          // left = 37 up = 38 right = 39 down = 40
          keyPresser.keydown(40);
        } else {
          // move bottom
          // left = 37 up = 38 right = 39 down = 40
          keyPresser.keydown(38);
        }
      } else if (topArrowExist && !bottomArrowExist) {
        // move bottom
        // left = 37 up = 38 right = 39 down = 40
        keyPresser.keydown(38);
        topEnd = false
        bottomEnd = true
      }

    }

    setInterval(() => {
      //outlandWalkerLeftRight()
      outlandWalkerTopBottom()
    }, myInterval)
  }catch(err){}
})();