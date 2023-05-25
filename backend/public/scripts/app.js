//"use strict";

//import $ from 'jquery'
//var $ = require("jquery");

class Schedule {
    constructor(channel, scheduleTime, scheduleItems) {
        this.channel = channel
        this.scheduleTime = scheduleTime
        this.scheduleItems = scheduleItems
    }

    getHTML() {
        return `<div class="grid-element">
                    <a href="../html/${this.channel.link}">
                    <img src="./static/images/${this.channel.image}">
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


function addNewChannel(scheduleObjects) {
    console.log(scheduleObjects)
    const newChannel = {"dayOfWeek": "Вчера", "channel": "Россия 1", "scheduleTime": ["05:00", "11:00", "14:55", "23:25"], "scheduleProgram": ["Утро России", "Вести", "Кто против?", "Вечер с Владимиром Соловьёвым"]}
    $.post('addchannel', newChannel, function(res) {
        console.log("Мы отправили данные и получили ответ сервера!");
        console.log(res);
        scheduleObjects.push(newChannel)
    })
}

function deleteChannel(scheduleObjects) {
    console.log(scheduleObjects.pop()._id)
    $.ajax({
        url: 'deletechannel/' + scheduleObjects.pop()._id,
        type: 'DELETE',
        contentType: 'application/json'
    }).done(function(res) {
        console.log(res)
    })
}

$(document).ready(() => {
    console.log("hello, world!");

    $.getJSON("/yesterdayTvPrograms.json", scheduleObjects => {
        let tomorrowSchedule = new Array();
        let yesterdaySchedule = new Array();
        let channelInfo = new Array();

        console.log(scheduleObjects)

        scheduleObjects.forEach(element => {
            if (element.dayOfWeek === 'Вчера') {
                yesterdaySchedule.push(element)
                
            }
            else if (element.dayOfWeek === 'Завтра') {
                tomorrowSchedule.push(element)
            }
        });

        const yesterdayChannels = yesterdaySchedule.map(schedule => {return schedule.channel})
        const yesterdayScheduleTime = yesterdaySchedule.map(schedule => {return schedule.scheduleTime})
        const yesterdayScheduleItems = yesterdaySchedule.map(schedule => {return schedule.scheduleProgram})

        //const tomorrowChannels = tomorrowSchedule.map(schedule => {return schedule.channel})
        const tomorrowScheduleTime = tomorrowSchedule.map(schedule => {return schedule.scheduleTime})
        const tomorrowScheduleItems = tomorrowSchedule.map(schedule => {return schedule.scheduleProgram})

        for(let i = 0; i < yesterdayChannels.length; i++) {
            if (yesterdayChannels[i] === 'Первый канал') {
                const firstChannel = new Channel('first-channel.html', 'first-channel-icon.png', yesterdayChannels[i]);
                const firstChannelSchedule = new Schedule(firstChannel, yesterdayScheduleTime[i], yesterdayScheduleItems[i])
                channelInfo.push(firstChannelSchedule)
            }
            else if (yesterdayChannels[i] === 'Россия 1') {
                const russiaOneChannel = new Channel('russia-1-channel.html', 'Russia-one-icon.png', yesterdayChannels[i]);
                const russiaOneChannelSchedule = new Schedule(russiaOneChannel, yesterdayScheduleTime[i], yesterdayScheduleItems[i])
                channelInfo.push(russiaOneChannelSchedule)
            }
            else if (yesterdayChannels[i] === 'СТС'){
                const stsChannel = new Channel('sts-channel.html', 'Logo_СТС_23-10-2017.png', yesterdayChannels[i]);
                const stsChannelSchedule = new Schedule(stsChannel, yesterdayScheduleTime[i], yesterdayScheduleItems[i])
                channelInfo.push(stsChannelSchedule)
            }
        }

        console.log(channelInfo)

        $('.yesterday-item').on('click', () => {
            $('.grid-container').empty()

            channelInfo.forEach(element => {
                element.setSchedule(element.getHTML())
                console.log(element)
            })
        })

        $('.tomorrow-item').on('click', () => {
            $('.grid-container').empty()
            const firstChannelSchedule = new Schedule(firstChannel, tomorrowScheduleTime[0], tomorrowScheduleItems[0])
            const russiaOneChannelSchedule = new Schedule(russiaOneChannel, tomorrowScheduleTime[1], tomorrowScheduleItems[1])
            const stsChannelSchedule = new Schedule(stsChannel, tomorrowScheduleTime[2], tomorrowScheduleItems[2])

            firstChannelSchedule.setSchedule(firstChannelSchedule.getHTML())
            russiaOneChannelSchedule.setSchedule(russiaOneChannelSchedule.getHTML())
            stsChannelSchedule.setSchedule(stsChannelSchedule.getHTML())
        })

        $('.input-field-button-add').on('click', function() {
            console.log("Нажал добавить!!!")
            addNewChannel(scheduleObjects)
        })

        $('.input-field-button-delete').on('click', function() {
            console.log("Нажал!!!")
            deleteChannel(scheduleObjects)
        })

        // $('.admin').on('click', function() {
        //     //$.get('admin')
        //     //inputField()
        // })

        channelInfo.forEach(element => {
            element.setSchedule(element.getHTML())
            console.log(element)
        })

        // $('.admin').on('click', function() {
        //     //$.get('/admin')
        //     inputField()
        // })
    })
}) 