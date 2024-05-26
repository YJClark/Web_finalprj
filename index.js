function callLogin(){
    document.getElementById("login-form").style.display = "block";

}

function register(){



}

function validate(){
//轉乘ascii做mod，再轉成


}

function login(checked){
    switch(checked){
        //殺手(紅色)
        case "r":

        //間諜(紫色)
        case "p":

        //清理(黃色)
        case "y":

        //管理(綠色)
        case "g":

        //一般人
        default:

    } 



}

$('#login-dialog').dialog({
    autoOpen: false,
    modal: true,
    draggable: false,
    width: 200,
    height: 200,
});
















/*
$(document).ready(function() {
    $("#login-btn").button();
    $("#login-form").dialog({
        autoOpen: false,
        modal: true,
        width: 300,
        height: 200,
        buttons: {
            "Login": function() {
                login();
                $(this).dialog("close");
            }
        }
    });
    $("#login-btn").click(function() {
        $("#login-form").dialog("open");
    });
});

document.getElementById("call-login").addEventListener("click", function(){
    document.getElementById("login-form").style.display = "block";
});


        function validateLogin() {
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            if (username === '' || password === '') {
                alert('Please fill in the username and password');
                return;
            }
            var result = validate(username, password);
            if (result === 'success') {
                alert('Login successful');
            } else {
                alert('Login failed');
            }
        }


*/








