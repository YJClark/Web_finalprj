function register(){



}

function validate(vu, vp){
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
        }else{
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            alert("Wrong password, please log in again!")
        }
    }else
        alert("Account does not exist, go register or check again!")    
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
*/