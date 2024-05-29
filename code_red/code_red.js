function changeColor(link) {   
    $('nav a').each(function(index, element) {
        element.style.color = "black";
    });
    link.style.color = "white";
}

$(document).ready(function() {
    $(document).click(function(e) {
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
        gunshot.fadeOut(1000, function() {
            $(this).remove();
        });
    });

    setInterval(function() {
        $("body").toggleClass("flickering");
    }, 2000);
});
var imageNameArray = [];
window.addEventListener('message', function(event) {
    if (event.data.type === 'priceUpdate') {

        var price = event.data.price;
        var originalImageName = event.data.itemImage;

        var croppedImageName = originalImageName.split('.')[0]; // 只保留文件名部分
        imageNameArray.push(croppedImageName);

        var cashElement = document.getElementById('user-cash');
        var originalCash = parseInt(cashElement.textContent, 10);
        var newCash = originalCash - price;
        cashElement.textContent = newCash;

        var inventoryContent = document.getElementById('inventory-content');
        var newItem = document.createElement('div');
        newItem.className = 'item';
        newItem.style.backgroundImage = 'url(images/' + originalImageName + ')';
        inventoryContent.appendChild(newItem);
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // 恢復存儲的庫內容
    var storedInventoryContent = localStorage.getItem('inventoryContent');
    if (storedInventoryContent) {
        document.getElementById('inventory-content').innerHTML = storedInventoryContent;
    }

    document.querySelector('.inventory').addEventListener('click', function() {
        var inventoryContent = document.getElementById('inventory-content');
        if (inventoryContent.style.display === 'block') {
            inventoryContent.style.display = 'none';
        } else {
            inventoryContent.style.display = 'block';
        }
        this.querySelector('span').textContent = inventoryContent.style.display === 'block' ? 'Inventory ▲' : 'Inventory ▼';
    });
});

document.getElementById('converter-link').addEventListener('click', function(event) {

    event.preventDefault();
    
  
    var cash = document.getElementById('user-cash').textContent;
    var bitcoin = document.getElementById('bitcoin').textContent;

     var link = this.getAttribute('href') + '?cash=' + cash +'&bitcoin='+bitcoin;
    if (imageNameArray.length > 0) {
        link += '&imageNameArray=' + imageNameArray.join(',');
    }
    window.location.href = link;
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);


if (urlParams.has('cash')) {
    const userCash = urlParams.get('cash');
    document.getElementById("user-cash").textContent = userCash;
} else {
    console.log('User cash parameter not found in URL');
}
if (urlParams.has('bitcoin')) {
    const userCoin = urlParams.get('bitcoin');
    document.getElementById("bitcoin").textContent = userCoin;
} else {
    console.log('User bitcoin parameter not found in URL');
}
window.addEventListener('beforeunload', function() {
    var inventoryContent = document.getElementById('inventory-content').innerHTML;
    localStorage.setItem('inventoryContent', inventoryContent);
});