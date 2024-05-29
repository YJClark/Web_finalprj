var Detonators = {
    "RemoteDetonator": [
        { id: "RDB001", price: 850, imgSrc: "RDB001.jpg" },
        { id: "RDB002", price: 900, imgSrc: "RDB002.jpg" },
        { id: "RDB003", price: 950, imgSrc: "RDB003.jpg" },
        { id: "RDB004", price: 850, imgSrc: "RDB004.jpg" }
    ],
    "TimeBomb": [
        { id: "TMB001", price: 800, imgSrc: "TMB001.jpg" },
        { id: "TMB002", price: 850, imgSrc: "TMB002.jpg" },
        { id: "TMB003", price: 900, imgSrc: "TMB003.jpg" },
        { id: "TMB004", price: 800, imgSrc: "TMB004.jpg" },
        { id: "TMB005", price: 850, imgSrc: "TMB005.jpg" },
    ],
    "ProximityMine": [
        { id: "PM001", price: 850, imgSrc: "PM001.jpg" },
        { id: "PM002", price: 900, imgSrc: "PM002.jpg" },
        { id: "PM003", price: 950, imgSrc: "PM003.jpg" },
        { id: "PM004", price: 850, imgSrc: "PM004.jpg" },
        { id: "PM005", price: 900, imgSrc: "PM005.jpg" },
        { id: "PM006", price: 950, imgSrc: "PM006.jpg" },
    ]
};

var Grenades = {
    "FragmentationGrenade": [
        { id: "FG001", price: 750, imgSrc: "FG001.jpg" },
        { id: "FG002", price: 800, imgSrc: "FG002.jpg" },
        { id: "FG003", price: 850, imgSrc: "FG003.jpg" },
        { id: "FG004", price: 750, imgSrc: "FG004.jpg" },
        { id: "FG005", price: 800, imgSrc: "FG005.jpg" },
        { id: "FG006", price: 850, imgSrc: "FG006.jpg" },
        { id: "FG007", price: 750, imgSrc: "FG007.jpg" },
        { id: "FG008", price: 800, imgSrc: "FG008.jpg" },
        { id: "FG009", price: 850, imgSrc: "FG009.jpg" }
    ],
    "StunGrenade": [
        { id: "SG001", price: 480, imgSrc: "SG001.jpg" },
        { id: "SG002", price: 510, imgSrc: "SG002.jpg" },
        { id: "SG003", price: 520, imgSrc: "SG003.jpg" },
        { id: "SG004", price: 490, imgSrc: "SG004.jpg" },
        { id: "SG005", price: 500, imgSrc: "SG005.jpg" },
        { id: "SG006", price: 490, imgSrc: "SG006.jpg" },
        { id: "SG007", price: 510, imgSrc: "SG007.jpg" },
        { id: "SG008", price: 480, imgSrc: "SG008.jpg" },
        { id: "SG009", price: 530, imgSrc: "SG009.jpg" }
    ],
    "SmokeGrenade": [
        { id: "SM001", price: 470, imgSrc: "SM001.jpg" },
        { id: "SM002", price: 500, imgSrc: "SM002.jpg" },
        { id: "SM003", price: 510, imgSrc: "SM003.jpg" },
        { id: "SM004", price: 480, imgSrc: "SM004.jpg" },
        { id: "SM005", price: 490, imgSrc: "SM005.jpg" },
        { id: "SM006", price: 500, imgSrc: "SM006.jpg" },
        { id: "SM007", price: 480, imgSrc: "SM007.jpg" },
        { id: "SM008", price: 490, imgSrc: "SM008.jpg" }
    ]
};

var Explosives = {
    "Dynamite": [
        { id: "DM001", price: 850, imgSrc: "DM001.jpg" },
        { id: "DM002", price: 900, imgSrc: "DM002.jpg" },
        { id: "DM003", price: 950, imgSrc: "DM003.jpg" },
        { id: "DM004", price: 850, imgSrc: "DM004.jpg" },
        { id: "DM005", price: 900, imgSrc: "DM005.jpg" },
        { id: "DM006", price: 950, imgSrc: "DM006.jpg" },
        { id: "DM007", price: 850, imgSrc: "DM007.jpg" },
    ],
    "C4": [
        { id: "C4-001", price: 850, imgSrc: "C4001.jpg" },
        { id: "C4-002", price: 900, imgSrc: "C4002.jpg" },
        { id: "C4-003", price: 950, imgSrc: "C4003.jpg" },
        { id: "C4-004", price: 850, imgSrc: "C4004.jpg" },
        { id: "C4-005", price: 900, imgSrc: "C4005.jpg" },
    ]
};



