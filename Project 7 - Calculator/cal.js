
const clear = document.querySelector('.Reset');
const inputData = document.querySelector('.data');
inputData.addEventListener('click', getData);

/*--------------------Getting Data from the User ----------------------------*/

function getData(e) {
  if (e.target.value.length === 1) {
    addingValue(e);
  } else if (e.target.value.length === 3) {
    captureCalc(e);
  } else if (e.target.classList.value === "equal") {
    equal(e);
  } else if (e.target.classList.value === "Reset") {
    clearValue();
  } else if (e.target.value === Percent) {
    percentValue();
  }
}

/*--------------------Clearing input value on each operation----------------------------*/

let release = document.querySelectorAll('.blur');
console.log(release);
release.forEach(function (rl) {
  rl.addEventListener('blur', inputClear);
});


function inputClear(g) {
  console.log(g.type, g.target.classList.value, g);
    input.value = '';
}
/*--------------------Clearing all Data----------------------------*/
clear.addEventListener('click', () => {
  input.value = '';
  sessionStorage.removeItem('val');
  sessionStorage.removeItem('operation');
})

/*--------------------Mathematical Operations----------------------------*/

let input = document.querySelector('#number');

function equal() {
  if (sessionStorage.getItem('val') !== null) {
  console.log(input.value, typeof (input.value));
  const fValue = parseFloat(sessionStorage.getItem('val'));
  console.log(fValue);
  const sValue = parseFloat(input.value);
  const oper = sessionStorage.getItem('operation');
  const result = math(fValue, sValue, oper);
  sessionStorage.setItem('val', result);
  sessionStorage.removeItem('operation');
  input.value = result;
}
}

function addingValue(e) {

  input.value = input.value + e.target.value;
}


function captureCalc(f) {
  if (input.value.length === 0) {
    console.log("No value", input.value.length);
  } else if (sessionStorage.getItem('val') === null) {
    sessionStorage.setItem('val', input.value);
    sessionStorage.setItem('operation', f.target.value);
  } else if ((sessionStorage.getItem('val')!==null) && (sessionStorage.getItem('operation')!==null)){

    const firstValue = parseFloat(sessionStorage.getItem('val'));
    const secondValue = parseFloat(input.value);
    const operation = sessionStorage.getItem('operation');
    const result = math(firstValue, secondValue, operation);
    sessionStorage.setItem('val', result);
    sessionStorage.setItem('operation', f.target.value);
    input.value = result;
  } else if ((sessionStorage.getItem('val') !== null) && (sessionStorage.getItem('operation') === null)) {
    const operation = sessionStorage.setItem('operation', f.target.value);
  }
}

function math(a, b, op) {
  switch (op) {
    case "add": return a + b;
      break;
    
    case "sub": return a - b;
      break;
    
    case "mlt": return a * b;
      break;
    
    case "dvd": return a / b;
      break;

}
}

function clearValue(){
  
  input.value = '';
  sessionStorage.removeItem('val');
  sessionStorage.removeItem('operation');
  
}