// ==UserScript==
// @name         GW - аут - лут - поки - добавить цвет
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/walk*
// @grant        none
// ==/UserScript==

(function() {

  document.getElementsByTagName("head")[0].insertAdjacentHTML("beforeend", `
	<style id="lootmap">
	.gold{animation-name:anim;animation-duration:.1s;animation-iteration-count:infinite}
	@keyframes anim{0%{background-color:red}50%{background-color:#ff0}100%{background-color:red}}
</style>
`)

  setInterval(()=>{

    let cells = document.getElementById('walk_table').getElementsByTagName('tbody')[1].getElementsByTagName('img')

    for(let cell of cells){

      /*
       // батарейки
       if(cell.getAttribute('src').match(/2020_powercell.gif|2020_battery.gif|giftcard.gif/g)){
       cell.style.background = 'red'
       }


       // рыба
       if(cell.getAttribute('src').match(/perch.gif/g)){
       cell.style.background = 'yellow'
       }
       */

      // книга опыта и вода


      if(cell.getAttribute('src').match(/expbook|travelkit|giftcard.gif/)){
        //if(cell.getAttribute('src').match(/expbook|rwater|travelkit/)){
        cell.className = "gold"
      }

    }

    // разукрасить двойных покемонов
    let floatLayers = document.getElementsByClassName('floatdiv')
    for(let layer of floatLayers){
      if(layer.innerText.match(/2, |3, /g)){
        layer.style.opacity = 1
        layer.setAttribute('class', `floatdiv gold`)
      }
    }


  }, 100)
})();