function createProductTable(bombType, bombItems) {
    var container = document.querySelector('.product-table-container');

    var table = document.createElement('table');
    table.classList.add('product-table');
    table.id = bombType;

    var rowNum = Math.ceil(bombItems.length / 3);

    for (var i = 0; i < rowNum; i++) {
        var tr = document.createElement('tr');

        for (var j = 0; j < 3; j++) {
            var index = i * 3 + j;
            if (index < bombItems.length) {
                var bomb = bombItems[index];

                var td = document.createElement('td');
                td.id = bomb.id;
                td.classList.add('product-item');

                var img = document.createElement('img');
                img.src = "images/"+ bomb.imgSrc;
                img.alt = "Item " + bomb.id;

                var p = document.createElement('p');
                p.innerHTML = "Item No. " + bomb.id + "<br>Price: ₩" + bomb.price;

                var button = document.createElement('button');
                button.classList.add('buy-button');
                button.textContent = "Buy Now";
                button.setAttribute('onclick', 'updatePrice(' + bomb.price + ', "' + bomb.imgSrc + '")');

                td.appendChild(img);
                td.appendChild(p);
                td.appendChild(button);

                tr.appendChild(td);
            }
        }

        table.appendChild(tr);
    }

    container.appendChild(table);
}	

    Object.keys(Detonators).forEach(bombType => {
        createProductTable(bombType, Detonators[bombType]);
    });
	  Object.keys(Explosives).forEach(bombType => {
        createProductTable(bombType, Explosives[bombType]);
    });
	  Object.keys(Grenades).forEach(bombType => {
        createProductTable(bombType, Grenades[bombType]);
    });

        $('table').hide();
        function showItem(cata){
            $('main span').each(function(index, element) {
                $(element).removeClass('active');
            });
            $(cata).addClass('active');

            $('.bomb-list').empty();
            var categories = {
				"Detonators": ['RemoteDetonator', 'TimeBomb', 'ProximityMine'],
				"Explosives": ['Dynamite', 'C4'],
				"Grenades": ['FragmentationGrenade', 'StunGrenade', 'SmokeGrenade'],
			};
            
            var bombs = categories[cata.innerHTML];
            var ul = $('<ul></ul>');
            for (var i = 0 ; i < bombs.length ; i++) {   
                var li = $('<li onclick="showTable(this)" class="' + cata.innerHTML.replace(/\s+/g, '') + '">' + bombs[i] + '</li>');
                ul.append(li);
            }
            $('#' + (cata.innerHTML === "Detonators" ? 1 : 
                      cata.innerHTML === "Explosives" ? 2 : 
                      cata.innerHTML === "Grenades" ? 3 : 4
                     )).append(ul);
					  Object.keys(bombs).forEach(bombType => {
					createProductTable(bombs[i], bombs[bombType]);
				});

        }

        function showTable(bomb){
            $('table').hide();
            var bombType = $(bomb).text();
            $('table#' + bombType.replace(/\s+/g, '')).show();
            
            $('li').removeClass('active');
            $(bomb).addClass('active');
        }
		$(document).ready(function(){
    $(document).click(function(e){
        var gunshot = $('<div class="gunshot"></div>');
        gunshot.css({
            position: 'fixed',
            top: e.pageY - 5,
            left: e.pageX - 5,
            width: '10px',
            height: '10px',
            background: 'url("hole.jpg")',
            borderRadius: '50%',
            zIndex: '9999'
        });
        $('body').append(gunshot);
        gunshot.fadeOut(1000, function(){
            $(this).remove();
        });
    });
});

function updatePrice(price, itemImage) {
            window.parent.postMessage({ type: 'priceUpdate', price: price ,itemImage: itemImage}, '*');
        }