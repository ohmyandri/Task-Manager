// Importing Functions
import { TASKS_KEY} from './storage.js';
import { saveArrayJS, tasksArrayData, filteredTasksArrayData, taskArrayFilter, taskArraySearchFilter } from './logic.js';
import { displayCards, closeModal, resetForm, removeArrayActive } from './ui.js';

const searchInput = document.getElementById('searchInput')
const prioritySelector = document.querySelectorAll('.priorityButton')
const allTasksGrid = document.getElementById('allTasksGrid');
const resetButton = document.getElementById('resetButton')
const filterBtns = document.querySelectorAll('.filterButton');
const newTaskBtn = document.getElementById('newTaskButton');
const overlay = document.getElementById('overlay')
const closeButton = document.getElementById('closeOverlay');
const formTask = document.getElementById('taskFormId');
const statusSelector = document.querySelectorAll('.statusButton');

// Listeners:
newTaskBtn.addEventListener('click', () => {
    overlay.classList.add('active');
});

closeButton.addEventListener('click', () => {
    closeModal();
});

overlay.addEventListener('click', (e) => {
    const formTask = document.getElementById('taskFormId');
    if (e.target === overlay){
        closeModal();
    };
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
       closeModal();
    }
});

//CREATING RESET BUTTON:
resetButton.addEventListener('click', ()=>{
    resetForm();
});

//Getting the form info
formTask.addEventListener('submit', (e)=>{
    e.preventDefault();

    const title = document.getElementById('titleInput').value;
    const description = document.getElementById('descriptionInput').value;
    const dueDate = document.getElementById('dueDateInput').value;
    let status = document.querySelector('.statusButton.active').textContent;
    //IF IS COMPLETED THEN THE PERCENTAGE SHOULD BE 100%
    let statusStyle = document.querySelector('.statusButton.active').classList[0];
    console.log(statusStyle);
    const priority = document.querySelector('.priorityButton.active').textContent;
    let percentage = 0;
    //If the percentage is 100%, then, the status should be Completed
    percentage = document.getElementById('percentageInput').value;

    if (status == 'Completed' || percentage == 100){
        percentage = 100;
        status = 'Completed';
        statusStyle = 'completedStatus';
    }

    //CREATING THE DATA:
    const task = {
        id: Date.now(),
        title,
        description,
        dueDate,
        status,
        statusStyle,
        priority,
        percentage: Number(percentage)
    }

    //SUBMITTING THE TASK TO THE JS ARRAY, SENDING THE DATA TO THE WEB-STORAGE:
    saveArrayJS(task);

    //DEBUG
    console.log(localStorage.getItem(TASKS_KEY))

    console.log(JSON.parse(localStorage.getItem(TASKS_KEY)))
    

    //VERIFYING WHICH FILTER AM I ON:
    const currentFilter = document.querySelector('.filterButton.active').textContent;

    taskArrayFilter(currentFilter);

    // Submitting the card to display:
    displayCards(filteredTasksArrayData, allTasksGrid);

    //Closing the overlay modal
    closeModal();
});

//FILTERING WITH INPUT

searchInput.addEventListener('input', (e) => {
    e.preventDefault();

    // Filtering
    taskArraySearchFilter(e.target.value);

    // Display it
    displayCards(filteredTasksArrayData, allTasksGrid);
});

// Displaying Cards as soon as the windows reloads:
window.addEventListener('DOMContentLoaded', () => {
    // This ensures all HTML elements exist before running the function
    displayCards(tasksArrayData, allTasksGrid);
});

// For each'es:
statusSelector.forEach(btn => {
    btn.addEventListener('click', () =>{
        removeArrayActive(statusSelector);
        btn.classList.add('active');
    });
});

prioritySelector.forEach(btn => {
    btn.addEventListener('click', () =>{
        removeArrayActive(prioritySelector);
        btn.classList.add('active');
    });
});

// Itering trough em
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        //Desactivating
        removeArrayActive(filterBtns);
        //Adding Class Active
        btn.classList.add("active");

        //Filtering the new Array
        console.log(btn.textContent);
        taskArrayFilter(btn.textContent);
        console.log(filteredTasksArrayData);

        //Changing to the new Section of Filtered Array
        //Displaying the Filtered Tasks
        const statusSelector = document.querySelectorAll('.statusButton')
        displayCards(filteredTasksArrayData, allTasksGrid);
    })
});