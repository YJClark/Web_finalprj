var Poisons = {
	"Arsenic":[
    { id: "Ars001", price: 280, imgSrc: "Ars001.jpg" },
    { id: "Ars002", price: 310, imgSrc: "Ars002.jpg" },
    { id: "Ars003", price: 320, imgSrc: "Ars003.jpg" },
],"Cyanide":[
    { id: "Cyn001", price: 280, imgSrc: "Cyn001.jpg" },
    { id: "Cyn002", price: 310, imgSrc: "Cyn002.jpg" },
    { id: "Cyn003", price: 320, imgSrc: "Cyn003.jpg" },
]

};
var Venoms = {
	"SnakeVenom":[
    { id: "SV001", price: 280, imgSrc: "SV001.jpg" },
    { id: "SV002", price: 310, imgSrc: "SV002.jpg" },
    { id: "SV003", price: 320, imgSrc: "SV003.jpg" }
],"ScorpionVenom":[
    { id: "ScV001", price: 280, imgSrc: "ScV001.jpg" },
    { id: "ScV002", price: 310, imgSrc: "ScV002.jpg" },
    { id: "ScV003", price: 320, imgSrc: "ScV003.jpg" },
]

};
function createProductTable(drugType, drugItems) {
    var container = document.querySelector('.product-table-container');

    var table = document.createElement('table');
    table.classList.add('product-table');
    table.id = drugType;

		var rowNum = Math.ceil(drugItems.length / 3);

	for (var i = 0; i < rowNum; i++) {
		var tr = document.createElement('tr');

		for (var j = 0; j < 3; j++) {
			var index = i * 3 + j;
			if (index < drugItems.length) {
				var drug = drugItems[index];

				var td = document.createElement('td');
				td.id = drug.id;
				td.classList.add('product-item');

				var img = document.createElement('img');
				img.src = "images/"+drug.imgSrc;
				img.alt = "Item " + drug.id;

				var p = document.createElement('p');
				p.innerHTML = "Item No. " + drug.id + "<br>Price: ₩" + drug.price;

				var button = document.createElement('button');
				button.classList.add('buy-button');
				button.textContent = "Buy Now";
				button.setAttribute('onclick', 'updatePrice(' + drug.price + ', "' + drug.imgSrc + '")');

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

    Object.keys(Poisons).forEach(drugType => {
		createProductTable(drugType, Poisons[drugType]);
	});
	  Object.keys(Venoms).forEach(drugType => {
		createProductTable(drugType, Venoms[drugType]);
	});

    $('table').hide();
    function showItem(cata){
        $('main span').each(function(index, element) {
            $(element).removeClass('active');
        });
        $(cata).addClass('active');

        $('.drug-list').empty();
        var categories = {
			"Poisons": ['Arsenic', 'Cyanide'],
			"Venoms": ['SnakeVenom','ScorpionVenom']
		};
        var drugs = categories[cata.innerHTML];
        var ul = $('<ul></ul>');
        for (var i = 0 ; i < drugs.length ; i++) {   
            var li = $('<li onclick="showTable(this)" class="' + cata.innerHTML.replace(/\s+/g, '') + '">' + drugs[i] + '</li>');
            ul.append(li);
        }
        $('#' + (cata.innerHTML === "Poisons" ? 1 : 
                  cata.innerHTML === "Venoms" ? 2 : 3 
                 )).append(ul);
				  Object.keys(drugs).forEach(drugType => {
				createProductTable(drugs[i], drugs[drugType]);
			});

    }

    function showTable(drug){
        $('table').hide();
        var drugType = $(drug).text();
        $('table#' + drugType.replace(/\s+/g, '')).show();
        
        $('li').removeClass('active');
        $(drug).addClass('active');
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