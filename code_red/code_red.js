let gunHitCount = 0;
let SShotCount = 0;
let ThrowCount = 0;
let successRate = localStorage.getItem('successRate');
let minus = 0;
let bitcoin = 0;
if(localStorage.getItem('bitcoins')){
bitcoin = localStorage.getItem('bitcoins');}
$('#overlay').hide();
var imageNameArray = [];
var sniperItems = [];
var gunItems = [];
var weaponItems = [];
var bombItems = [];
var poisonItems = [];
let lifeCount = localStorage.getItem('lifeCount') ? parseInt(localStorage.getItem('lifeCount'), 10) : 3;
updateLifeIcons(lifeCount);

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
var sniperItems = [];
var gunItems = [];
var weaponItems = [];
var bombItems = [];
var poisonItems = [];
window.addEventListener('message', function(event) {
    if (event.data.type === 'priceUpdate') {
      
        var price = event.data.price;
        var originalImageName = event.data.itemImage;
        var itemType = event.data.itemType;

        var croppedImageName = originalImageName.split('.')[0]; 
        imageNameArray.push(croppedImageName);
		
        var cashElement = document.getElementById('user-cash');
        var originalCash = parseInt(cashElement.textContent, 10);
		if(price<=originalCash){
        var newCash = originalCash - price;
        cashElement.textContent = newCash;
		localStorage.setItem("userCash",newCash);
		var inventoryContent = document.getElementById('inventory-content');
        var newItem = document.createElement('div');
        newItem.className = 'item';
        newItem.style.backgroundImage = 'url(images/' + originalImageName + ')';
        inventoryContent.appendChild(newItem);

        switch(itemType) {
            case 'sniper':
                sniperItems.push(originalImageName);
                break;
            case 'gun':
                gunItems.push(originalImageName);
                break;
			case 'weapon':
                weaponItems.push(originalImageName);
                break;
			case 'bomb':
                bombItems.push(originalImageName);
                break;
			case 'poison':
                poisonItems.push(originalImageName);
                break;
        }
		}
		else{
			alert('U Broke!!');
			
		}

        
    }
});
document.getElementById('use-poison-button').addEventListener('click', function() {
    if (poisonItems.length > 0) {
        var latestPoison = poisonItems.pop(); 
        removeItemFromInventory(latestPoison);
		successRate += 0.05;
		minus+=0.05;
		localStorage.setItem('successRate',successRate);
		document.getElementById('success-rate').textContent = 'Success Rate: ' + (successRate * 100).toFixed(2) + '%';
    }
});

document.getElementById('use-bomb-button').addEventListener('click', function() {
    if (bombItems.length > 0) {
        var latestBomb = bombItems.pop(); 
        removeItemFromInventory(latestBomb);
		updateSuccessRate();
		
    }
	
});
function updateSuccessRate() {
    var randomFactor = Math.random(); 
    var successChange = randomFactor > 0.9 ? 0.1 : -0.2; 
    successRate += successChange;
	minus+=successChange;
    successRate = Math.max(0, Math.min(1, successRate));
	localStorage.setItem('successRate',successRate);
    document.getElementById('success-rate').textContent = 'Success Rate: ' + (successRate * 100).toFixed(2) + '%';
}
function removeItemFromInventory(itemName) {
    var inventoryContent = document.getElementById('inventory-content');
    var items = inventoryContent.querySelectorAll('.item');
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.style.backgroundImage.includes(itemName)) {
            item.parentNode.removeChild(item);
            break;
        }
    }
}
function removeEverythingInventory() {
	
    var inventoryContent = document.getElementById('inventory-content');
    var items = inventoryContent.querySelectorAll('.item');

    for (var i = 0; i < items.length; i++) {
			item = items[i]
            item.parentNode.removeChild(item);

}}

document.addEventListener('DOMContentLoaded', function() {

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
	link += '&gunHitCount=' + gunHitCount + '&SShotCount=' + SShotCount + '&ThrowCount=' + ThrowCount;
    if (imageNameArray.length > 0) {
        link += '&imageNameArray=' + imageNameArray.join(',');
    }
    window.location.href = link;

    localStorage.setItem('userCash', cash);
    localStorage.setItem('userBitcoin', bitcoin);
});

