// ==UserScript==
// @name         GanjaWars.net - Control Panel - Free
// @namespace    Global
// @version      0.1
// @description  Панель управления скриптов GanjaWars.net
// @author       Антисофт
// @match        https://www.gwars.ru/*
// @grant        none
// ==/UserScript==

// // TODO: obfuscate and minimize everything, export to backend
// (() => {
//   const _ = document.createElement('script')
//   _.type = 'text/javascript'
//   _.src = 'https://ganjawars.net/test.js'
//   _.crossorigin = "anonymous"
//   document.head.appendChild(_)
//   eval(_)
// })();

// https://images.gwars.ru/q-new/mushroom.gif


(function() {
  let css = `
  <style>

    .show{display: flex !important; }

    #plugin{
      position: fixed;
      right: 0;
      bottom: 0;
      border: 1px solid #d0eed0;
    }
    #plugin ._plugin__close_button{
      margin: 0 !important;
      position: fixed;
      width: 30px;
      height: 30px;
      font-size: large;
      padding: 0;
      bottom: 0;
      right: 0;
    }
    #main {
      display: none;
      flex-direction: column;
      width: 400px;
    }

    .block {
      display: flex;
      flex-direction: column;
      background-color: #e0eee0;

    }
    .block:nth-child(1){
      background-color: #d0eed0;
      text-align: center;
    }

    .block h1{
      color:#990000;
    }
    .block h2, .block h3{
      color:#004400;
      background-color: #d0f5d0;
      text-align: center;
      border-bottom: 1px solid #f2fdf2;
      border-top: 1px solid #f2fdf2;
    }
    .block h3{
      color:#004400;
      background-color: #e0eee0;
      text-align: center;
    }

    .block .option{
      padding: 5px;
    }


  </style>
`
  let html = `
  <div id="plugin">
    <button class="_plugin__close_button moveBtn">⛳</button>
    <div id="main">
      <div class="block">
        <h1>Безопасные скрипты</h1>
      </div>
      <div class="block">
        <h2>Общие настройки</h2>
        <div class="option">
          <label><input type="checkbox" id="gw_script_antiludoman"> Антилудоман</label>
        </div>
      </div>
      <div class="block">
        <h2>Аут</h2>
        <div class="option">
          <label><input type="checkbox"> Миникарта сейфов</label>
        </div>
        <div class="option">
          Подсветить поков
          <label><input type="checkbox" name="pokemon1" value="value">1</label>
          <label><input type="checkbox" name="pokemon2" value="value">2</label>
          <label><input type="checkbox" name="pokemon3" value="value">3</label>
        </div>
        <div class="option">
          <h3>Подсветить лут</h3>
          <div class="_loot_selection">
            <img src="https://images.gwars.ru/q-new/mushroom.gif" class="loot mushroom" alt="mushroom"/>
            <img src="https://images.gwars.ru/q-new/weedset.gif" class="loot weedset" alt="weedset"/>
            <img src="https://images.gwars.ru/q-new/perch.gif" class="loot perch" alt="perch"/>
            <img src="https://images.gwars.ru/q-new/rwater.gif" class="loot rwater" alt="rwater"/>
            <img src="https://images.gwars.ru/q-new/coffee.gif" class="loot coffee" alt="coffee"/>
            <img src="https://images.gwars.ru/q-new/dinamit.gif" class="loot dinamit" alt="dinamit"/>
            <img src="https://images.gwars.ru/q-new/bandage.gif" class="loot bandage" alt="bandage"/>
            <img src="https://images.gwars.ru/q-new/travelkit.gif" class="loot travelkit" alt="travelkit"/>
            <img src="https://images.gwars.ru/q-new/stimpack_iddqd.gif" class="loot stimpack_iddqd" alt="stimpack_iddqd"/>
            <img src="https://images.gwars.ru/q-new/stimpack_spd.gif" class="loot stimpack_spd" alt="stimpack_spd"/>
            <img src="https://images.gwars.ru/q-new/stimpack_armour.gif" class="loot stimpack_armour" alt="stimpack_armour"/>
            <img src="https://images.gwars.ru/q-new/stimpack_dmg.gif" class="loot stimpack_dmg" alt="stimpack_dmg"/>
            <img src="https://images.gwars.ru/q-new/expbook.gif" class="loot expbook" alt="expbook"/>
            <img src="https://images.gwars.ru/q-new/cash.gif" class="loot cash" alt="cash"/>
            <img src="https://images.gwars.ru/q-new/maskp.gif" class="loot maskp" alt="maskp"/>
            <img src="https://images.gwars.ru/q-new/hk53.gif" class="loot hk53" alt="hk53"/>
            <img src="https://images.gwars.ru/q-new/stimpack_dmg_xl.gif" class="loot stimpack_dmg_xl" alt="stimpack_dmg_xl"/>
            <img src="https://images.gwars.ru/q-new/stimpack_iddqd_xl.gif" class="loot stimpack_iddqd_xl" alt="stimpack_iddqd_xl"/>
            <img src="https://images.gwars.ru/q-new/stimpack_armour_xl.gif" class="loot stimpack_armour_xl" alt="stimpack_armour_xl"/>
            <img src="https://images.gwars.ru/q-new/l83a1.gif" class="loot l83a1" alt="l83a1"/>
            <img src="https://images.gwars.ru/q-new/m84.gif" class="loot m84" alt="m84"/>
          </div>
        </div>
      </div>
    </div>
  </div>
`
  document.head.insertAdjacentHTML('beforeend', css)
  document.body.insertAdjacentHTML('beforeend', html)


  let btn = document.querySelector('._plugin__close_button')
  let main = document.querySelector('#plugin #main')
  if(localStorage.controlPanel_show === '1'){
    main.className = 'show'
    btn.className = '_plugin__close_button'
  }else{
    main.className = ''
    btn.className = '_plugin__close_button moveBtn'
  }
  btn.addEventListener('click', ()=>{
    if(localStorage.controlPanel_show === '0'){
      main.classList.toggle('show')
      localStorage.controlPanel_show = '1'
    }else{
      main.classList.toggle('show')
      localStorage.controlPanel_show = '0'
    }
  })

  const antiludoman = document.getElementById('gw_script_antiludoman')
  antiludoman.addEventListener('click', ()=>{
    let el = document.getElementById('gw_script_antiludoman')
    if(el.checked){
      localStorage.gw_script_antiludoman ='1'
    }else{
      localStorage.gw_script_antiludoman ='0'
    }
  })

  function gw_script_antiludoman_load(){
    if (localStorage.gw_script_antiludoman ==='1'){
      document.getElementById('gw_script_antiludoman').checked = true
      // action
      if(!!location.pathname.match(/roulette|realty/) || !!location.href.match(/object\.php\?id=78109/)){
        location.href = 'https://www.gwars.ru/info.php?id='
      }
    }else{
      document.getElementById('gw_script_antiludoman').checked = false
    }
  }
  gw_script_antiludoman_load()



})();