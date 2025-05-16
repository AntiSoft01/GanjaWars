// ==UserScript==
// @name         [GWars]highlightNPC
// @namespace    http://tampermonkey.net/
// @version      1.0
// @author       Антисофт
// @description  Добавляет красный фон и отступ к изображениям NPC на карте
// @match        https://www.gwars.io/map*
// ==/UserScript==

;(function () {
    'use strict'

    function highlightSyndImages() {
        const images = document.querySelectorAll('#mapdiv img')
        images.forEach((img) => {
            if (img.src.includes('img/synds/')) {
                img.style.backgroundColor = 'red'
                img.style.padding = '2px'
            }
        })
    }

    // Пробуем сразу и повторяем позже для динамического контента
    highlightSyndImages()
    const observer = new MutationObserver(highlightSyndImages)
    observer.observe(document.getElementById('mapdiv'), {
        childList: true,
        subtree: true,
    })
})()
