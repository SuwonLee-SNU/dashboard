const todo = document.querySelector('.todo-list');
const todoForm = todo.querySelector('form');
const todoInput = todo.querySelector('input');

function loadTodos () {
    todoListFromLS = localStorage.getItem('TODO');
    let todoList = [];
    if (todoListFromLS !== null) {
        const parsedToDos = JSON.parse(todoListFromLS);
        todoList = parsedToDos;
    }
    return todoList;
}
function genTodos (todoList) {
    myList = todo.querySelector('ul');
    myList.innerText = ''; // ← clear the ul element
    let len = [];
    // Generated ul from current todoList 
    todoList.forEach((v) => {
        const elem = document.createElement('li');
        elem.innerHTML= '<button class="checkBtn" status="off")>⬜</button>'
         + `<span>${v}</span>`
         + '<button class="delBtn">✕</button>';
        myList.appendChild(elem);
        elem.querySelector('.delBtn').addEventListener('click', handleDelete);
        elem.querySelector('.checkBtn').addEventListener('click', handleCheck);
    });
    // find maximum width
    listElements = myList.querySelectorAll('li');
    for (let i=0;i<todoList.length;i++) {
        len[i] = Number(listElements[i].clientWidth);
    }
    const maximumVal = Math.max.apply(null, len);
    // Apply width for all elements
    listElements.forEach((v) => {
        v.querySelector('span').style.minWidth=`${maximumVal}px`;
    });
}

function handleSubmit (e) {
    e.preventDefault();
    // update todoList
    const todoList = loadTodos();
    todoList.push(todoInput.value);
    localStorage.setItem('TODO', JSON.stringify(todoList));
    // update ul
    genTodos(todoList);
    // update and save checklist
    loadChecked();
    const checkList = scanChecked();
    saveChecked(checkList);
    // remove text from the input form
    todoInput.value = "";
}
function handleDelete (e) {
    // Remove from the list
    let li = e.target.parentNode;
    let idx = 0;
    for (let i=1; (li=li.previousSibling); i++) {
        idx = i};
    const ul = todo.querySelector('ul');
    ul.removeChild(e.target.parentNode);
    // remove from the local storage
    const todoList = loadTodos();
    todoList.splice(idx,1);
    localStorage.setItem('TODO', JSON.stringify(todoList));
    const checkList = scanChecked();
    saveChecked(checkList);
    genTodos(todoList);
    loadChecked();
}
function handleCheck (e) {
    if (e.target.getAttribute('status') === "off") {
        e.target.innerText = '✅';
        e.target.setAttribute('status', 'on');
        e.target.parentNode.querySelector('span').style.textDecoration="line-through";
    } else {
        e.target.innerText = '⬜';
        e.target.setAttribute('status', 'off');
        e.target.parentNode.querySelector('span').style.textDecoration="none";
    }
    const checkList = scanChecked();
    saveChecked(checkList);
}

function handleCheckAll (e) {
    const currentCheckBtns = document.querySelectorAll('.checkBtn');
    let checkList = [];
    currentCheckBtns.forEach((v)=>checkList.push(1));
    saveChecked(checkList);
    genTodos(loadTodos());
    loadChecked();
}

function handleUncheckAll (e) {
    const currentCheckBtns = document.querySelectorAll('.checkBtn');
    let checkList = [];
    currentCheckBtns.forEach((v)=>checkList.push(0));
    saveChecked(checkList);
    const todoList = loadTodos();
    genTodos(todoList);
    loadChecked();
}

function handleDeleteChecked (e) {
    // get index of checked items
    const checkList = scanChecked();
    const todoListFromLS = JSON.parse(localStorage.getItem('TODO'));
    const checkListFromLS = JSON.parse(localStorage.getItem('checkList'));
    let todoListNew = [];
    let checkListNew = [];
    for (let i=0;i<checkList.length;i++) {
        if (checkList[i] !== 1) {
            checkListNew.push(checkListFromLS[i]);
            todoListNew.push(todoListFromLS[i]);
        }
    }
    // remove item from the local storage
    localStorage.setItem('TODO', JSON.stringify(todoListNew));
    localStorage.setItem('checkList', JSON.stringify(checkListNew));
    // reload ul view
    genTodos(todoListNew);
    loadChecked();
}

function handleDeleteAll (e) {
    localStorage.removeItem('TODO');
    localStorage.removeItem('checkList');
    myList = todo.querySelector('ul');
    myList.innerText = [];
    todoList = [];
}

function scanChecked () {
    const currentCheckBtns = document.querySelectorAll('.checkBtn');
    let checkList = [];
    currentCheckBtns.forEach((v)=> {
        if (v.getAttribute('status') === 'on') {
            checkList.push(1);
        } else {
            checkList.push(0);
        };
    });
    return checkList
}

function saveChecked (checkList) {
    localStorage.setItem('checkList', JSON.stringify(checkList));
}

function loadChecked () {
    checkedListFromLS = localStorage.getItem('checkList');
    if (checkedListFromLS !== null) {
        const parsedChecked = JSON.parse(checkedListFromLS);
        checkedList = parsedChecked;
        updateChecked(checkedList);
    }
}
function updateChecked (checkList) {
    const currentCheckBtns = document.querySelectorAll('.checkBtn');
    for (let id=0;id<checkList.length;id++) {
        if (checkList[id] === 1) {
            currentCheckBtns[id].click();
        }
    }
}
function init () {
    myList = document.createElement('ul');
    myList.style.listStyle = 'none';
    todo.appendChild(myList);
    genTodos(loadTodos());
    loadChecked();
    todoForm.addEventListener('submit',handleSubmit);
    document.querySelector('.checkAllButton').addEventListener('click',handleCheckAll);
    document.querySelector('.uncheckAllButton').addEventListener('click',handleUncheckAll);
    document.querySelector('.deleteCheckedButton').addEventListener('click',handleDeleteChecked);
    document.querySelector('.deleteAllButton').addEventListener('click',handleDeleteAll);
}   

init();