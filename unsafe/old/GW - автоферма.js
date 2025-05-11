// ==UserScript==
// @name         GW - автоферма
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/ferma.php*
// @grant        none
// ==/UserScript==

(function() {
// var panelTable = document.getElementById('main_ferma_window').querySelectorAll('a')
  var nextAction
  var doAction
  var plantbutton
  var panelTable

// периодически обновлять переменные
  setInterval(()=>{

    plantbutton = document.getElementsByName('plantbutton')[1] || null
    panelTable = document.getElementById('main_ferma_window').querySelectorAll('a')

    // если существует кнопка посадить то нажать
    if (plantbutton) {
      plantbutton.click()
    }


    for(let link of panelTable){
      // найти Ближайшее действие
      if(link.parentNode.getAttribute('bgcolor') === '#e0eee0'){
        nextAction = link
      }

      // найти ссылку на действие
      if(link.innerText === 'Собрать весь урожай' || link.innerText === 'Вскопать' || link.innerText === '» Покормить'  || link.innerText.match(/Полить/)){
        doAction = link
      }

    }

  }, 100)


  setInterval(()=>{
    nextAction.click()
  }, 1000)

  setInterval(()=>{
    doAction.click()
  }, 200)

//setTimeout(()=>{location.reload()},30e3)

  setInterval(()=>{
    if(document.body.innerText.match(/Ворота фермы закрыты на кодовый замок/).length){
      try{
        document
          .getElementById('main_ferma_window')
          .insertAdjacentHTML('beforeend', `<audio id="robotAlert"><source src="https://www.gwars.ru/sounds/22.ogg" type="audio/ogg"></audio>`)

        setInterval(()=>{
          document.getElementById("robotAlert").play()
        }, 100)
      }catch(err){}
    }
  }, 1e3)

})();