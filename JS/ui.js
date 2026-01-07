//THINGS THAT ILL USE:
import { tasksArrayData } from './logic.js';

const overlay = document.getElementById('formOverlay');
const editOverlay = document.getElementById('taskEditorOverlay');
const formTask = document.getElementById('taskFormId');
const statusSelector = document.querySelectorAll('.statusButton');
const prioritySelector = document.querySelectorAll('.priorityButton');

//Function to display cards
export function displayCards(tasksToDisplay, gridToDisplay){
    //First i have to reset the wholle innerhtml dont i?
    gridToDisplay.innerHTML = '';
    
    if(tasksArrayData.length == 0){
        alert("You don't have any Tasks!")
    }
    
    else{
        for(let i = 0; i < tasksToDisplay.length; i++){
            gridToDisplay.innerHTML += `
            <div class="card" id="${tasksToDisplay[i].id}">
                <header class="cardHeader">
                    <button type="button" class="statusButton ${tasksToDisplay[i].statusStyle}">${tasksToDisplay[i].status}</button>
                </header>

                <h3>${tasksToDisplay[i].title}</h3>
                
                <p class="description">
                    ${tasksToDisplay[i].description}
                </p>

                <div class="importantSection">
                    <div class="dueSection">
                        <span class="material-symbols-outlined">calendar_today</span>
                        <time datetime="${tasksToDisplay[i].dueDate}">Due: ${tasksToDisplay[i].dueDate}</time>
                    </div>
                    
                    <div class="priority ${tasksToDisplay[i].priority}">
                        <span class="material-symbols-outlined">flag</span>
                        <p>${tasksToDisplay[i].priority}</p>
                    </div>
                </div>
                
                <footer class="cardProgress">
                    <div class="topSection">
                        <p class="caption">Progress</p>
                        <p class="progressPercentage">${tasksToDisplay[i].percentage}%</p>
                    </div>
                    
                    <div class="progressBar" style="--progress: ${tasksToDisplay[i].percentage}%"></div>
                </footer>
            </div>
        `;
        }
    }
}

//Function to close the modal
export function closeModal(){
    overlay.classList.remove('active')
    resetForm();
}

export function editCloseModal(){
    editOverlay.classList.remove('active')
}

// Function to reset the form
export function resetForm(){
    // Resetting Values
    formTask.reset();

    // Resetting the custom Buttons
    removeArrayActive(statusSelector);
    removeArrayActive(prioritySelector);

    // Adding the defaults
    document.getElementById('inProgressStatus').classList.add('active');
    document.getElementById('mediumPriority').classList.add('active');
}

// Function to remove active class
export function removeArrayActive(array){
    array.forEach(element => {
        element.classList.remove("active")
    });
}

// Function to remove active class
export function removeElementActive(element){
    element.classList.remove("active")
}

// Changer to the all Tasks section
const filterBtns = document.querySelectorAll('.filterButton');
export function changerToTheAllTasks(){
    removeArrayActive(filterBtns);
    filterBtns.forEach(btn => {
        if(btn.textContent === 'All') btn.classList.add('active');
    });
}