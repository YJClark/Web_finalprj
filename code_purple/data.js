
function analyzeData(targetId, targetName, targetLocation, lastSeen) {
     alert('Analyzing data...');
    showContactRelationship(targetId, targetName, targetLocation, lastSeen);
}

function showContactRelationship(targetId, targetName, targetLocation, lastSeen) {
	updatePrice(targetId);
    window.location.href = `contact.html?targetId=${targetId}&targetName=${targetName}&targetLocation=${targetLocation}&lastSeen=${lastSeen}`;
}

function updatePrice(itemImage) {
            window.parent.postMessage({ type: 'priceUpdate',itemImage: itemImage}, '*');
        }