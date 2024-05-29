var killer = [['Ms.R', 4 ], ['Mr.H', 1], ['Mr.L' , 5]]  //code red
var spy = [['Mr.P', 5], ['Ms.K', 2], ['Ms. E', 3]]      //code purple
var cleaner = [['Mr.Y', 5], ['Ms.G', 2], ['Mr. A', 4]]  //code yellow


//開關burger menu中的assign跟history
$(document).ready(function() {
    $('.nav-link').click(function(event) {
        event.preventDefault(); // 防止默認的鏈接行為
        let target = $(this).data('target'); // 獲取目標頁面的 ID
        $('.content').removeClass('active'); // 隱藏所有內容
        $('#' + target).addClass('active'); // 顯示目標內容
    });
});





//內建幾個history顯示在left

//內建幾個任務顯示在right

