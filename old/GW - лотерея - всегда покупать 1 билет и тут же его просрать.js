// ==UserScript==
// @name         GW - лотерея - всегда покупить 1 билет
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/realty.php*
// @grant        none
// ==/UserScript==
(()=>{
  let [ticket, winrate] = document.querySelector('.greenlightbg').querySelectorAll('font')
  if(ticket.innerText === '1'){
    //если билет уже куплен то обновить страницу через 3 секунды
    setTimeout(()=>{location.reload()}, 3e3)
  }else{
    //купить билет
    document.querySelectorAll('form')[1].submit()
  }
})();