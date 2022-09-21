
const socket = io("http://localhost:3000");

var send_btn = document.getElementById("send-btn");
var messenger_div = document.getElementById("messenger");
var msg_input = document.getElementById("message-input");

var room_name = getCookie("room-name");
var nickname = getCookie("nickname");
var is_in_room;
var loading_screen = document.getElementsByClassName("loading-screen")[0];
var error_screen = document.getElementsByClassName("error-screen")[0];
var chat_ul = document.getElementById("messages");
var chat = document.getElementById("chat");
var header_1 = document.getElementsByClassName("header-1")[0];

function getCookie(name){
    let cookie = {};

    document.cookie.split(';').forEach(function(el) {
        let [key,value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[name];
}

socket.emit('send-room-name', (room_name));
loading_screen.style.display = "flex"

socket.on('verify-room', (in_room) => {
    loading_screen.style.display = "none"
    is_in_room = in_room
    DisplayMessage("Welcome to room: " + room_name)
})

send_btn.onclick = function() {
    if (msg_input.value.trim().length != 0){
        DisplayMessage(msg_input.value.trim(), 0, nickname)
        socket.emit('send-message', msg_input.value.trim(), room_name, nickname)
        chat.scrollTo(0, chat.scrollHeight);
    }
    msg_input.value = ""
};

msg_input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
        send_btn.click();
    }
});

socket.on("receive-message", (message, sender_nickname) => {
    DisplayMessage(message, 1, sender_nickname)
})


socket.on("disconnect", (reason) => {
    error_screen.style.display = "flex"
  });

function DisplayMessage(msg, sender, sender_name){
    let id;
    if (sender === 0){
        id = "i-sent"
    }
    else{
        id = "he-sent"
    }
    let to_scroll = false
    if (chat.scrollTop === (chat.scrollHeight - chat.offsetHeight)){
        to_scroll = true;
    }
    let li = document.createElement("li");
    let div = document.createElement("div");
    let sender_div = document.createElement("h4");
    let msg_div = document.createElement("h3");
    let time_div = document.createElement("h5");
    sender_div.appendChild(document.createTextNode(sender_name));
    msg_div.appendChild(document.createTextNode(msg));
    time_div.appendChild(document.createTextNode(GetTime()));
    if (typeof sender_name !== 'undefined'){
        li.appendChild(sender_div);
    }
    div.appendChild(msg_div);
    li.appendChild(div);
    li.appendChild(time_div);
    chat_ul.appendChild(li);
    li.classList.add(id);
    if (to_scroll){
        chat.scrollTo(0, chat.scrollHeight);
    }
};

function GetTime(){
    let today = new Date()
    let minutes;
    let hours;
    if (today.getMinutes().toString().length === 1){
        minutes = "0" + today.getMinutes()
    }
    else{
        minutes = today.getMinutes()
    }
    if (today.getHours().toString().length === 1){
        hours = "0" + today.getHours()
    }
    else{
        hours = today.getHours()
    }
    return (hours + ":" + minutes)
}