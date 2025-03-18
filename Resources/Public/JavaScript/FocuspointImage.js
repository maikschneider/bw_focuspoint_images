document.querySelectorAll('.focuspoint__svg__rect').forEach(rect => {
    const description = document.querySelector('#' + rect.getAttribute('id') + '-description');

    rect.addEventListener('mouseover', function () {
        description.setAttribute('style', 'display:inherit');
    });

    rect.addEventListener('mouseout', function () {
        description.setAttribute('style', '');
    });
})


