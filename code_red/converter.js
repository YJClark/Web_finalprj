var chart, chartData;
document.addEventListener('DOMContentLoaded', loadTransactionRecords);
function convert() {
    var bitcoinAmount = parseFloat(document.getElementById("bitcoinAmount").value);
    var latestBitcoinPrice = chartData.datasets[0].data[chartData.datasets[0].data.length - 1];

    if (bitcoinAmount && latestBitcoinPrice) {
        var wCoinAmount = bitcoinAmount * latestBitcoinPrice;

        var bitcoinOwned = parseFloat(document.getElementById("bitcoin").textContent);

        if (bitcoinAmount > bitcoinOwned) {
            alert("You don't have enough Bitcoin to convert!");
            return;
        }
        document.getElementById("wCoinAmount").textContent = wCoinAmount.toFixed(2);
    }
}

var fakeBitcoinData = [100, 110, 120, 130, 125, 135, 140, 138, 142, 145, 121, 122, 123, 124];

function updateFakeChart() {
    const now = new Date();
    const timeLabel = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    chartData.labels.push(timeLabel);
    chartData.datasets[0].data.push(fakeBitcoinData[Math.floor(Math.random() * fakeBitcoinData.length)]);
    chart.update();
}

var ctx = document.getElementById('chart').getContext('2d');
chartData = {
    labels: [],
    datasets: [{
        label: 'Bitcoin Price',
        data: [],
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false
    }]
};
chart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false
                }
            }]
        }
    }
});

setInterval(updateFakeChart, 3000);

function Exchange() {
    var wCoinAmount = parseFloat(document.getElementById('wCoinAmount').textContent);
    if (wCoinAmount > 0) {
        var exchangeAccount = document.getElementById("user-cash");
        exchangeAccount.textContent = (parseFloat(exchangeAccount.textContent) + wCoinAmount).toFixed(2);
        document.getElementById("wCoinAmount").textContent = '0';

        var bitcoinOwned = parseFloat(document.getElementById("bitcoin").textContent);
        var bitcoinAmount = parseFloat(document.getElementById("bitcoinAmount").value);
        bitcoinOwned -= bitcoinAmount;
        document.getElementById("bitcoin").textContent = bitcoinOwned.toFixed(2);

        addTransactionRecord('Bitcoin to W Coin', bitcoinAmount + ' BTC to ' + wCoinAmount.toFixed(2) + ' ₩');
    } else {
        alert("No W Coin to move!");
    }
}

function addTransactionRecord(type, details) {
    var transactionHistory = document.getElementById("transaction-history");
    
    if (!transactionHistory) {
        console.error("transaction-history element not found");
        return;
    }

    var transactionItem = document.createElement("li");
    transactionItem.className = "transaction-item";

    var transactionHeader = document.createElement("div");
    transactionHeader.className = "transaction-header";
    var dateSpan = document.createElement("span");
    var now = new Date();
    dateSpan.textContent = now.toISOString().split('T')[0];
    var typeSpan = document.createElement("span");
    typeSpan.textContent = type;

    transactionHeader.appendChild(dateSpan);
    transactionHeader.appendChild(typeSpan);

    var transactionDetails = document.createElement("div");
    transactionDetails.className = "transaction-details";
    transactionDetails.textContent = details;

    transactionItem.appendChild(transactionHeader);
    transactionItem.appendChild(transactionDetails);
    transactionHistory.appendChild(transactionItem);

    saveTransactionRecord(type, details, now.toISOString().split('T')[0]);
}

