const filterBtns = document.querySelectorAll('.filterButton');
const newTaskBtn = document.getElementById('newTaskButton');

//Itering trough em
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        //Desactivating
        removeArrayActive(filterBtns);

        btn.classList.add("active")
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
let tasksArrayData = [];

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
    const statusStyle = document.querySelector('.statusButton.active').classList;
    statusStyle.remove('active');
    const priority = document.querySelector('.priorityButton.active').textContent;
    const percentage = document.getElementById('percentageInput').value;

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

    console.log(task);

    //SUBMITTING THE TASK TO THE ARRAY OF TASKS
    tasksArrayData.push(task);
    console.log(tasksArrayData);

    // Submitting the card to display:
    displayCards(tasksArrayData, allTasksGrid);

    //Closing the overlay modal
    closeModal();
});

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