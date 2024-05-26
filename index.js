function register(){



}

function validate(){
    var username = $('#username').val();
    var password = $('#password').val();
//對username用ascii做mod 52，再回傳字母
alert('Please fill in the username and password');

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

$('#login-form').dialog({
    autoOpen: false,
    modal: false,
    draggable: false,
    width: 275, 
    height: 250,
    show: {
        effect: "fade",
        duration: 500
    },
    hide: {
        effect: "fade",
        duration: 500
    },

});

$("#call-login").click(function() {
    $("#login-form").dialog("open");
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








