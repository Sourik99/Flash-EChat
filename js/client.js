const socket = io('http://localhost:3000');

const form  = document.getElementById('send-container');
const messages = document.getElementById('messageInp');
const container = document.querySelector(".container");

const append1 = (messages, pos) => {
    const mes= document.createElement('div');
    mes.innerText = messages;
    mes.classList.add('message');
    mes.classList.add(pos);
    container.append(mes);
        // if(pos=='center')
        //     join.play();
        if(pos=='left')
            tone.play()
}

form.addEventListener('submit', (e) => {
        e.preventDefault();
        const mass = messages.value;
        append1(`You : ${mass}`, 'right');
        socket.emit('send', mass);
        messages.value = '';
    })
const names = prompt("Enter Your name to join: ");
socket.emit('new-user-joined' , names);

socket.on('user-joined', names => {
    append1(`${names} joined the chat`, 'right');
})
socket.on('receive', data => {
        append1(`${data.names}: ${data.message}`, 'left');
    })
// var join = new Audio('./joined.mp3')
var tone = new Audio('./message.mp3')

    
    
    
        
socket.on('leave', data => {
    append1(`${data} left the chat`, 'right');
})