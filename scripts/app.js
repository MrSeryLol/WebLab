"use strict";

class Schedule {
    items = 3
    constructor(channel, scheduleTime, scheduleItems) {
        this.channel = channel
        this.scheduleTime = scheduleTime
        this.scheduleItems = scheduleItems
    }

    getHTML() {
        return `<div class="grid-element">
                    <a href="../html/${this.channel.link}">
                    <img src="../images/${this.channel.image}">
                    <h2>${this.channel.name}</h2>
                    </a>
                    <ul class="grid-events">
                        <li>
                            <a class="link-grid-item-time">
                            <time>${this.scheduleTime[0]}</time>
                            <h3 class="grid-item">${this.scheduleItems[0]}</h3>
                            </a>
                        </li>
                        <li>
                            <a class="link-grid-item-time">
                            <time>${this.scheduleTime[1]}</time>
                            <h3 class="grid-item">${this.scheduleItems[1]}</h3>
                            </a>
                        </li>
                        <li>
                            <a class="link-grid-item-time">
                            <time>${this.scheduleTime[2]}</time>
                            <h3 class="grid-item">${this.scheduleItems[2]}</h3>
                            </a>
                        </li>
                        <li>
                            <a class="link-grid-item-time">
                            <time>${this.scheduleTime[3]}</time>
                            <h3 class="grid-item">${this.scheduleItems[3]}</h3>
                            </a>
                        </li>
                    </ul>
                </div>`
    }

    setSchedule(newElem) {
        $('.grid-container').append(newElem)
    }
}

class Channel {
    constructor(link, image, name) {
        this.link = link
        this.image = image
        this.name = name
    }
}



$(document).ready(() => {
    console.log("hello, world!");

    const firstChannel = new Channel('first-channel.html', 'first-channel-icon.png', 'Первый канал');
    const russiaOneChannel = new Channel('russia-1-channel.html', 'Russia-one-icon.png', 'Россия 1');
    const stsChannel = new Channel('sts-channel.html', 'Logo_СТС_23-10-2017.png', 'СТС');

    $('.yesterday-item').on('click', () => {
        $('.grid-container').empty()
        const firstChannelSchedule = new Schedule(firstChannel, ['04:00', '06:30', '10:00', '20:00'], ['Время', 'Жить Здорово', 'Мужское / Женское', 'Большая игра'])
        const russiaOneChannelSchedule = new Schedule(russiaOneChannel, ['05:00', '09:55', '17:30', '23:25'], ['Утро России', 'О самом главном', '60 минут', 'Вечер с Владимиром Соловьёвым'])
        const stsChannelSchedule = new Schedule(stsChannel, ['07:00', '09:00', '19:00', '02:35'], ['Лунтик', 'Уральские пельмени', 'Против всех', 'Последний из Магикян'])

        firstChannelSchedule.setSchedule(firstChannelSchedule.getHTML())
        russiaOneChannelSchedule.setSchedule(russiaOneChannelSchedule.getHTML())
        stsChannelSchedule.setSchedule(stsChannelSchedule.getHTML())
    })

    $('.tomorrow-item').on('click', () => {
        $('.grid-container').empty()
        const firstChannelSchedule = new Schedule(firstChannel, ['05:00', '10:40', '16:15', '23:00'], ['Телеканал "Доброе утро"', 'Информационный канал', 'Мужское / Женское', 'Большая игра'])
        const russiaOneChannelSchedule = new Schedule(russiaOneChannel, ['05:00', '11:00', '14:55', '23:25'], ['Утро России', 'Вести', 'Кто против?', 'Вечер с Владимиром Соловьёвым'])
        const stsChannelSchedule = new Schedule(stsChannel, ['06:00', '10:20', '12:50', '23:00'], ['Ералаш', 'Пассажир', 'Ивановы-Ивановы', 'Новые мутанты'])

        firstChannelSchedule.setSchedule(firstChannelSchedule.getHTML())
        russiaOneChannelSchedule.setSchedule(russiaOneChannelSchedule.getHTML())
        stsChannelSchedule.setSchedule(stsChannelSchedule.getHTML())
    })
}) 