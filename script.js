const filterBtns = document.querySelectorAll('.filterButton');
const newTaskBtn = document.getElementById('newTaskButton');

//Itering trough em
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
        displayCards(filteredTasksArrayData, allTasksGrid);
    })
});

//Overlay const
const overlay = document.getElementById('overlay')

//Listener for the newTaskButton:
newTaskBtn.addEventListener('click', () => {
    overlay.classList.add('active');
});

//Listener for closing the overlay:
const closeButton = document.getElementById('closeOverlay')

closeButton.addEventListener('click', () => {
    closeModal();
});
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

//FOR THE BUTTONS INSIDE THE SELECTORS
const statusSelector = document.querySelectorAll('.statusButton')
const prioritySelector = document.querySelectorAll('.priorityButton')

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

//Form, reset, submit
const formTask = document.getElementById('taskFormId');
const resetButton = document.getElementById('resetButton')
const submitButton = document.getElementById('submitButton')

//CREATING DATA STORAGER
let tasksArrayData = [
    {
        id: 1767368039973,
        title: "Project Alpha",
        description: "Complete the initial wireframes and documentation.",
        dueDate: "2026-01-15",
        percentage: 100,
        priority: "High",
        status: "Completed",
        statusStyle: "completedStatus" // Using string for better compatibility
    },
    {
        id: 1767368045000,
        title: "Gym Session",
        description: "Upper body workout at RIR 0-1.",
        dueDate: "2026-01-02",
        percentage: 50,
        priority: "Medium",
        status: "In Progress",
        statusStyle: "inProgressStatus"
    },
    {
        id: 1767368051000,
        title: "Hair Care Routine",
        description: "Apply Garnier Fructis Hair Food Cacao mask.",
        dueDate: "2026-01-05",
        percentage: 0,
        priority: "Low",
        status: "Pending",
        statusStyle: "pendingStatus"
    },
    {
        id: 1767368062000,
        title: "Buy Groceries",
        description: "Focus on high protein and low sodium items.",
        dueDate: "2026-01-03",
        percentage: 20,
        priority: "High",
        status: "In Progress",
        statusStyle: "inProgressStatus"
    }
];

//CREATING RESET BUTTON:
resetButton.addEventListener('click', ()=>{
    resetForm();
});

function resetForm(){
    // Resetting Values
    formTask.reset();

    // Resetting the custom Buttons
    removeArrayActive(statusSelector);
    removeArrayActive(prioritySelector);

    // Adding the defaults
    document.getElementById('inProgressStatus').classList.add('active');
    document.getElementById('mediumPriority').classList.add('active');
}

//Getting the form info
const allTasksGrid = document.getElementById('allTasksGrid');
formTask.addEventListener('submit', (e)=>{
    e.preventDefault();

    const title = document.getElementById('titleInput').value;
    const description = document.getElementById('descriptionInput').value;
    const dueDate = document.getElementById('dueDateInput').value;
    const status = document.querySelector('.statusButton.active').textContent;
    //IF IS COMPLETED THEN THE PERCENTAGE SHOULD BE 100%
    const statusStyle = document.querySelector('.statusButton.active').classList;
    statusStyle.remove('active');
    const priority = document.querySelector('.priorityButton.active').textContent;
    let percentage = 0;
    percentage = document.getElementById('percentageInput').value;
    if (status == 'Completed'){
        percentage = 100;
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

    //SUBMITTING THE TASK TO THE ARRAY OF TASKS
    tasksArrayData.push(task);

    //VERIFYING WHICH FILTER AM I ON:
    const currentFilter = document.querySelector('.filterButton.active').textContent;

    //DEBUGGING 
    console.log(task);

    taskArrayFilter(currentFilter);

    // Submitting the card to display:
    displayCards(filteredTasksArrayData, allTasksGrid);

    //Closing the overlay modal
    closeModal();
});

//FILTERED TASK
//Filtered Tasks Grid to display at
const filteredTasks = document.getElementById('filteredTasksGrid');
//Filtered Tasks Array
let filteredTasksArrayData = [];

//FILTERING WITH INPUT
const searchInput = document.getElementById('searchInput')

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

//FUNCTIONS

// Function to filter the task:
function taskArrayFilter(status){
    //Filtering the tasks using the STATUS
    if(status == 'All'){
        filteredTasksArrayData = tasksArrayData;
    }

    //If not, we filter the data
    else{
        filteredTasksArrayData = tasksArrayData.filter(task => task.status === status);
    }
}

// Function to filter by INPUT
function taskArraySearchFilter(filter){
    const term = filter.toLowerCase();
    if(term == ''){
        filteredTasksArrayData = tasksArrayData;
    }

    //If not, we filter the data
    else{
        filteredTasksArrayData = tasksArrayData.filter(task => 
            task.title.toLowerCase().includes(term)
        );
    }
}

function closeModal(){
    overlay.classList.remove('active')
    resetForm();
}

function removeArrayActive(array){
    array.forEach(element => {
        element.classList.remove("active")
    });
}

function removeElementActive(element){
    element.classList.remove("active")
}

//Function to display cards
function displayCards(tasksToDisplay, gridToDisplay){
    //First i have to reset the wholle innerhtml dont i?
    gridToDisplay.innerHTML = '';
    
    if(tasksArrayData.length == 0){
        alert("You don't have any Tasks!")
    }
    
    else{
        for(i = 0; i < tasksToDisplay.length; i++){
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