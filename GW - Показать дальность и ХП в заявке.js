// ==UserScript==
// @name         GW - Показать дальность и ХП в заявке
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/wargroup.php*
// @grant        none
// ==/UserScript==

(function() {

  const conf = {
    lowDistance    : { value: 5,  style: 'background-color: white'},
    midDistance    : { value: 7,  style: 'background-color: yellow'},
    highDistance   : { value: 10, style: 'background-color: red; color: white'},
    suberbDistance : { style: 'background-color: black; color: white'}
  }

  const imgs = document.getElementById('wargroup_list_div').getElementsByTagName('img');

  for (let img of imgs) {

    if (img.getAttribute('src').match(/synds/) || img.getAttribute('src').match(/qpng/)) continue;

    let enemyDistance = +img.getAttribute('title').match(/\d+\)/)[0].match(/\d+/)[0] / 2;
    let enemyHp = img.getAttribute('title').match(/ \d+\/\d+| \d+ \/ \d+/)[0]

    if (enemyDistance <= conf.lowDistance.value) {
      img.insertAdjacentHTML('beforebegin', `<span style="${conf.lowDistance.style}">${enemyHp}, ${enemyDistance}</span>`)
    } else if (enemyDistance <= conf.midDistance.value) {
      img.insertAdjacentHTML('beforebegin', `<span style="${conf.midDistance.style}">${enemyHp}, ${enemyDistance}</span>`)
    } else if (enemyDistance <= conf.highDistance.value) {
      img.insertAdjacentHTML('beforebegin', `<span style="${conf.highDistance.style}">${enemyHp}, ${enemyDistance}</span>`)
    } else {
      img.insertAdjacentHTML('beforebegin', `<span style="${conf.suberbDistance.style}">${enemyHp}, ${enemyDistance}</span>`)
    }

  }


  // подсветить и зайди в заявку
  let trs = document.getElementById('wargroup_list_div').getElementsByTagName('tr');
  for(let tr of trs){
    if(tr.children[1] !== undefined){
      if(tr.children[1].innerText.match(/12 x 12, \d+-4[2]/) && tr.children[2].innerText.match(/1394/g)){

        document.title = 'БООООООООООООООООЙ'

        // добавить стиля
        tr.children[1].style.border = "5px solid red";
        tr.children[1].style.backgroundColor = "yellow";

        // добавить стиля ссылке "ВСТУПИТЬ"
        let links = tr.children[3].getElementsByClassName('g');
        for(let link of links ){
          if(link.innerText.match(/вступить/)){
            link.style.border = "5px solid red";
            link.style.backgroundColor = "yellow";
            link.style.fontSize = '20px'
            link.style.fontWeight = '900'

            /*
             setTimeout(()=>{
             link.click();
             }, 1e3)
             */


          }/*else{

           setTimeout(()=>{
           location = "https://www.gwars.ru/wargroup.php?war=armed";
           }, 1e3)

           }*/
        }

      }
    }
  }

})();