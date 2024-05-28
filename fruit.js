





function increaseCount(item) {
    let count = parseInt(item.parentNode.querySelector('span').innerHTML);
    item.parentNode.querySelector('span').innerHTML = count + 1;
}
function decreaseCount(item) {
    let count = parseInt(item.parentNode.querySelector('span').innerHTML);
    if (count > 0) {
        item.parentNode.querySelector('span').innerHTML = count - 1;
    }
}
            