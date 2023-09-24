const overview = document.querySelector('.overview');

overview.addEventListener('mouseenter', function () {
    overview.classList.remove('hide');
});

overview.addEventListener('mouseleave', function () {
    overview.classList.add('hide');
});