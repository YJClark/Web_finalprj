function register(){
    var nu = document.getElementById('new_username').value;
    var pw1 = document.getElementById('password1').value;
    var pw2 = document.getElementById('password2').value;
    if (nu === "" || pw1 === "" || pw2 === ""){
        alert("Please enter account and password!") 
    }else if (account.includes(nu)){
        alert("The account has already existed!")
    }else if (pw1 !== pw2){
        alert("Please confirm the password again!")
    }else{
        //存入陣列in account.js，程式關掉就刪除了
        account.push(nu);
        password.push(pw1);
        $('#register-form').dialog('close');
    }
    document.getElementById('new_username').value = '';
    document.getElementById('password1').value = '';
    document.getElementById('password2').value = '';
}

function validate(){
    var vu = document.getElementById('username').value;
    var vp = document.getElementById('password').value;
    if (vu === "" || vp === "")
        alert("Please enter account and password!")   
    else if (account.includes(vu)){
        var index = account.indexOf(vu);
        if(vp === password[index]){
        //對username用ascii做mod 65 + 65，再回傳字母
            var checked = String.fromCharCode(getASCII(vu) % 65 + 65);
            console.log(checked);
            login(checked);
            $('#login-form').dialog('close');
        }else
            alert("Wrong password, please log in again!")
    }else
        alert("Account does not exist, go register or check again!") 
    
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function getASCII(str) {
    var sum = 0;
    for (var i = 0; i < str.length; i++)
        sum += str.charCodeAt(i);
    return sum;
}

//串接其他網站
function login(checked){
    switch(checked){
        //殺手(紅色)
        case "r":
            alert("login killer(red)");
            break;
        //間諜(紫色)
        case "p":
            alert("login spy(purple)");
            break;
        //清理(黃色)
        case "y":
            alert("login clearner(yellow)");
            break;
        //管理(綠色)
        case "g":
            alert("login manager(green)");
            break;
        //一般人
        default:
            alert("login farmer");
            break;
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
    }
});

$('#register-form').dialog({
    autoOpen: false,
    modal: false,
    draggable: false,
    width: 275, 
    height: 290,
    show: {
        effect: "fade",
        duration: 500
    },
    hide: {
        effect: "fade",
        duration: 500
    }
});

//登入、註冊button
$(function(){
    $("#call-loginbtn").click(function() {
       ($("#login-form").dialog("isOpen") == false) ? $("#login-form").dialog("open") : $("#login-form").dialog("close");
       if ($("#register-form").dialog("isOpen") === true)   $("#register-form").dialog("close");
    });
 });

 $(function(){
    $("#registerbtn").click(function() {
       ($("#register-form").dialog("isOpen") == false) ? $("#register-form").dialog("open") : $("#register-form").dialog("close");
       if ($("#login-form").dialog("isOpen") === true)   $("#login-form").dialog("close");
    });
 });

//做商品頁


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
*/