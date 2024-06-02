let gunHitCount = 0;
let SShotCount = 0;
let ThrowCount = 0;
let minus = 0;
let bitcoin = 0;

function changeColor(link) {   
    $('nav a').each(function(index, element) {
        element.style.color = "black";
    });
    link.style.color = "white";
}


window.addEventListener('message', function(event) {
    if (event.data.type === 'priceUpdate') {
      
        var originalImageName = event.data.itemImage;
        var cashElement = document.getElementById('intelligence');
        var originalCash = parseInt(cashElement.textContent, 10);
		if(originalCash>=1){
        var newCash = originalCash - 1;
        cashElement.textContent = newCash;
		localStorage.setItem("intelligence",newCash);
		var inventoryContent = document.getElementById('inventory-content');
        var newItem = document.createElement('div');
        newItem.className = 'item';
        newItem.textContent= originalImageName;
        inventoryContent.appendChild(newItem);  
    }}
});
document.getElementById('use-wise-button').addEventListener('click', function() {
    if (parseInt(documentElementById('intelligence').textContent) > 0) {
        parseInt(documentElementById('intelligence').textContent)--;
        var x = parseInt(documentElementById('intelligence').textContent) - 1;
		documentElementById('intelligence').textContent = x;
		localStorage.setItem('intelligence');
		updateSuccessRate();
		
    }
	
});
function updateSuccessRate() {
    var randomFactor = Math.random(); 
    var successChange = randomFactor > 0.3 ? 0.05 : -0.2; 
    successRate += successChange;
	minus+=successChange;
    successRate = Math.max(0, Math.min(1, successRate));
	localStorage.setItem('successRateP',successRate);
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

    var storedInventoryContent = localStorage.getItem('Information');
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
        this.querySelector('span').textContent = inventoryContent.style.display === 'block' ? 'Information ▲' : 'Information ▼';
    });
});



window.addEventListener('DOMContentLoaded', function() {


    var storedCash = localStorage.getItem('Knowledge');
    if (storedCash) {
        document.getElementById('Knowledge').textContent = storedCash;
    }

    var storedBitcoin = localStorage.getItem('intelligence');
    if (storedBitcoin) {
        document.getElementById('intelligence').textContent = storedBitcoin;
    }
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	if (urlParams.has('gunHitCount')) {

		gunHitCount = parseInt(urlParams.get('gunHitCount'));
		document.getElementById('user-cash').textContent=parseInt(document.getElementById('user-cash').textContent)-gunHitCount*10;
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
		    
			let ability = parseInt(localStorage.getItem('abilityP'));
			let temp = ability;
            let reward = parseInt(localStorage.getItem('rewardP'));
            let level = parseInt(localStorage.getItem('levelP'));
            let time = parseInt(localStorage.getItem('timeP'));
			let recommandtools = localStorage.getItem('recommandtoolsP');
			let requiredSkill = localStorage.getItem('requireskillP');
			let Knowledge = parseInt(documentElementById('Knowledge').textContent);
			localStorage.setItem('Knowledge',Knowledge);
			successRate = localStorage.getItem('successRateP');
			
			if (ability < parseInt(requiredSkill) ||!ability ||!reward||!level||!requiredSkill) { 
                $("#display-info").addClass("disabled");
                $("#execute-button").prop("disabled", true);
            } else {
                $("#display-info").removeClass("disabled");
                $("#execute-button").prop("disabled", false);
            }
			if (ability >= requiredSkill) {
				successRate = ((ability/(parseInt(requiredSkill))) * (Knowledge/level)) / (Math.sqrt(level * time) + 100);

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
        bitcoin = document.getElementById('Knowledge').textContent;
        bitcoin = parseInt(Knowledge) + parseInt(localStorage.getItem('Knowledge'));
        document.getElementById('Knowledge').textContent = bitcoin;
        localStorage.setItem('Knowledge', bitcoin);
        luck = true;
    } else {
        removeEverythingInventory();
        luck = false;
    }



    handleVideoEnded();
});

function handleVideoEnded() {
    closeVideoPlayer();
    if (luck) {
        alert("任務成功! 獲得" + parseInt(localStorage.getItem('reward')) + '枚代幣!');
        show = true;
		localStorage.removeItem('rewardP');
        localStorage.removeItem('levelP');
        localStorage.removeItem('timeP');
		localStorage.removeItem('recommandtoolsP');
		localStorage.removeItem('requireskillP');
		$("#display-info").slideUp();
    } else {
        alert("任務失敗! 失去所有知識!");
        updateLifeCount(lifeCount - 1);
        show = true;
        lifeCount--;
		localStorage.removeItem('rewardR');
        localStorage.removeItem('levelR');
        localStorage.removeItem('timeR');
		localStorage.removeItem('recommandtoolsR');
		localStorage.removeItem('requireskillR');
		$("#display-info").slideUp();
			location.reload();
			var inventoryContent = document.getElementById('inventory-content');
            inventoryContent.innerHTML = '';
			removeEverythingInventory();

    }
}



  document.addEventListener('mousemove', function(event) {
            var randomNumberElement = document.getElementById('random-number');
            var randomNumber = Math.floor(Math.random() * 10000); 
            randomNumberElement.textContent = randomNumber;
            randomNumberElement.style.left = (event.clientX + 10) + 'px';
            randomNumberElement.style.top = (event.clientY + 10) + 'px'; 
			randomNumberElement.style.display = 'block';
        });