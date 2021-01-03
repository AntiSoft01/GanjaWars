// ==UserScript==
// @name         GW - синдовые - вступить 12х12
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/wargroup.php?war=attacks*
// @grant        none
// ==/UserScript==

(function() {

  setInterval(()=>{
    var trs =document.getElementById('wargroup_list_div').getElementsByTagName('tr');
    for(let tr of trs){
      if(tr.children[1] !== undefined){
        //if(tr.children[1].innerText.match(/12 x 12, \d+-4[2]|11 x 11, \d+-4[2]/g) && tr.children[2].innerText.match(/1394/g)){
        if(tr.children[1].innerText.match(/12 x 12, \d+-4[2]/g) && tr.children[2].innerText.match(/1394/g)){
          tr.style.backgroundColor ='red'
          for(let link of tr.querySelectorAll('a')){
            if(link.innerText.match(/вступить/g)){
              link.click()
            }
          }
        }
      }
    }
  }, 1e3)

//setTimeout(()=>{location.reload()}, 3e3)

})();