//THINGS THAT ILL USE:
import {getTasks, saveData} from './storage.js';


// Getting the data back!
const savedData = getTasks();

//CREATING DATA STORAGER
export let tasksArrayData = savedData || [];

//Filtered Tasks Array
export let filteredTasksArrayData = [...tasksArrayData];

//Function to filter the task:
export function taskArrayFilter(status){
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
export function taskArraySearchFilter(filter){
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

export function saveArrayJS(task){
    tasksArrayData.push(task);
    // NOW WE SEND THE DATA ONTO THE JSON
    saveData(tasksArrayData);
}

export function editTaskArrayJS(task, index){
    tasksArrayData[index] = task;
    // NOW WE SEND THE DATA ONTO THE JSON
    saveData(tasksArrayData);
}