// ==UserScript==
// @name [GWars]makeColorOutland
// @namespace http://tampermonkey.net/
// @version 2.0
// @description Красим информацию о покемонах, лут, клетки вокруг покемонов
// @author Mr.Bonanno
// @match https://www.gwars.io/walk*
// @icon https://www.google.com/s2/favicons?domain=gwars.io

// @require https://raw.githubusercontent.com/AntiSoft01/GanjaWars/refs/heads/main/2025/functions.js

// @grant none
// ==/UserScript==
;(() => {
    'use strict'

    utils.sayHello('Bonano')

    //=====================================Настройки======================================//
    //в фигурные скобки через запятую можно добавлять любые css-свойства в неограниченном колличестве для изменения элемента.
    //Находите в гугле интересующее свойство, убираете в названии свойства дефис(если имя свойства состоит из нескольких слов), а каждое следуещее слово пишите с большой буквы.
    //Пример:
    //CSS-свойство: font-size: '10px'; (размер шрифта)
    //То же свойство в JavsScript: fontSize: '10px',
    const settings = {
        pokemon: {
            default: {
                //указанные тут свойства действуют для всех элементов, если ниже для какого-либо элемента указать такое же свойство с другим значением, то именно для того элемента оно перезапишется.
                opacity: 1,
                boxSizing: 'border-box', //Это свойство лучше не трогать
            },
            Тройные: {
                backgroundColor: '#EC7063',
                fontSize: '10px',
                color: '#003300',
                fontWeight: '900',
            },
            Двойные: {
                backgroundColor: '#EC7063',
                fontSize: '10px',
                color: '#003300',
                fontWeight: '900',
            },
            'Меньше 100': {
                backgroundColor: '#F7DC6F',
                fontSize: '8px',
                color: '#003300',
                fontWeight: 'bold',
            },
            100: {
                backgroundColor: '#3CB371',
                color: '#003300',
                fontWeight: 'bold',
            },
            'Больше 100': {
                backgroundColor: '#3CB371',
                color: '#003300',
                fontWeight: 'bold',
            },
            'Больше 150': {
                backgroundColor: '#EC7063',
                fontSize: '10px',
                color: '#003300',
                fontWeight: 'bold',
            },
            Сложность: {
                backgroundColor: 'Tomato',
                color: '#003300',
                fontWeight: 'bold',
            },
        },
        loot: {
            default: {
                backgroundColor: '#BDB76B',
                border: '0.1px solid #008000',
                boxSizing: 'border-box',
            },
            'Свободная клетка': {
                backgroundColor: '#f29648',
                border: 'none',
            },
            'Начинается бой': {
                backgroundColor: '#f29648',
                border: 'none',
            },
            'Ожидание участников': {
                backgroundColor: '#6ad06b',
                border: 'none',
            },
            Сейф: {
                backgroundColor: 'purple',
            },
            'Родниковая вода': {},
            Гриб: {},
            'Ржавая РГД-5': {
                border: 'none',
            },
            Трава: {
                border: 'none',
            },
            Ящик: {},
            'Маскировочный плащ': {},
            'HK-53': {},
            'Вяленная рыба': {},
            'Походная аптечка': {},
            'Стимпак урона': {},
            'Стимпак скорости': {},
            'Стимпак бессмертия': {},
            'Стимпак брони': {},
            'Кофейные зерна': {},
            'Медицинский бинт': {},
            'Стимпак урона XL': {},
            'Стимпак бессмертия XL': {},
            'Стимпак брони XL': {},
            'Тяжелые ботинки': {},
            'Книга опыта': {},
            'Титановый пояс': {},
            'Шлем 2кл': {},
            'Граната L83A1': {},
            'Граната M84': {},
            Кокос: {},
            Энергетик: {},
        },
    }

    //===================================Конец Настроек===================================//

    const lootTypes = {
        // Лут
        'https://images.gwars.io/q-new/energydrink.gif': 'Энергетик',
        'https://images.gwars.io/q-new/coconut.gif': 'Кокос',
        'https://images.gwars.io/q-new/rwater.gif': 'Родниковая вода',
        'https://images.gwars.io/q-new/mushroom.gif': 'Гриб',
        'https://images.gwars.io/q-new/old_rgd5.gif': 'Ржавая РГД-5',
        'https://images.gwars.io/q-new/weedset.gif': 'Трава',
        'https://images.gwars.io/q-new/box.gif': 'Ящик',
        'https://images.gwars.io/q-new/maskp.gif': 'Маскировочный плащ',
        'https://images.gwars.io/q-new/hk53.gif': 'HK-53',
        'https://images.gwars.io/q-new/perch.gif': 'Вяленная рыба',
        'https://images.gwars.io/q-new/travelkit.gif': 'Походная аптечка',
        'https://images.gwars.io/q-new/stimpack_dmg.gif': 'Стимпак урона',
        'https://images.gwars.io/q-new/stimpack_spd.gif': 'Стимпак скорости',
        'https://images.gwars.io/q-new/stimpack_iddqd.gif':
            'Стимпак бессмертия',
        'https://images.gwars.io/q-new/stimpack_armour.gif': 'Стимпак брони',
        'https://images.gwars.io/q-new/coffee.gif': 'Кофейные зерна',
        'https://images.gwars.io/q-new/bandage.gif': 'Медицинский бинт',
        'https://images.gwars.io/q-new/stimpack_dmg_xl.gif': 'Стимпак урона XL',
        'https://images.gwars.io/q-new/stimpack_iddqd_xl.gif':
            'Стимпак бессмертия XL',
        'https://images.gwars.io/q-new/stimpack_armour_xl.gif':
            'Стимпак брони XL',
        'https://images.gwars.io/q-new/heavyboots.gif': 'Тяжелые ботинки',
        'https://images.gwars.io/q-new/expbook.gif': 'Книга опыта',
        'https://images.gwars.io/q-new/tbelt.gif': 'Титановый пояс',
        'https://images.gwars.io/q-new/helmet2.gif': 'Шлем 2кл',
        'https://images.gwars.io/q-new/cash.gif': 'Сейф',
        // Клетки покемонов
        'https://images.gwars.io/q-new/t_a.gif': 'Свободная клетка',
        'https://images.gwars.io/q-new/t_b.gif': 'Начинается бой',
        'https://images.gwars.io/q-new/t_o.gif': 'Ожидание участников',
        // Торговцы
        'https://images.gwars.io/q-new/gangster.gif': 'Торговец',
        // Подземка
        'https://images.gwars.io/q-bn/energydrink.gif': 'Энергетик',
        'https://images.gwars.io/q-bn/coconut.gif': 'Кокос',
        'https://images.gwars.io/q-bn/t_a.gif': 'Свободная клетка',
        'https://images.gwars.io/q-bn/t_b.gif': 'Начинается бой',
        'https://images.gwars.io/q-bn/t_o.gif': 'Ожидание участников',
        'https://images.gwars.io/q-bn/l83a1.gif': 'Граната L83A1',
        'https://images.gwars.io/q-bn/m84.gif': 'Граната M84',
        'https://images.gwars.io/q-bn/rwater.gif': 'Родниковая вода',
        'https://images.gwars.io/q-bn/mushroom.gif': 'Гриб',
        'https://images.gwars.io/q-bn/old_rgd5.gif': 'Ржавая РГД-5',
        'https://images.gwars.io/q-bn/weedset.gif': 'Трава',
        'https://images.gwars.io/q-bn/box.gif': 'Ящик',
        'https://images.gwars.io/q-bn/maskp.gif': 'Маскировочный плащ',
        'https://images.gwars.io/q-bn/hk53.gif': 'HK-53',
        'https://images.gwars.io/q-bn/perch.gif': 'Вяленная рыба',
        'https://images.gwars.io/q-bn/travelkit.gif': 'Походная аптечка',
        'https://images.gwars.io/q-bn/stimpack_dmg.gif': 'Стимпак урона',
        'https://images.gwars.io/q-bn/stimpack_spd.gif': 'Стимпак скорости',
        'https://images.gwars.io/q-bn/stimpack_iddqd.gif': 'Стимпак бессмертия',
        'https://images.gwars.io/q-bn/stimpack_armour.gif': 'Стимпак брони',
        'https://images.gwars.io/q-bn/coffee.gif': 'Кофейные зерна',
        'https://images.gwars.io/q-bn/bandage.gif': 'Медицинский бинт',
        'https://images.gwars.io/q-bn/stimpack_dmg_xl.gif': 'Стимпак урона XL',
        'https://images.gwars.io/q-bn/stimpack_iddqd_xl.gif':
            'Стимпак бессмертия XL',
        'https://images.gwars.io/q-bn/stimpack_armour_xl.gif':
            'Стимпак брони XL',
        'https://images.gwars.io/q-bn/heavyboots.gif': 'Тяжелые ботинки',
        'https://images.gwars.io/q-bn/expbook.gif': 'Книга опыта',
        'https://images.gwars.io/q-bn/tbelt.gif': 'Титановый пояс',
        'https://images.gwars.io/q-bn/helmet2.gif': 'Шлем 2кл',
        'https://images.gwars.io/q-bn/cash.gif': 'Сейф',
    }

    const makeColorOutland = () => {
        const getPokemonData = (elem) => {
            const pokemonData = elem.textContent.split(',')
            const count = +pokemonData[0].replace('>=', '')
            const power = +pokemonData[1]?.replace('%', '')
            const group = 'pokemon'

            const getPokemonType = (count, power) => {
                if (!power) return 'Сложность'
                if (count > 2) return 'Тройные'
                if (count > 1) return 'Двойные'
                if (count === 1 && power > 150) return 'Больше 150'
                if (power < 100) return 'Меньше 100'
                if (power === 100) return '100'
                if (power > 100) return 'Больше 100'
                return 'Unknow type'
            }

            const type = getPokemonType(count, power)
            const options = {
                ...settings.pokemon.default,
                ...settings[group][type],
            }

            return { elem, options }
        }

        const getLootData = (elem) => {
            const group = 'loot'

            const getLootType = (src) => lootTypes[src]

            const type = getLootType(elem.getAttribute('src'))
            const options = {
                ...settings.loot.default,
                ...settings[group][type],
            }

            return { elem, options }
        }

        const pokemonItems = [...document.querySelectorAll('.floatdiv')]
            .filter((item) => item.innerHTML !== '')
            .map(getPokemonData)

        const walkTable = document.querySelector('#walk_table')
        const lootItems = [...walkTable.querySelectorAll('img')]
            .filter((item) =>
                Object.keys(lootTypes).includes(item.getAttribute('src'))
            )
            .map(getLootData)

        const render = (data) => {
            const { elem, options } = data
            const content = elem.textContent
            if (content.startsWith('>=')) {
                elem.textContent = content.replace('>=', '')
            }
            Object.assign(elem.style, options)
        }

        const allItems = [...pokemonItems, ...lootItems]

        allItems.forEach(render)

        if (window.gotourl) {
            window.gotourl = function (obj) {
                const url = obj.href + '&nohead=1'
                const lastUrl = url

                $('body').load(url, function (_responseTxt, statusTxt, _xhr) {
                    if (statusTxt === 'success') {
                        makeColorOutland()
                    } else {
                        window.location.href = lastUrl
                    }
                })
                return false
            }
        }
    }

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

    const checkDeadOrNot = () => {
        const regex = /\| [0|1]\/\d+ HP \| GPS/
        const txtBlocks = document.getElementsByClassName('txt')

        if (txtBlocks.length > 1 && regex.test(txtBlocks[1].innerText)) {
            setRedSquareFavicon()
        } else {
            console.log('asd')
        }
    }
    setInterval(checkDeadOrNot, 2e3) // проверка каждые 2 секунды

    makeColorOutland()
})()
