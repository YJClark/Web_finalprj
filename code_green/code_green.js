//manager icon動畫
$(document).ready(function() {
    $('#managerdiv').delay(500).animate({
        top: '3%',
        left: '1%',
        width: '50px', // 假設你要縮小到 50px 寬度
        height: '50px' // 假設你要縮小到 50px 高度
    }, 1000); // 2000 毫秒 (2 秒) 的動畫時間
});

//載入mission頁(之後改所有頁面延遲出現)
window.onload = function() {
    document.getElementById("mission").click();
/*delay載入*/
    setTimeout(function() {
        document.getElementById("mission").click();
    }, 3000);
};

//生成雷達上的點點
$(document).ready(function() {
    var colors = ['red', 'purple', 'yellow'];
    var dotsData = [];
    for (var i = 0; i < 16; i++) {
        var startTop = Math.random() * 300 -10;
        var startLeft = Math.random() * 300 -10;
        var endTop = Math.random() * 350;
        var endLeft = Math.random() * 350;
        var delay = Math.random() * 4;
        dotsData.push({ id: 'Code-' + (i + 1), startTop: startTop + 'px', startLeft: startLeft + 'px', endTop: endTop + 'px', endLeft: endLeft + 'px', delay: delay + 's' });
    }
  
    dotsData.forEach(function(dot) {
      var randomColor = colors[Math.floor(Math.random() * colors.length)];
      var dotElement = $('<div class="dot"></div>').attr('id', dot.id).css({
        '--dot-start-top': dot.startTop,
        '--dot-start-left': dot.startLeft,
        '--dot-end-top': dot.endTop,
        '--dot-end-left': dot.endLeft,
        '--dot-color': randomColor,
        '--delay': dot.delay,
        'background-color': randomColor
      });
      $('.loader').append(dotElement);
    });

    // 集合點點
    $('.maydaybtn').click(function() {
        $('.dot').each(function() {
            var randomDelay = Math.random() * 3000; // 隨機delay出發時間
            setTimeout(function() {
                $(this).addClass('moving');
            }.bind(this), randomDelay);
        });
        // Log arrival when animation ends
        $('.dot').on('animationend', function() {
            console.log($(this).attr('id') + ' has arrived');
          $('.arrivedlog p').append($(this).attr('id') + ' has arrived<br>');
        });
      });
  });

$(document).ready(function(){
    $(".addbtn").click(function(){
        location.href='mission.html';
    });
});
