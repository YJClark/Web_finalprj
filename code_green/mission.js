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
            //選取時加入ability，然後觸發change
            //$("#ability span").text($(this).data("ability"));
            $("#ability span").text($(this).data("ability")).trigger("custom");
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
            //取消選取時把text刪掉，然後觸發change
            //$("#ability span").text(""); 
            $("#ability span").text("").trigger("custom");
        });

        $('#ChLi').append(newListItem);
    });
}

//計算成功率(還沒加上推薦武器)
$(document).ready(function(){
    $("#ability span, #levelspan, #estspan input").on("change custom", function() {
        // 都為string，轉換為 int
        let ability = parseInt($("#ability span").text());
        let level = parseInt($("input[name='rating']:checked").val());
        let time = parseInt($("#estspan input").val());
        console.log(ability, level, time);
        
        if (ability && level && time) {
            let rate = Math.min( (Math.pow(ability, 2) * level) / (Math.sqrt(level * time) + 100), 1);
            console.log(rate);
            recommandtools();
            $("#ratespan").text((rate.toFixed(2) * 100) + "%"); // 保留兩位小數
        }
    });

    // 在改變 #ability span 內容時觸發自定義事件 custom (span、div不會觸發change所以要自己寫)
    $("#ability span").on("change", function() {
        $(this).trigger("custom");
    });
});

//武器推薦(random)
var guns = {
    "Revolver": [
        { id:"R009", imgSrc: "R009.jpg" },
        { id:"R020", imgSrc: "R020.jpg" },
        { id:"R021", imgSrc: "R021.jpg" },
        { id:"R022", imgSrc: "R022.jpg" },
        { id:"R023", imgSrc: "R023.jpg" },
        { id:"R033", imgSrc: "R033.jpg" },
        { id:"R041", imgSrc: "R041.jpg" },
        { id:"R042", imgSrc: "R042.jpg" },
        { id:"R043", imgSrc: "R043.jpg" }
    ]
}
var  axes = {
    "ThrowingAxe": [
        { id: "TA001", imgSrc: "TA001.jpg" },
        { id: "TA002", imgSrc: "TA002.jpg" },
        { id: "TA003", imgSrc: "TA003.jpg" },
        { id: "TA004", imgSrc: "TA004.jpg" },
        { id: "TA005", imgSrc: "TA005.jpg" },
        { id: "TA006", imgSrc: "TA006.jpg" },
        { id: "TA007", imgSrc: "TA007.jpg" },
        { id: "TA008", imgSrc: "TA008.jpg" },
        { id: "TA009", imgSrc: "TA009.jpg" }
    ]
}
var sniper = {
    "SniperRifle": [
        { id:"SR009", imgSrc: "SR009.jpg" },
        { id:"SR020", imgSrc: "SR020.jpg" },
        { id:"SR021", imgSrc: "SR021.jpg" },
        { id:"SR022", imgSrc: "SR022.jpg" },
        { id:"SR023", imgSrc: "SR023.jpg" },
        { id:"SR033", imgSrc: "SR033.jpg" },
        { id:"SR041", imgSrc: "SR041.jpg" },
        { id:"SR042", imgSrc: "SR042.jpg" },
        { id:"SR043", imgSrc: "SR043.jpg" }
    ]
}
var recommendedTools = {}; 
function recommandtools() {
    var revolverIndex = Math.floor(Math.random() * guns.Revolver.length);
    var selectedRevolver = guns.Revolver[revolverIndex];

    var throwingAxeIndex = Math.floor(Math.random() * axes.ThrowingAxe.length);
    var selectedThrowingAxe = axes.ThrowingAxe[throwingAxeIndex];

    var sniperRifleIndex = Math.floor(Math.random() * sniper.SniperRifle.length);
    var selectedSniperRifle = sniper.SniperRifle[sniperRifleIndex];

    recommendedTools = {
        "Revolver": selectedRevolver,
        "ThrowingAxe": selectedThrowingAxe,
        "SniperRifle": selectedSniperRifle
    };
    var toolspan = document.getElementById("toolspan");
    toolspan.innerHTML = Object.keys(recommendedTools).map(function(key) {
        var tool = recommendedTools[key];
        return '<span class="tool" tool="' + key + '">ID: ' + tool.id + '<img src="../code_red/images/' + tool.imgSrc + '" style="display:none"/></span>';
    }).join(", ");
    
    var spans = toolspan.querySelectorAll('.tool');
    for (var i = 0; i < spans.length; i++) {
        spans[i].addEventListener('click', function() {
            var img = this.querySelector('img');
            if (img.style.display === 'none' || img.style.display === '') {
                img.style.display = 'inline';
                img.style.width = '55px';
                img.style.height = '55px';
            } else {
                img.style.display = 'none';
                img.style.width = '0px';
                img.style.height = '0px';
            }
        });
    }
}

