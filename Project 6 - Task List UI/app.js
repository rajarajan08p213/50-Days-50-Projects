let taskInput = document.querySelector('.input');

let add = document.querySelector('.btn');


let tasks;
let ul = document.querySelector('ul');
add.addEventListener('click', taskAdding);

function taskAdding(e){
    if (taskInput.value === null || taskInput.value ===""){
        alert("Task is Empty. Please Enter some Task and click Add");
    }
    else{
if (localStorage.getItem('task')===null){
    tasks = [];
}else{
    tasks = JSON.parse(localStorage.getItem('task'));
}
tasks.push(taskInput.value);
localStorage.setItem('task', JSON.stringify(tasks));
tasks = JSON.parse(localStorage.getItem('task'));
let uiLength = tasks.length;
console.log(uiLength);
if (uiLength!==1){
    console.log("uiLength");
for(let i = uiLength-1; i<uiLength; i++ ){
        let li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML = `${task[i]} <button class="delete">Delete</button>`;
        }
// tasks.forEach( i => {
//     let li = document.createElement('li');
//     ul.appendChild(li);
//     li.innerHTML = `${i} <button class="delete">Delete</button>`;
// });
} else{
    tasks.forEach( i => {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML = `${i} <button class="delete">Delete</button>`;
    });
// tasks = JSON.parse(localStorage.getItem('task'));
// let uiLength = tasks.length;
// console.log(uiLength);
//     for(let i = uiLength-1; i<uiLength; i++ ){
//     let li = document.createElement('li');
//     ul.appendChild(li);
//     li.innerHTML = `${task[i]} <button class="delete">Delete</button>`;
//     }
}


    }

    e.preventDefault();
}