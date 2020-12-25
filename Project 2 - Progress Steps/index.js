const prev = document.querySelector('#prev');

const next = document.querySelector('#next');

function btnCheck() {

    let activeCount = document.querySelectorAll('.active');

    if (activeCount.length === 1) {
        prev.removeAttribute('class');
        prev.classList.add('disabled-btn');
        prev.disabled = true;
    } else if (activeCount.length === 7) {
        next.removeAttribute('class');
        next.classList.add('disabled-btn');
        next.disabled = true;
    }
          
    if (activeCount.length !== 1) {
        prev.removeAttribute('class');
        prev.disabled = false;
        prev.classList.add('active-btn');
    }
    
    if (activeCount.length !== 7) {
        next.removeAttribute('class');
        next.disabled = false;
        next.classList.add('active-btn');
    }
    
}

btnCheck();

next.addEventListener('click', addingColors);
    // (e) => {
    // let actValue = document.querySelectorAll('.active');
    // const count = actValue.length;
    // console.log(actValue[count - 1]);
    // let att = actValue[count - 1];
    // att.nextElementSibling.classList.add('active');
    // att.nextElementSibling.nextElementSibling.classList.add('active');
    // btnCheck();
    // e.preventDefault();

    // }


prev.addEventListener('click', addingColors);

function addingColors(e) {
    if (e.target.textContent === 'Previous') {
        e.target.blur();
    let actValue = document.querySelectorAll('.active');
    let att = actValue[actValue.length - 1];
    att.classList.remove('active');
    att.previousElementSibling.classList.remove('active');
    btnCheck();
    e.preventDefault();
    } else if (e.target.textContent === 'Next') {
    e.target.blur();
    let actValue = document.querySelectorAll('.active');
    let att = actValue[actValue.length - 1];
    att.nextElementSibling.classList.add('active');
    att.nextElementSibling.nextElementSibling.classList.add('active');
    btnCheck();
    e.preventDefault();
    }
   
}
