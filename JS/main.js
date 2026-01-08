// Importing Functions
import { TASKS_KEY} from './storage.js';
import { saveArrayJS, editTaskArrayJS, tasksArrayData, filteredTasksArrayData, taskArrayFilter, taskArraySearchFilter } from './logic.js';
import { changerToTheAllTasks ,displayCards, closeModal, editCloseModal ,resetForm, removeArrayActive, displayTaskDetails} from './ui.js';

const searchInput = document.getElementById('searchInput')
const prioritySelector = document.querySelectorAll('.priorityButton')
const allTasksGrid = document.getElementById('allTasksGrid');
const resetButton = document.getElementById('resetButton')
const filterBtns = document.querySelectorAll('.filterButton');
const newTaskBtn = document.getElementById('newTaskButton');
const overlay = document.getElementById('formOverlay')
const editOverlay = document.getElementById('taskEditorOverlay')
const closeButton = document.getElementById('closeOverlay');
const editCloseButton = document.getElementById('closeEditOverlay');
const formTask = document.getElementById('taskFormId');
const statusSelector = document.querySelectorAll('.statusButton');
const cardsArray = document.querySelectorAll(".card");

// Listeners:
//Add task
newTaskBtn.addEventListener('click', () => {
    overlay.classList.add('active');
});

//Edit task
allTasksGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.card');

    //Getting the taskID from the ajam
    if(card){
        const taskId = card.id;
        const indexTaskToEdit = tasksArrayData.findIndex(task => task.id == taskId);
        let taskToEdit = tasksArrayData[indexTaskToEdit];

        //We display the taskDetails
        displayTaskDetails(taskToEdit)
        //Adding the index to the hiddenInput:
        document.getElementById('hiddenTaskInput').value = indexTaskToEdit;

        //We Edit the task on the submit so no need to do something here:

        //Displaying the modal/overlay
        editOverlay.classList.add('active');
    }
});

//Close Modal
closeButton.addEventListener('click', () => {
    closeModal();
});

//Close edit modal
editCloseButton.addEventListener('click', () => {
    editCloseModal();
});


//Close MODALS
//Close New Task Modal
overlay.addEventListener('click', (e) => {
    if (e.target === overlay){
        closeModal();
    };
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
       closeModal();
    }
});

//Close Edit Modals
editOverlay.addEventListener('click', (e) => {
    if (e.target === editOverlay){
        editCloseModal();
    };
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
       editCloseModal();
    }
});

//CREATING RESET BUTTON:
resetButton.addEventListener('click', ()=>{
    const currentForm = document.querySelector('.overlay.active .taskForm')
    resetForm(currentForm);
});

const resetButtonEditTask = document.getElementById('resetEditButton');

resetButtonEditTask.addEventListener('click', ()=>{
    const currentEditForm = document.querySelector('.overlay.active .taskForm')
    resetForm(currentEditForm);
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

    //VERIFYING WHICH FILTER AM I ON:
    const currentFilter = document.querySelector('.filterButton.active').textContent;

    taskArrayFilter(currentFilter);

    // Submitting the card to display:
    displayCards(filteredTasksArrayData, allTasksGrid);

    //Closing the overlay modal
    closeModal();
});

//Getting the Edit-Task form info
const editTaskForm = document.getElementById('taskFormEditId');

editTaskForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const title = document.getElementById('titleEditInput').value;
    const description = document.getElementById('descriptionEditInput').value;
    const dueDate = document.getElementById('dueDateEditInput').value;
    let status = editOverlay.querySelector('.statusButton.active').textContent;
    //IF IS COMPLETED THEN THE PERCENTAGE SHOULD BE 100%
    let statusStyle = editOverlay.querySelector('.statusButton.active').classList[0];
    const priority = editOverlay.querySelector('.priorityButton.active').textContent;
    let percentage = 0;

    //If the percentage is 100%, then, the status should be Completed
    percentage = document.getElementById('percentageEditInput').value;

    //Getting the index of the task!
    const index = document.getElementById('hiddenTaskInput').value;


    if (status == 'Completed' || percentage == 100){
        percentage = 100;
        status = 'Completed';
        statusStyle = 'completedStatus';
    }

    //CREATING THE DATA:
    const editedTask = {
        id: Date.now(),
        title,
        description,
        dueDate,
        status,
        statusStyle,
        priority,
        percentage: Number(percentage)
    }

    console.log(editedTask);

    //SUBMITTING THE NEW EDITED TASK TO THE JS ARRAY, SENDING THE DATA TO THE WEB-STORAGE:
    editTaskArrayJS(editedTask, index)

    //VERIFYING WHICH FILTER AM I ON:
    const currentFilter = document.querySelector('.filterButton.active').textContent;

    taskArrayFilter(currentFilter);

    // Submitting the card to display:
    displayCards(filteredTasksArrayData, allTasksGrid);

    //Closing the overlay modal
    editCloseModal();
});

//FILTERING WITH INPUT
searchInput.addEventListener('input', (e) => {
    e.preventDefault();

    // Filtering
    taskArraySearchFilter(e.target.value);


    // CHANGING TO THE ALL TASKS SECTION
    changerToTheAllTasks();

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
        taskArrayFilter(btn.textContent);

        //Changing to the new Section of Filtered Array
        //Displaying the Filtered Tasks
        const statusSelector = document.querySelectorAll('.statusButton')
        displayCards(filteredTasksArrayData, allTasksGrid);
    })
});