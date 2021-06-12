let socket = io()


$('#login').show();
$('#chatbox').hide();

$('#loginbtn').click(() => {
    socket.emit('username', {
        name: $('#username').val()
    })
    $('#login').hide();
    $('#chatbox').show();
})

socket.on('alert', (data) => {
    window.alert(`new user "${data.name}" joined chat `)
})

$('#send').click(() => {
    let div = document.createElement('div')
    $(div).addClass('right').text('you :' + $('#sendmsg').val()).appendTo($('#chatbody'))
    socket.emit('sndmsg', {
        usr: $('#userid').val(),
        msg: $('#sendmsg').val()
    })
    $('#sendmsg').val('')
})

socket.on('msgrcvd', (data) => {
    let div = document.createElement('div')
    $(div).addClass('left').text(`
    ${data.usrs} : ${data.msgdata}
    `).appendTo($('#chatbody'))
    let audio = document.getElementById('tune')
    audio.play();
})