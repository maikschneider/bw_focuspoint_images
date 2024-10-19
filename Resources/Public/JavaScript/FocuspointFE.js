const rects = document.getElementsByClassName('focuspoint__svg__rect');
for (let i = 0; i < rects.length; i++) {
    rects[i].addEventListener('mouseover', function () {
        document.getElementById(this.getAttribute('id') + '-description').setAttribute('style', 'display:inherit');
    });
    rects[i].addEventListener('mouseout', function () {
        document.getElementById(this.getAttribute('id') + '-description').setAttribute('style', '');
    });
}