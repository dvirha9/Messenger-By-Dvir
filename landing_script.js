var nickname_input = document.getElementById("nickname-input");
var room_input = document.getElementById("room-input");
var connect_btn = document.getElementById("connect-btn");

connect_btn.onclick = function() {
    if (room_input.value.trim().length != 0 && nickname_input.value.trim().length != 0 && nickname_input.value.trim().length < 11) {
        document.cookie = "nickname=" + nickname_input.value.trim();
        document.cookie = "room-name=" + room_input.value.trim() + ";";
        window.location.href = "chat.html"
    }
    else{
        if(room_input.value.trim().length == 0) room_input.style.borderColor = "red"
        else room_input.style.borderColor = "gray"
        if(nickname_input.value.trim().length == 0 || nickname_input.value.trim().length >= 11) nickname_input.style.borderColor = "red"
        else nickname_input.style.borderColor = "gray"
    }
};