function saveTransactionRecord(type, details, date) {
    var transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push({ type, details, date });
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function loadTransactionRecords() {
    var transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.forEach(transaction => {
        var transactionItem = document.createElement("li");
        transactionItem.className = "transaction-item";

        var transactionHeader = document.createElement("div");
        transactionHeader.className = "transaction-header";
        var dateSpan = document.createElement("span");
        dateSpan.textContent = transaction.date;
        var typeSpan = document.createElement("span");
        typeSpan.textContent = transaction.type;

        transactionHeader.appendChild(dateSpan);
        transactionHeader.appendChild(typeSpan);

        var transactionDetails = document.createElement("div");
        transactionDetails.className = "transaction-details";
        transactionDetails.textContent = transaction.details;

        transactionItem.appendChild(transactionHeader);
        transactionItem.appendChild(transactionDetails);
        document.getElementById("transaction-history").appendChild(transactionItem);
    });
}



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
if (urlParams.has('gunHitCount')) {
	if( (parseInt(urlParams.get('gunHitCount'))) > 0 )
	{		
    const gunHitCount = parseInt(urlParams.get('gunHitCount'));
    addTransactionRecord("Transaction", "Gun bullets: " + gunHitCount+" -₩"+gunHitCount*10);
	}
}
if (urlParams.has('ThrowCount')) {
	if( (parseInt(urlParams.get('ThrowCount'))) > 0 )
	{		
    const gunHitCount = parseInt(urlParams.get('ThrowCount'));
    addTransactionRecord("Transaction", "Throwing: " + ThrowCount+" -₩"+ThrowCount*100);
	}
}
if (urlParams.has('SShotCount')) {
	if( (parseInt(urlParams.get('SShotCount'))) > 0 )
	{		
    const gunHitCount = parseInt(urlParams.get('SShotCount'));
    addTransactionRecord("Transaction", "Sniper bullets: " + SShotCount+" -₩"+SShotCount*50);
	}
}
document.getElementById('converter-link').addEventListener('click', function(event) {
    event.preventDefault();
    var cash = document.getElementById('user-cash').textContent;
    var bitcoin = document.getElementById('bitcoin').textContent;
    var link = this.getAttribute('href') + '?cash=' + cash + '&bitcoin=' + bitcoin;
    window.location.href = link;
});

function toggleTransactionDetails(id) {
    var details = document.getElementById("transaction-details-" + id);
    details.style.display = (details.style.display === "none") ? "block" : "none";
}

if (urlParams.has('imageNameArray')) {
    const imageNameArray = urlParams.get('imageNameArray');
    recordWeaponTransaction(imageNameArray);
}

function recordWeaponTransaction(imageNameArray) {
	var imageNameArrayAsArray = imageNameArray.split(',');
    var transactionItem = createTransactionItem('Weapon Trade', 'Weapons: ' + imageNameArrayAsArray.join(', '));
    var transactionHistory = document.getElementById("transaction-history");
    if (!transactionHistory) {
        console.error("transaction-history element not found");
        return;
    }
    transactionHistory.appendChild(transactionItem);
    saveTransactionRecord('Weapon Trade', 'Weapons: ' +  imageNameArrayAsArray.join(', '), getCurrentDate());
}

function createTransactionItem(type, details) {
    var transactionItem = document.createElement("li");
    transactionItem.className = "transaction-item";

    var transactionHeader = document.createElement("div");
    transactionHeader.className = "transaction-header";
    var dateSpan = document.createElement("span");
    dateSpan.textContent = getCurrentDate();
   var transactionHeader = document.createElement("div");
	transactionHeader.className = "transaction-header";
	var dateSpan = document.createElement("span");
	dateSpan.textContent = getCurrentDate();
	var typeSpan = document.createElement("span");
	typeSpan.textContent = type;

	transactionHeader.appendChild(dateSpan);
	transactionHeader.appendChild(typeSpan);

	var transactionDetails = document.createElement("div");
	transactionDetails.className = "transaction-details";
	transactionDetails.textContent = details;

	transactionItem.appendChild(transactionHeader);
	transactionItem.appendChild(transactionDetails);

	return transactionItem;
	}

	function getCurrentDate() {
		var now = new Date();
		return now.toISOString().split('T')[0];
	}

function clearTransactionRecords() {
    localStorage.removeItem('transactions');
    var transactionHistory = document.getElementById("transaction-history");
    if (transactionHistory) {
        transactionHistory.innerHTML = ''; 
    }
}
document.getElementById('clear-history-button').addEventListener('click', function() {
    clearTransactionRecords();
});