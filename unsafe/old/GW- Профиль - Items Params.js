// ==UserScript==
// @name         GW- Профиль - Items Params
// @namespace    W_or_M
// @version      0.1
// @description  Расширенная информация о предметах персонажа
// @author       W_or_M
// @match        https://www.gwars.ru/info.php?id=*
// @grant        none
// ==/UserScript==

(() => {
  const links = [...document.querySelectorAll('td[valign="top"] > a[title]')];
  if (!links || !links.length) {
    return;
  }
  links.forEach(link => {
    const title = link.getAttribute('title');
    const info = document.createElement('span');
    const [,paramValue] = title.split(': ');
    info.style = 'font-size: 10px;color: black;font-weight:800;';
    info.innerHTML = ` ▀▀▀[${paramValue}]`;
    link.parentElement.appendChild(info);
  });
})();