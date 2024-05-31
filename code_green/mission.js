//顯示burger assign跟history內容
$(document).ready(function() {
    $('.nav-link').click(function(event) {
        event.preventDefault(); // 防止默認的鏈接行為
        let target = $(this).data('target'); // 獲取目標頁面的 ID
        $('.content').removeClass('active'); // 隱藏所有內容
        $('#' + target).addClass('active'); // 顯示目標內容
        $('#switch').prop('checked', false); //點擊後收起
    });
});
//設計assign頁面
$(document).ready(function() {
    characters = {
        killer: [['Ms. R', 4], ['Mr. H', 1], ['Mr. L', 5], ['Ms. L', 3], ['Mr. B', 2], ['Mr. C', 5], ['Mr. L', 5]],  // code red
        spy: [['Mr. P', 5], ['Ms. K', 2], ['Ms. E', 3], ['Mr. M', 4], ['Mr. N', 4], ['Ms. P', 1], ['Mr. L', 5]],       // code purple
        cleaner: [['Mr. Y', 1], ['Ms. G', 2], ['Mr. A', 4], ['Ms. D', 4], ['Ms. I', 3], ['Mr. S', 1], ['Mr. L', 5]]    // code yellow
    };
    $('.KSC').click(function(event) {
        event.preventDefault();
        let role = $(this).data('role');
        renderCharacterList(role);
    });
});

let selectedCharacter = null;
function renderCharacterList(role) {
    let characterList = characters[role] || [];
    let colors = {
        killer: 'red',
        spy: 'purple',
        cleaner: '#FF9912'
    };

    $('#ChLi').empty();     //清空 list

    characterList.forEach(character => {
        let newListItem = $('<li class="character">').text(character[0]);
        newListItem.css({
            'font': 'bold 20px Andale Mono, monospace',
            'text-align': 'center',
            'color': colors[role],
            'margin-bottom': '20px'
        });

        newListItem.data("ability", character[1]);
        $("#ability span").text("");

        newListItem.hover(function() {
            $(this).css({
                'background-color': colors[role],
                'color': 'white',
                'transform': 'scale(1.5)',
                'font-weight': 'bold'
            });
        }, function() {
            if (selectedCharacter !== this) {
                $(this).css({
                    'background-color': 'transparent',
                    'color': colors[role],
                    'transform': 'scale(1)',
                    'font-weight': 'bold'
                });
            }
        });

        //點一下選取
        newListItem.click(function() {
            if (selectedCharacter) {
                $(selectedCharacter).css({
                    'background-color': 'transparent',
                    'color': colors[role],
                    'transform': 'scale(1)',
                    'font-weight': 'bold'
                });
            }
            selectedCharacter = this;
            $(this).css({
                'background-color': colors[role],
                'color': 'white',
                'transform': 'scale(1.5)',
                'font-weight': 'bold'
            });
            //選取時加入ability
            $("#ability span").text($(this).data("ability"));
        });

        // 點兩下取消
        newListItem.dblclick(function() {
            $(this).css({
                'background-color': 'transparent',
                'color': colors[role],
                'transform': 'scale(1)',
                'font-weight': 'bold'
            });
            selectedCharacter = null;
            //取消選取時把text刪掉
            $("#ability span").text("");
        });

        $('#ChLi').append(newListItem);
    });
}



//內建幾個history顯示在left
//codeium生成的，還沒改
$(document).ready(function(){
    let history = [
        {role: 'killer', level: 3, reward: 100, time: 10, tool: 'handgun', rate: 'Success'},
        {role: 'spy', level: 2, reward: 50, time: 8, tool: 'sniperRifle', rate: 'Fail'},
        {role: 'cleaner', level: 4, reward: 150, time: 12, tool: 'shotgun', rate: 'Fail'}
    ];
    history.forEach(m => {
        let newListItem = $('<li class="list">').append(
            $('<span>').text(`${m.role} - Level: ${m.level} - Reward: ${m.reward} - Estimate Time: ${m.time} - Recommand Tools: ${m.tool} -  ${m.rate}`),
        );
        newListItem.css({
            'font': 'bold 20px Andale Mono, monospace',
            'text-align': 'left',
            'color': 'black',
            'margin-bottom': '20px'
        });
        newListItem.hover(function() {
            $(this).css({
                'background-color': 'gray',
                'color': 'white',
                'transform': 'scale(1)',
                'font-weight': 'normal'
            });
        }, function() {
            $(this).css({
                'background-color': 'transparent',
                'color': 'black',
                'transform': 'scale(1)',
                'font-weight': 'normal'
            });
        });

        $('#history').append(newListItem);
    });
});

//內建幾個任務顯示在right

