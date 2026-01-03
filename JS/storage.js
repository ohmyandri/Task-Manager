// Constant to get the key
export const TASKS_KEY = 'my_dashboard_tasks';


// GETS AN ARRAY AND SAVES IT
export function saveData(tasks){
    // STRINGIFYING THE DATA
    const dataString = JSON.stringify(tasks);
    localStorage.setItem(TASKS_KEY, dataString)
}

export function getTasks() {
    // ASKING FOR THE DATA
    const tasksString = localStorage.getItem(TASKS_KEY);
    
    // IF IT IS EMPTY WE RETURN NULL
    if (!tasksString){
        return null;
    }

    // USING PARSE, WE MAKE IT AN ARRAY AGAIN
    return JSON.parse(tasksString);
}