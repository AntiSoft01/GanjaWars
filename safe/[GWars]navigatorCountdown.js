// ==UserScript==
// @name         [GWars] Navigator Countdown + Progress Bar
// @namespace    http://tampermonkey.net/
// @version      1.2.0
// @description  Навигатор с цветами, таймером и визуальной шкалой прогресса
// @author       Mr.Bonanno (после дополнен и переписан Антисофт)
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

    // Создает ХТМЛ шкалы прогресса (10 делений)
    function buildProgressBar(current, max) {
        const totalSegments = 10
        const filledSegments = Math.floor((current / max) * totalSegments)

        const segments = Array.from({ length: totalSegments }, (_, i) => {
            const filled = i < filledSegments
            return `<div style="
                flex: 1;
                height: 6px;
                margin: 0 1px;
                background-color: ${filled ? '#66cc66' : '#cccccc'};
                border-radius: 2px;"></div>`
        })

        return `<div style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 5px;">${segments.join('')}</div>`
    }

    // Генерирует ХТМЛ информацию по навигатору
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
            <div>
                <b>Заряд навигатора:</b> ${currentValueHtml}/${maxValue} (${percentHtml}) |
                <b>Время зарядки:</b> ${formattedDiff} (${hours}:${minutes})
                ${buildProgressBar(currentValue, maxValue)}
            </div>
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