window.addEventListener('DOMContentLoaded', function() {
    var storedInventoryContent = localStorage.getItem('inventoryContent');
    if (storedInventoryContent) {
        document.getElementById('inventory-content').innerHTML = storedInventoryContent;
    }

    var storedCash = localStorage.getItem('userCash');
    if (storedCash) {
        document.getElementById('user-cash').textContent = storedCash;
    }

    var storedBitcoin = localStorage.getItem('userBitcoin');
    if (storedBitcoin) {
        document.getElementById('bitcoin').textContent = storedBitcoin;
    }
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('cash')) {
		cash = parseInt(urlParams.get('cash'));
		document.getElementById('user-cash').textContent = cash;
	}
	if (urlParams.has('bitcoin')) {
		bitcoin = parseInt(urlParams.get('bitcoin'));
		document.getElementById('bitcoin').textContent = bitcoin;
	}

	if (urlParams.has('gunHitCount')) {

		gunHitCount = parseInt(urlParams.get('gunHitCount'));
		document.getElementById('user-cash').textContent=parseInt(document.getElementById('user-cash').textContent)-gunHitCount*10;
	}

	if (urlParams.has('SShotCount')) {

		SShotCount = parseInt(urlParams.get('SShotCount'));
		document.getElementById('user-cash').textContent=parseInt(document.getElementById('user-cash').textContent)-SShotCount*10;

	}

	if (urlParams.has('ThrowCount')) {

		ThrowCount = parseInt(urlParams.get('ThrowCount'));
		document.getElementById('user-cash').textContent=parseInt(document.getElementById('user-cash').textContent)-ThrowCount*100;

}
});
var display = false;
window.addEventListener('beforeunload', function() {
    var inventoryContent = document.getElementById('inventory-content').innerHTML;
    localStorage.setItem('inventoryContent', inventoryContent);
});
  document.getElementById('mission-link').addEventListener('click', function(event) {

            event.preventDefault();


            let displayInfo = document.getElementById('display-info');
            let iconTooltip = document.querySelector('.icon-tooltip');
            iconTooltip.appendChild(displayInfo);
			if(!display){
  
			$("#display-info").slideDown();
			display=true;
		    
			let ability = parseInt(localStorage.getItem('ability'));
			let temp = ability;
            let reward = parseInt(localStorage.getItem('reward'));
            let level = parseInt(localStorage.getItem('level'));
            let time = parseInt(localStorage.getItem('time'));
			let recommandtools = localStorage.getItem('recommandtools');
			let requiredSkill = localStorage.getItem('requireskill');
			successRate = localStorage.getItem('successRate');
			
			if (ability < parseInt(requiredSkill) ||!ability ||!reward||!level||!requiredSkill) { 
                $("#display-info").addClass("disabled");
                $("#execute-button").prop("disabled", true);
            } else {
                $("#display-info").removeClass("disabled");
                $("#execute-button").prop("disabled", false);
            }
			if (ability >= requiredSkill) {
				successRate = ((ability/(parseInt(requiredSkill))) * (10/level)) / (Math.sqrt(level * time) + 100);
				if (recommandtools && recommandtools !== "none") {
					switch (recommandtools) {
						case 'sniper':
							if (sniperItems.length > 0) {
								successRate += 0.2;
							}
							break;
						case 'gun':
							if (gunItems.length > 0) {
								successRate += 0.2;
							}
							break;
						case 'weapon':
							if (weaponItems.length > 0) {
								successRate += 0.2;
							}
							break;
						default:
						   break;
					}
				}
			} else {
				successRate = 0;
			}
			if(successRate>1){
				successRate=1;
			}
			localStorage.setItem('successRate',successRate);
			successRate += minus;
            document.getElementById('reward-info').innerHTML = 'Reward: ' + reward+' &Bfr;';
            document.getElementById('level-info').innerHTML = 'Level: ' + level + ' &bigstar;';
            document.getElementById('time-info').innerHTML = 'Time: ' + time +' &ShortDownArrow;';
			document.getElementById('tool-info').textContent = 'Tools: ' + recommandtools;
			document.getElementById('required-skill').innerHTML = 'Required Skill: ' + requiredSkill+ ' &ShortUpArrow;';
			document.getElementById('success-rate').textContent = 'Success Rate: ' + (successRate * 100).toFixed(2) + '%';
			}
			else{
			 $("#display-info").slideUp();
			display=false;}


        });
