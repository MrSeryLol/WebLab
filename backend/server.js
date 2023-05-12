const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const Schedule = require('./models/Schedule')
const mongoose = require('mongoose')
const http = require('http')

const uri = 'mongodb+srv://psygentelmen014:1234GvOzd123@cluster0.j34hpbs.mongodb.net/?retryWrites=true&w=majority'



app = express()

async function run() {
    await mongoose.connect("mongodb://127.0.0.1:27017/tv-program").then((res) => console.log("Подключение к БД")).catch((err) => console.log(`Ошибка ${err}`));
}
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("tv-program").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//          // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir)

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

mongoose.connect("mongodb://127.0.0.1:27017/tv-program")
    .then((res) => console.log("Подключение к БД"))
    .catch((err) => console.log(`Ошибка ${err}`));

// const scheduleSchema = new mongoose.Schema({
//     dayOfWeek: String,
//     channel: String,
//     scheduleTime: [String],
//     scheduleProgram: [String]
// })

//const Schedule = mongoose.model('Schedule', scheduleSchema)

http.createServer(app).listen(3000);

app.get('/yesterdayTvPrograms.json', (req, res) => {
    // console.log("JSON вызван")
    // res.json(jsonData)
    //console.log(Schedule.find())
    Schedule.find().then((jsonData) => {
        res.json(jsonData)
    })
    // Schedule.find({}, (err, jsonData) => {
    //     res.json(jsonData)
    // })
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
    //const newChannel = req.body
    //res.json(req.body)
    // console.log(newChannel)
    const newChannel = new Schedule({
        "dayOfWeek": req.body.dayOfWeek, "channel": req.body.channel,
        "scheduleTime": req.body.scheduleTime, "scheduleProgram": req.body.scheduleProgram
    });

    newChannel.save().then((result) => {
        Schedule.find({}).then(res.send(result))
    })

    // newChannel.save((err, result) => {
    //     if (err != null) {
    //         console.log(err)
    //         res.send("ERROR")
    //     } else {
    //         Schedule.find({}, (err, result) => {
    //             if (err != null) {
    //                 res.send("ERROR")
    //             }
    //             res.send(result)
    //         })
    //     }
    // });
    //jsonData.push(newChannel)
    // console.log("Данные отправлены на сервер")
    // res.json({ "message": "Вы размещаетесь на сервер" })
})

