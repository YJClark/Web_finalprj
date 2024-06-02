$(document).ready(function(){
    function animateProgressBar(progressBar) {
        var width = 0;
        var interval = setInterval(function(){
            width += 5;
            progressBar.css('width', width + '%');
            progressBar.attr('aria-valuenow', width);
            progressBar.text(width + '%');
            if(width >= 100) {
                clearInterval(interval);
            }
        }, 500);
    }

    function addNewTasks() {
        var selectedRoles = JSON.parse(localStorage.getItem('selectedRoles'));
        if (selectedRoles) {
            Object.keys(selectedRoles).forEach(role => {
                var color = selectedRoles[role];
                var newProgressBar = $('<div class="progress mt-3"><div class="progress-bar" style="background-color: ' + color + ';" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div></div>');
                $("#progress-container").append(newProgressBar);
                animateProgressBar(newProgressBar.find('.progress-bar'));
            });
            localStorage.removeItem('selectedRoles');
        }
    }

    // Initial loading of progress bars
    addNewTasks();

    // Listen for changes in localStorage
    window.addEventListener('storage', function(event) {
        if (event.key === 'selectedRoles') {
            addNewTasks();
        }
    });
});