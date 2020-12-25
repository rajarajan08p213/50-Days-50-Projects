
const tiltContainer = document.querySelector('.wrap-container');

const circle = document.querySelector('.circle');

const navIcons = document.querySelector('ul');

circle.addEventListener('click', tilt);

function tilt(e) {
    if (e.target.classList.contains('fa-bars')) {
        tiltContainer.classList.remove('cancel');
        console.log('tilt clicked....');
        tiltContainer.classList.add('tilt');
        const bar = document.querySelector('.fa-bars');
        bar.remove();
        const times = document.querySelector('.fa-times');
        navIcons.classList.remove('tilt-display');
        times.classList.remove('tilt-display');
    } else if (e.target.classList.contains('fa-times')){
        console.log('Cancel clicked....');
        tiltContainer.classList.add('cancel');
        tiltContainer.classList.remove('tilt');
        circle.innerHTML = `<i class="fas fa-bars"></i> <i class="fas fa-times tilt-display"></i>`;
        navIcons.classList.add('tilt-display');
    }
}



