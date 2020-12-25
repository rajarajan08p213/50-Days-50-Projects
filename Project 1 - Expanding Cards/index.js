let imgClck = document.querySelector('body');

imgClck.addEventListener('click', (e) => {

    if (e.target.classList.contains('height')) {
        let rmExpand = document.querySelector('.new-height');
        if (rmExpand !== null) {
            rmExpand.classList.remove('new-height');
        }
        e.target.classList.add('new-height');
    }
});



