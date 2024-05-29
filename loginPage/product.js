$(document).ready(function() {
    function handleClick(button, callback) {
        $(button).addClass('clicked');
        setTimeout(function() {
            $(button).removeClass('clicked');
        }, 100);
        callback(button);
    }

    function increaseCount(button) {
        let span = $(button).siblings('span');
        let count = parseInt(span.text());
        span.text(count + 1);
    }

    function decreaseCount(button) {
        let span = $(button).siblings('span');
        let count = parseInt(span.text());
        if (count > 0) {
            span.text(count - 1);
        }
    }

    $('.get1').click(function() {
        handleClick(this, increaseCount);
    });

    $('.drop1').click(function() {
        handleClick(this, decreaseCount);
    });
});

