let taskInput = document.querySelector('.input');

let add = document.querySelector('.btn');


let tasks;
/*---------------------------Adding New Task-----------------------------------------*/

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

for(let j = uiLength-1; j<uiLength; j++){
    let li = document.createElement('li');
    ul.appendChild(li);
    li.innerHTML = `${tasks[j]}<button class="delete">Delete</button>`;
}
}
taskInput.clear();
e.preventDefault();
}   



/*------------------Retaining the task after refresh or  on new load-----------------------------*/

window.addEventListener('load', refresh);
function refresh (f){
    tasks = JSON.parse(localStorage.getItem('task'));
    tasks.forEach( i => {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML = `${i}<button class="delete">Delete</button>`;
    });
}

/*------------------------Deleting task from the task list--------------------------------*/

let clk = document.querySelector('.list');
clk.addEventListener('click',delList);
function delList(g){
if (g.target.classList.contains('delete')){
    let removeItem = g.target.previousSibling.textContent;
    // let removeItem = Item.substring(0,Item.length-1);
    let taskLists = JSON.parse(localStorage.getItem('task'));
    taskLists.forEach((task, ind) => {
        if (removeItem===task){
        taskLists.splice(ind,1);
        }
    });
localStorage.setItem('task', JSON.stringify(taskLists));  
location.reload();
}
}

/*------------------------Searching and Filtering the Task------------------------------------*/

let searchInput = document.querySelector('#search');
searchInput.addEventListener('keyup', filter);

function filter(sf){
const text = sf.target.value.toLowerCase();
let tasksLists = document.querySelectorAll('li');
    tasksLists.forEach((task, index) => {
        console.log(task.lastElementChild.previousSibling.textContent);
let value = (task.lastElementChild.previousSibling.textContent).toLowerCase();
if(value.startsWith(text)){
    task.style.display = 'flex';
}else{
task.style.display = 'none';
}
});
}
