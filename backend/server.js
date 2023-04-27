const express = require('express')
const http = require('http')


app = express()

app.use(express.static(__dirname + '/public'))
http.createServer(app).listen(3000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/static/html/index.html')
})