var luck = false;
var show = false;
document.getElementById('execute-button').addEventListener('click', function() {
    show = false;
    var videoSrc;
    var randomNum = Math.random();
    if (randomNum <= successRate) {
        videoSrc = './success.mov';
        bitcoin = document.getElementById('bitcoin').textContent;
        bitcoin = parseInt(bitcoin) + parseInt(localStorage.getItem('reward'));
        document.getElementById('bitcoin').textContent = bitcoin;
        localStorage.setItem('bitcoins', bitcoin);
        luck = true;
    } else {
        videoSrc = './failed.mov';
        removeEverythingInventory();
        luck = false;
    }

    var overlay = document.getElementById('overlay');
    var videoPlayer = document.getElementById('video-player');
    var sourceElement = videoPlayer.querySelector('source');
    sourceElement.src = videoSrc;
    videoPlayer.load();

    overlay.style.display = 'block';
    videoPlayer.style.display = 'block';

    document.body.style.overflow = 'hidden';
    if (videoPlayer.requestFullscreen) {
        videoPlayer.requestFullscreen();
    } else if (videoPlayer.mozRequestFullScreen) { /* Firefox */
        videoPlayer.mozRequestFullScreen();
    } else if (videoPlayer.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        videoPlayer.webkitRequestFullscreen();
    } else if (videoPlayer.msRequestFullscreen) { /* IE/Edge */
        videoPlayer.msRequestFullscreen();
    }

    videoPlayer.removeEventListener('ended', handleVideoEnded);
    videoPlayer.addEventListener('ended', handleVideoEnded);
});

function handleVideoEnded() {
    closeVideoPlayer();
    if (luck) {
        alert("任務成功! 獲得" + parseInt(localStorage.getItem('reward')) + '枚代幣!');
        show = true;
		localStorage.removeItem('reward');
        localStorage.removeItem('level');
        localStorage.removeItem('time');
		localStorage.removeItem('recommandtools');
		localStorage.removeItem('requireskill');
		$("#display-info").slideUp();
    } else {
        alert("任務失敗! 失去所有武器和一條生命!");
        updateLifeCount(lifeCount - 1);
        show = true;
        lifeCount--;
		localStorage.removeItem('reward');
        localStorage.removeItem('level');
        localStorage.removeItem('time');
		localStorage.removeItem('recommandtools');
		localStorage.removeItem('requireskill');
		$("#display-info").slideUp();
        if (lifeCount <= 0) {
            alert("你死了!");
			localStorage.clear();
			location.reload();
			var inventoryContent = document.getElementById('inventory-content');
            inventoryContent.innerHTML = '';
			removeEverythingInventory();
        }
    }
}

function closeVideoPlayer() {
    var overlay = document.getElementById('overlay');
    var videoPlayer = document.getElementById('video-player');
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
    overlay.style.display = 'none';
    videoPlayer.style.display = 'none';

    document.body.style.overflow = 'auto';
}


function updateLifeCount(newLifeCount) {
    lifeCount = newLifeCount;
    updateLifeIcons(lifeCount);
    localStorage.setItem('lifeCount', lifeCount);
}


function updateLifeIcons(lifeCount) {
    const lifeIconsContainer = document.getElementById('life-icons');
    lifeIconsContainer.innerHTML = '';
    for (let i = 0; i < lifeCount; i++) {
        const img = document.createElement('img');
        img.src = 'heart.gif';
        lifeIconsContainer.appendChild(img);
    }
}
 