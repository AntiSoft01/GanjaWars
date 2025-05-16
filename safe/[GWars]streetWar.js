// ==UserScript==
// @name         [GWars]streetWar
// @namespace    http://tampermonkey.net/
// @version      2.1
// @author       Антисофт
// @description  Анализ хп и наличие кнопки "Создать заявку"
// @match        https://www.gwars.io/wargroup.php?war=street*
// @grant        none
// ==/UserScript==

;(function () {
    const setRedSquareFavicon = () => {
        const canvas = document.createElement('canvas')
        canvas.width = 32
        canvas.height = 32

        const ctx = canvas.getContext('2d')
        ctx.fillStyle = 'red'
        ctx.fillRect(0, 0, 32, 32)

        const faviconURL = canvas.toDataURL('image/png')

        const oldIcons = document.querySelectorAll(
            'link[rel="icon"], link[rel="shortcut icon"]'
        )
        oldIcons.forEach((icon) => icon.remove())

        const link = document.createElement('link')
        link.rel = 'icon'
        link.href = faviconURL
        document.head.appendChild(link)
    }

    function isCreateBattleButtonVisible() {
        return [...document.querySelectorAll('a')].some(
            (a) =>
                a.href.includes('/wargroup.php?war=street') &&
                a.textContent.includes('Создать заявку на бой')
        )
    }

    function checkHP() {
        const hpDiv = document.querySelector('#hpheader')
        if (!hpDiv) return

        const match = hpDiv.innerText.match(/\[(\d+)\s*\/\s*(\d+)\]/)
        if (!match) return

        const currentHP = parseInt(match[1], 10)
        const maxHP = parseInt(match[2], 10)
        const percent = currentHP / maxHP

        const createButtonExists = isCreateBattleButtonVisible()

        if (percent >= 0.8 && createButtonExists) {
            setRedSquareFavicon()
        } else {
            console.log('Мало HP или кнопки нет')
        }
    }

    setInterval(checkHP, 1000)
})()
