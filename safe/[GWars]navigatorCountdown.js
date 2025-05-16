// ==UserScript==
// @name         [GWars] Navigator Countdown
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  Расширенная информация по навигатору с цветовой индикацией и таймером
// @author       Mr.Bonanno
// @match        https://www.gwars.io/me.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gwars.io
// @grant        none
// ==/UserScript==

;(function () {
    const NAV_RECOVERY_MINUTES = 420
    const COLOR_GREY = '#AAAAAA'
    const COLOR_RED = '#990000'

    // ДОМ элемент со значениями навигатора
    const navRoot = [...document.querySelectorAll('td.font8pt')].at(-1)

    // Берет данные по навигатору
    function getNavigatorStats() {
        const [, , current, , total] = navRoot.textContent.split(' ')
        const currentValue = Number(current)
        const maxValue = Number(total)
        const fullRecoveryTimeMs = NAV_RECOVERY_MINUTES * 60 * 1000
        const timePerPointMs = fullRecoveryTimeMs / maxValue

        return { currentValue, maxValue, timePerPointMs }
    }

    // Форматирует время ЧЧ:ММ (Ч - час, М - минута)
    function formatMsToTime(ms) {
        const minutes = Math.floor((ms / 60000) % 60)
        const hours = Math.floor(ms / 3600000)
        return `${padZero(hours)}:${padZero(minutes)}`
    }

    function padZero(num) {
        return num < 10 ? `0${num}` : num
    }

    // Генерирует ХТМЛ информацию о состоянии навигатора
    function buildNavigatorDisplay({ currentValue, maxValue, timePerPointMs }) {
        const percent = (currentValue * 100) / maxValue
        const remainingTimeMs = (maxValue - currentValue) * timePerPointMs

        const now = new Date()
        const readyTime = new Date(now.getTime() + remainingTimeMs)
        const formattedDiff = formatMsToTime(readyTime - now)
        const [hours, minutes] = readyTime.toTimeString().split(':')

        const isLow = currentValue <= maxValue * 0.8
        const isFull = percent === 100

        const currentValueHtml = `<span style="color:${
            isLow ? COLOR_GREY : ''
        }">${currentValue}</span>`
        const percentHtml = `<b style="color:${
            isFull ? COLOR_RED : ''
        }">${percent.toFixed(1)}%</b>`

        return `
            <span>
                <b>Заряд навигатора:</b> ${currentValueHtml}/${maxValue} (${percentHtml}) |
                <b>Время зарядки:</b> ${formattedDiff} (${hours}:${minutes})
            </span>
        `
    }

    // Обновляет значение по таймеру восстановления
    function startNavigatorTimer(container, navStats) {
        let currentValue = navStats.currentValue

        container.innerHTML = buildNavigatorDisplay(navStats)

        const timer = setInterval(() => {
            if (currentValue >= navStats.maxValue) {
                clearInterval(timer)
                return
            }

            currentValue++
            container.innerHTML = buildNavigatorDisplay({
                ...navStats,
                currentValue,
            })
        }, navStats.timePerPointMs)
    }

    // Рендер блока навигатора в ДОМ
    function insertNavigatorBar() {
        const infoCell = document.querySelector('#paramsdiv').closest('td')
        const navigatorDiv = document.createElement('div')

        navigatorDiv.id = 'navigator-info'
        Object.assign(navigatorDiv.style, {
            margin: '15px -5px -5px',
            padding: '6px 0',
            backgroundColor: '#d0eed0',
            textAlign: 'center',
            fontWeight: 'normal',
            color: '#336633',
        })

        navRoot.closest('tr').remove()
        infoCell.append(navigatorDiv)

        const stats = getNavigatorStats()
        startNavigatorTimer(navigatorDiv, stats)
    }

    // Наблюдение за динамическими изменениями ДОМ
    function setupObserver() {
        const container = document.querySelector('.gw-container')

        const observer = new MutationObserver(() => {
            if (!container.querySelector('#navigator-info')) {
                insertNavigatorBar()
            }
        })

        observer.observe(container, { childList: true, subtree: true })
    }

    // ЗАПУСК
    insertNavigatorBar()
    setupObserver()
})()
