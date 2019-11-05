let tasks = [];
let greaterTasksKey = -1;

function createTask(taskName) {
    greaterTasksKey += 1;

    let newTask = new Task(greaterTasksKey, taskName);
    tasks.push(newTask);

    return newTask;
}