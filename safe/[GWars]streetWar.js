// ==UserScript==
// @name [GWars]streetWar
// @namespace http://tampermonkey.net/
// @version 2.0
// @description Анализ хп и существует ли кнопка создать бой
// @author       You
// @match        https://www.gwars.io/wargroup.php?war=street*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gwars.io
// @grant        none
// ==/UserScript==

;(function () {
    const setRedSquareFavicon = () => {
        // create canvas (red square)
        const canvas = document.createElement('canvas')
        canvas.width = 32
        canvas.height = 32

        const ctx = canvas.getContext('2d')
        ctx.fillStyle = 'red'
        ctx.fillRect(0, 0, 32, 32)

        const faviconURL = canvas.toDataURL('image/png')

        // delete old favicon
        const oldIcons = document.querySelectorAll(
            'link[rel="icon"], link[rel="shortcut icon"]'
        )
        oldIcons.forEach((icon) => icon.remove())

        // create new favicon
        const link = document.createElement('link')
        link.rel = 'icon'
        link.href = faviconURL
        document.head.appendChild(link)
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

        if (percent > 0.8 && createButtonExists) {
            setRedSquareFavicon()
        } else {
            console.log('Мало HP или кнопки нет')
        }
    }

    function isCreateBattleButtonVisible() {
        return (
            document.querySelector(
                'a[href*="wargroup.php?war=street&form=1"]'
            ) !== null
        )
    }

    setInterval(checkHP, 2e3)
})