//內建幾個history顯示在left
//codeium生成的，還沒改
$(document).ready(function(){
    let history = [
        {role: 'killer', level: 3, reward: 100, time: 10 , tool: 'Handgun', status: 'Success'},
        {role: 'Spy', level: 2, reward: 50, time: 8, tool: 'SniperRifle', status: 'Fail'},
        {role: 'Cleaner', level: 5, reward: 150, time: 9, tool: 'Shotgun', status: 'Success'},
        {role: 'Cleaner', level: 3, reward: 150, time: 6, tool: 'Pesticide', status: 'Fail'},
        {role: 'Killer', level: 5, reward: 100, time: 18, tool: 'shotgun', status: 'Missing'},
        {role: 'Spy', level: 1, reward: 20, time: 1, tool: 'KCN', status: 'Sacrifice'},
        {role: 'Killer', level: 5, reward: 2000, time: 1000, tool: 'Machine gun', status: 'Triumph '},
    ];
    history.forEach(m => {
        let newListItem = $('<li class="list">').append(
            $('<span>').text(`${m.role} - Level: ${m.level} - Reward: ${m.reward} - Estimate Time: ${m.time} - Recommand Tools: ${m.tool} -  ${m.status}`),
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

//傳任務給codered
$(document).ready(function() {
    $('#send-button').click(function(event) {
        event.preventDefault();
		let reward = document.getElementById('reward').value;
		let time = document.getElementById('time').value;
		let level = parseInt($("input[name='rating']:checked").val());
		let recommandtools =document.getElementById('weapon-select').value;
		let requireskill =document.getElementById('ability').value;
        localStorage.setItem('reward', reward);
        localStorage.setItem('level', level);
        localStorage.setItem('time', time);
		localStorage.setItem('recommandtools', recommandtools);
		localStorage.setItem('requireskill', requireskill);
		console.log(reward,level,time,recommandtools,requireskill);
        console.log('Variables sent successfully');
    });
});

//生成progress bar用
document.addEventListener("DOMContentLoaded", function() {
    const selectedRoles = {};

    document.querySelectorAll(".KSC").forEach(button => {
        button.addEventListener("click", function() {
            const role = this.getAttribute("data-role");
            const color = this.getAttribute("data-color");

            if (selectedRoles[role]) {
                delete selectedRoles[role];
                this.classList.remove("btn-selected");
            } else {
                selectedRoles[role] = color;
                this.classList.add("btn-selected");
            }
        });
    });

    document.getElementById("send-button").addEventListener("click", function() {
        if (Object.keys(selectedRoles).length > 0) {
            localStorage.setItem("selectedRoles", JSON.stringify(selectedRoles));

            // Clear selections after sending
            Object.keys(selectedRoles).forEach(role => {
                document.querySelector(`.KSC[data-role="${role}"]`).classList.remove("btn-selected");
            });

            // Clear selectedRoles object
            for (let key in selectedRoles) {
                delete selectedRoles[key];
            }
        }
    });
});