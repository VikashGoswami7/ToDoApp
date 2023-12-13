const taskArray = getDataFromLocalStorage();
displayDeleteAll(taskArray);
 
taskArray.forEach((task) => {
    addTaskHandler(task);
});

function displayDeleteAll(taskArray){
    if (taskArray.length) {
        document.getElementById('deleteAll').style.display ='block';
    } else {
        document.getElementById('deleteAll').style.display ='none'; 
    }
}

function addtask() {
    const task = document.getElementById('input').value;
    if (task.length) {
        setDataToLocalStorage(task);
        addTaskHandler(task);
    } else {
        alert("please add text")
    }
}
function createListTextElement(task){
    let spanElementForText = document.createElement('span');
    spanElementForText.className = 'text';
    spanElementForText.innerText = task;
    return spanElementForText;
}
function createActionsElement(task){
    let spanElementForActions = document.createElement('span');
    spanElementForActions.className = 'actions';

    let editButtonElement = document.createElement('button');
    editButtonElement.innerText = 'Edit';
    editButtonElement.className = 'editBtn';
    editButtonElement.addEventListener('click', editHandler);

    let deleteButtonElement = document.createElement('button');
    deleteButtonElement.innerText = 'Delete';
    deleteButtonElement.className = 'deleteBtn';
    deleteButtonElement.addEventListener('click', deleteHandler);

    spanElementForActions.append(editButtonElement, deleteButtonElement);
    

    return spanElementForActions;
}

function addTaskHandler(task) {
    let listElement = document.createElement('li');
    listElement.addEventListener('click',selectList);
    
    let spanElementForText = createListTextElement(task);
    let actionElement = createActionsElement(task);
    const uid = Math.round(Math.random()*1000000000000);
    listElement.setAttribute('uid',uid);
    
    listElement.appendChild(spanElementForText);
    listElement.appendChild(actionElement);

    let list = document.getElementById('list');
    list.appendChild(listElement);

    document.getElementById('input').value = '';
    document.getElementById('deleteAll').style.display = 'block';
    
}

function getDataFromLocalStorage() {
    let tasks = localStorage.getItem('tasks');
    tasks = tasks ? JSON.parse(tasks) : [];

    return tasks;
}

function setDataToLocalStorage(task) {
    const taskArray = getDataFromLocalStorage();
    taskArray.push(task);
    const stringifiedTasks = JSON.stringify(taskArray);
    localStorage.setItem('tasks', stringifiedTasks);
}

function onkey(event) {
    if (event.keyCode === 13) {
        addtask();
    }
}

function deleteAll() {
    localStorage.removeItem('tasks');
    location.reload();
}

function editHandler(event){
    const button = event.target;
    button.innerText= 'Save';
    button.className= 'saveBtn';
    button.removeEventListener('click',editHandler);
    button.addEventListener('click',saveHandler);
    const actionsElement = button.parentElement;
    const listElement = actionsElement.parentElement;
    const textElement = listElement.firstChild;
    
    const inputElement = document.createElement('input');
    inputElement.value = textElement.innerText;
    inputElement.className = 'editInput';

    listElement.replaceChild(inputElement, textElement);
}

function deleteHandler(event){
    const button = event.target;
    const actionsElement = button.parentElement;
    const listElement = actionsElement.parentElement;
    const uid = listElement.getAttribute('uid');
    const index = getNodeIndex(uid);
    deleteDataUsingIndex(index);
}

function saveHandler(event){
    const button = event.target;
    button.innerText= 'Edit';
    button.className= 'editBtn';
    button.removeEventListener('click',saveHandler);
    button.addEventListener('click', editHandler);

    const actionsElement = button.parentElement;
    const listElement = actionsElement.parentElement;

    const uid = listElement.getAttribute('uid');
    const index = getNodeIndex(uid);

    const inputElement = listElement.firstChild;
    const value = inputElement.value;

    storeDataUsingIndex(value,index);

    const textElement = document.createElement('span');
    textElement.className = 'text';
    textElement.innerText = inputElement.value;
    
    listElement.replaceChild(textElement,inputElement);

}

function getNodeIndex(uid){
    const listItems = Array.from(document.getElementsByTagName('li'));
    const updatedIndex = listItems.findIndex((item) => {
        return item.getAttribute('uid') === uid;
    });

    // console.log(updatedIndex);
    return updatedIndex;
}

function storeDataUsingIndex(task,index){
    const taskList = localStorage.getItem('tasks');
    const taskArray = JSON.parse(taskList);
    taskArray.splice(index,1,task);
    const stringifiedTasks = JSON.stringify(taskArray);
    localStorage.setItem('tasks', stringifiedTasks);
}

function deleteDataUsingIndex(index){
    const taskList = localStorage.getItem('tasks');
    const taskArray = JSON.parse(taskList);
    taskArray.splice(index,1);
    const stringifiedTasks = JSON.stringify(taskArray);
    localStorage.setItem('tasks', stringifiedTasks);
    location.reload();
}

function selectList(event){
    let list = event.target;
    // list.className = 'selected';
    if (list.className){
        list.className = '';
    } else {
        list.className = 'selected';
    }
     toggleDeleteSelectedBtn();
}

function toggleDeleteSelectedBtn(){
    let selectedLists = Array.from(document.getElementsByClassName('selected'));
    if(selectedLists.length >0){
        document.getElementById('deleteAll').style.display = 'none';
        document.getElementById('deleteSelected').style.display = 'block';
    } else {
        document.getElementById('deleteAll').style.display = 'block';
        document.getElementById('deleteSelected').style.display = 'none';
    }
    
}

function deleteSelected(){
    let 
}