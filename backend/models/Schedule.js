const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scheduleSchema = new Schema({
    dayOfWeek: { type: String },
    channel: { type: String },
    scheduleTime: [ String ],
    scheduleProgram: [ { type: String }]
})

module.exports = mongoose.model('schedules', scheduleSchema)