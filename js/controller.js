let tasks = [];
let greaterTasksKey = -1;
let todoList = document.querySelector('.todo-list');
let taskRows = document.getElementsByClassName('task-row');
let remainingTasks = 0;
let remainingTasksView = document.querySelector('#remainingTasks');

function updateRemainingTasks() {
	remainingTasks = document.querySelectorAll('.task-row').length - document.querySelectorAll('.completed').length;
	remainingTasksView.innerText = remainingTasks;
}

function findObjectIndex(arr, objId) {
	return tasks.findIndex(taskOccurence => taskOccurence.taskId == objId);
}

function addTaskInArray(taskName) {
	greaterTasksKey += 1;

	let newTask = {
		taskId: greaterTasksKey,
		taskName: taskName,
		taskCompleted: false
	};
	
    tasks.push(newTask);

    return newTask;
}

function createTaskInDOM(task) {
	let taskRow = document.createElement('li');
	let taskRowView = document.createElement('div');
	let taskRowCheckbox = document.createElement('input');
	let taskRowLabel = document.createElement('label');
	let taskRowDestroyButton = document.createElement('button');

	taskRow.setAttribute('id', task.taskId);
	taskRow.setAttribute('class', 'task-row');

	taskRow.addEventListener('dblclick', () => {
		removeLastEditFocusing();

		if (taskRow.classList.value.search('editing') == -1) {
			taskRow.classList.add('editing');

			let inputEdit = document.createElement('input');
			inputEdit.value = taskRowLabel.innerText;
			inputEdit.classList.add('edit');
			
			taskRow.appendChild(inputEdit);

			inputEdit.addEventListener('keypress', function(ev) {
				if (ev.code === "Enter" && this.value.trim() != "") {
					tasks[findObjectIndex(tasks, task.taskId)].taskName = this.value.trim();
					taskRowLabel.innerText = this.value.trim();
					removeLastEditFocusing();
					console.clear();
					console.table(tasks);
				}
			});
		}
	});
	
	taskRowView.setAttribute('class', 'view');

	taskRowCheckbox.setAttribute('type', 'checkbox');
	taskRowCheckbox.setAttribute('class', 'toggle');

	taskRowCheckbox.addEventListener('click', (ev) => {
		let indexInTasksArray = findObjectIndex(tasks, task.taskId);
		
		if (taskRow.classList.value.search('completed') == -1) {
			taskRow.classList.add('completed');
			taskRowCheckbox.setAttribute('checked', true);

			tasks[indexInTasksArray].taskCompleted = true;

			console.clear();
			console.table(tasks);
		} else {
			taskRow.classList.remove('completed');
			tasks[indexInTasksArray].taskCompleted = false;

			console.clear();
			console.table(tasks);
		}

		updateRemainingTasks();
	});

	taskRowLabel.innerText = task.taskName;

	taskRowDestroyButton.setAttribute('class', 'destroy');
	taskRowDestroyButton.addEventListener('click', () => {
		tasks.splice(tasks.findIndex(taskOccurence => taskOccurence.taskId == task.taskId), 1);
		todoList.removeChild(taskRow);
		updateRemainingTasks();

		console.clear();
		console.table(tasks);
	});

	taskRowView.appendChild(taskRowCheckbox);
	taskRowView.appendChild(taskRowLabel);
	taskRowView.appendChild(taskRowDestroyButton);

	taskRow.appendChild(taskRowView);

	todoList.appendChild(taskRow);

	updateRemainingTasks();

	console.clear();
	console.table(tasks);
}

document.querySelector('#new-todo').addEventListener('keypress', (ev) => {
	let newTodoInput = document.querySelector('#new-todo');

	if (ev.code === "Enter" && newTodoInput.value.trim() != "") {
		createTaskInDOM(addTaskInArray(newTodoInput.value.trim()));
		newTodoInput.value = '';
	}
});

document.querySelector('.clear-completed').addEventListener('click', () => {
	for (let i = 0; i < tasks.length; i++)
		if(tasks[i].taskCompleted)
			tasks.splice(tasks.findIndex(taskOccurence => taskOccurence.taskId == tasks[i].taskId), 1);
	
	let completedTasks = document.getElementsByClassName('completed');

	while (completedTasks[0]) todoList.removeChild(completedTasks[0]);

	console.clear();
	console.table(tasks);
});

window.addEventListener('hashchange', function() {
	document.querySelector('#all').classList.remove('selected');
	document.querySelector('#active').classList.remove('selected');
	document.querySelector('#completed').classList.remove('selected');

	switch (window.location.hash) {
		case '#/':
			document.querySelector('#all').classList.add('selected');
			for (let i = 0; i < taskRows.length; i++)
				if (taskRows[i].classList.value.search('hidden') != -1) taskRows[i].classList.remove('hidden');
			break;
		
		case '#/active':
			document.querySelector('#active').classList.add('selected');
			for (let i = 0; i < taskRows.length; i++) {
				taskRows[i].classList.remove('hidden');
		
				if (taskRows[i].classList.value.search('completed') != -1) taskRows[i].classList.add('hidden');
			}
			break;
		
		case '#/completed':
			document.querySelector('#completed').classList.add('selected');
			for (let i = 0; i < taskRows.length; i++) {
				taskRows[i].classList.remove('hidden');
		
				if (taskRows[i].classList.value.search('completed') == -1) taskRows[i].classList.add('hidden');
			}
			break;
	
		default:
			break;
	}
});

function removeLastEditFocusing() {
	if (document.querySelector('.edit')) {
		let lastEditRow = document.querySelector('.edit').parentElement;
		
		if (lastEditRow) {
			lastEditRow.classList.remove('editing');
			lastEditRow.removeChild(lastEditRow.lastElementChild);
		}
	}
}