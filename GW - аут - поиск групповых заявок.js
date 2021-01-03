// ==UserScript==
// @name         GW - аут - поиск групповых заявок
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/walk*
// @grant        none
// ==/UserScript==

(function() {

  let myInterval1 = setInterval(() => {

    let cells = document.getElementById('walk_table').getElementsByTagName('tbody')[1].getElementsByTagName('img')
    for(let cell of cells){
      if(cell.getAttribute('src').match(/t_o\.gif/g)){
        cell.style.background = 'red'
        cell.parentNode.click()

        document.getElementById('refreshlink').click()
        location.reload()

        clearInterval(myInterval1)
        break;
      }
    }

  }, 100)

// обновить моментально если в заявке
  setInterval(()=>{
    if (document.body.innerText.match(/В режиме ожидания боя Вы не можете двигаться/)){
      clearInterval(myInterval1)
      document.getElementById('refreshlink').click()
    }
  }, 200)

})();