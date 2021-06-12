const express = require('express')
const app = express();
const http = require('http')
const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server)

let users = {}

io.on('connection', (socket) => {
    // console.log('new connection has been made from id : ', socket.id)

    socket.on('username', (data) => {
        socket.join(data.name)
        users[socket.id] = data.name
        console.log(users)
        socket.broadcast.emit('alert', {
            name: data.name
        })
    })
    socket.on('sndmsg', (data) => {
        data.usrs = users[socket.id]
        if (data.usr) {
            io.to(data.usr).emit('msgrcvd', {
                usrs: data.usrs,
                msgdata: data.msg
            })
        } else {
            socket.broadcast.emit('msgrcvd', {
                usrs: data.usrs,
                msgdata: data.msg
            })
        }
    })
})

app.use('/', express.static(__dirname + '/public'))

server.listen(3333, () => {
    console.log('server runnig at http://127.0.0.1:3333')
})