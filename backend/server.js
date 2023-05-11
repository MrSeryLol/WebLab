const express = require('express')
const http = require('http')


app = express()

jsonData = [
    {
        "dayOfWeek": "Вчера",
        "channel": "Первый канал",
        "scheduleTime": ["04:00", "06:30", "10:00", "20:00"],
        "scheduleProgram": ["Время", "Жить Здорово", "Мужское / Женское", "Большая игра"]
    },
    {
        "dayOfWeek": "Вчера",
        "channel": "Россия 1",
        "scheduleTime": ["05:00", "09:55", "17:30", "23:25"],
        "scheduleProgram": ["Утро России", "О самом главном", "60 минут", "Вечер с Владимиром Соловьёвым"]
    },
    {
        "dayOfWeek": "Вчера",
        "channel": "СТС",
        "scheduleTime": ["07:00", "09:00", "19:00", "02:35"],
        "scheduleProgram": ["Лунтик", "Уральские пельмени", "Против всех", "Последний из Магикян"]
    },
    {
        "dayOfWeek": "Завтра",
        "channel": "Первый канал",
        "scheduleTime": ["05:00", "10:40", "16:15", "23:00"],
        "scheduleProgram": ["Телеканал \"Доброе утро\"", "Информационный канал", "Мужское / Женское", "Большая игра"]
    },
    {
        "dayOfWeek": "Завтра",
        "channel": "Россия 1",
        "scheduleTime": ["05:00", "11:00", "14:55", "23:25"],
        "scheduleProgram": ["Утро России", "Вести", "Кто против?", "Вечер с Владимиром Соловьёвым"]
    },
    {
        "dayOfWeek": "Завтра",
        "channel": "СТС",
        "scheduleTime": ["06:00", "10:20", "12:50", "23:00"],
        "scheduleProgram": ["Ералаш", "Пассажир", "Ивановы-Ивановы", "Новые мутанты"]
    }
]

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }));
http.createServer(app).listen(3000);

app.get('/yesterdayTvPrograms.json', (req, res) => {
    console.log("JSON вызван")
    res.json(jsonData)
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/static/html/index.html')
    console.log("Вызвана страница")
    //res.json(jsonData)
})

app.get('/first-channel', (req, res) => {
    res.sendFile(__dirname + '/public/static/html/first-channel.html')
})

app.get('/russia-1-channel', (req, res) => {
    res.sendFile(__dirname + '/public/static/html/russia-1-channel.html')
})

app.get('/sts-channel', (req, res) => {
    res.sendFile(__dirname + '/public/static/html/sts-channel.html')
})

app.post('/addchannel', (req, res) => {
    const newChannel = req.body
    console.log(newChannel)
    jsonData.push(newChannel)
    console.log("Данные отправлены на сервер")
    res.json({"message": "Вы размещаетесь на сервер"})
})

