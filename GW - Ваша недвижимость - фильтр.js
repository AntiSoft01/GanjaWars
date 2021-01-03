// ==UserScript==
// @name         GW - Ваша недвижимость - фильтр
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.gwars.ru/info.realty.php?id=2365045
// @grant        none
// ==/UserScript==
(function() {
  'use strict';
  const table = [...document.getElementsByTagName('td')].find(item => item.innerText.search('Тип') >= 0).closest('table');
  const container = document.createElement('div');
  container.style.cssText = 'margin: 0 auto 15px; width: 800px;';
  container.innerHTML = `
      <b>Сортировать по острову:</b>
      <label><input type="radio" class="filter-element" name="island" value="all" checked> Все</label>
      <label><input type="radio" class="filter-element" name="island" value="g"> [G]</label>
      <label><input type="radio" class="filter-element" name="island" value="z"> [Z]</label>
      <label><input type="radio" class="filter-element" name="island" value="p"> [P]</label>
    `;
  table.parentNode.insertBefore(container, table);
  let prev = null;
  [...container.getElementsByClassName('filter-element')].forEach(item => {
    item.addEventListener('change', function() {
      if (this !== prev) {
        prev = this;
      }
      filter(this.value);
    });
  });

  function filter(value) {
    [...table.getElementsByTagName('tr')].forEach(item => {
      item.style.display = 'table-row';
      if (value !== 'all' && item.getElementsByTagName('td')[1].innerText.search(value.toUpperCase()) !== 1) {
        item.style.display = 'none';
      }
    });
  }
  // Your code here...
})();