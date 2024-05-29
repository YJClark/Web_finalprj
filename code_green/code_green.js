//manager icon動畫
$(document).ready(function() {
    $('#managerdiv').delay(500).animate({
        top: '3%',
        left: '1%',
        width: '50px', // 假設你要縮小到 50px 寬度
        height: '50px' // 假設你要縮小到 50px 高度
    }, 1000); // 2000 毫秒 (2 秒) 的動畫時間
});










//載入mission頁
window.onload = function() {
    document.getElementById("mission").click();
/*delay載入
    setTimeout(function() {
        document.getElementById("mission").click();
    }, 3000);
*/
};