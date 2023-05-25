const mongoose = require('mongoose')
//const Schedule = require('./models/Schedule')
const Schedule = require('../models/Schedule')

class AdminController {
    addNewChannel(req, res) {
        console.log("Получил запрос на добавление")
        const newChannel = new Schedule({
            "dayOfWeek": req.body.dayOfWeek, "channel": req.body.channel,
            "scheduleTime": req.body.scheduleTime, "scheduleProgram": req.body.scheduleProgram
        });
    
        newChannel.save().then((result) => {
            console.log(result)
            Schedule.find({}).then(res.send(result))
        })
    }

    deleteChannel(req, res) {
        console.log("Получил запрос на удаление!!!")
        const { _id } = req.params

        Schedule.deleteOne({ "_id": _id }).then(result => {
            console.log("Запись удалена!!!")
            res.send(result)
        })
    }
}

module.exports = new AdminController()