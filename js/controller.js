let tasks = [];
let greaterTasksKey = -1;

let newTodoInput = document.getElementById('new-todo');
let todoList = document.getElementsByClassName('todo-list')[0];
let destroyButtons = document.getElementsByClassName('destroy');
let taskRows = document.getElementsByClassName('task-row');
let checkBoxes = document.getElementsByClassName('toggle');
let remainingTasksView = document.getElementById('remainingTasks');

let allFilterBtn = document.getElementById('all');
let activeFilterBtn = document.getElementById('active');
let completedFilterBtn = document.getElementById('completed');

function createTask(taskName) {
    greaterTasksKey += 1;

    let newTask = new Task(greaterTasksKey, taskName);
    tasks.push(newTask);

    return newTask;
}

function searchObjectInArray(arr, objId) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].taskId == objId) {
			return i;
		}
	}
}

/* En attendant de trouver une autre solution */
function defineDestroyOnClickFunc() {
	for (i = 0; i < destroyButtons.length; i++) {
		destroyButtons[i].onclick = (ev) => {
			let row = ev.currentTarget.parentNode.parentNode;

			tasks.pop(tasks.filter(el => {
				if (el.taskId == row.getAttribute('id')) {
					return el;
				};
			}));

			todoList.removeChild(row);

			defineDestroyOnClickFunc();
			defineTaskRowOnDblClickFuntion();
		};
	}
	remainingTasks = document.getElementsByClassName('task-row').length - document.getElementsByClassName('completed').length;
	remainingTasksView.innerText = remainingTasks;
};
defineDestroyOnClickFunc();

function removeLastEditFocusing() {
	if (document.getElementsByClassName('edit')[0] != undefined) {
		let lastEditRow = document.getElementsByClassName('edit')[0].parentElement;
		console.log(lastEditRow);
		if (lastEditRow != undefined) {
			lastEditRow.classList.remove('editing');
			lastEditRow.removeChild(lastEditRow.lastElementChild);
		}
	}
}

function defineTaskRowOnDblClickFuntion() {
	for (i = 0; i < taskRows.length; i++) {
		taskRows[i].ondblclick = (ev) => {
			removeLastEditFocusing();

			if (ev.currentTarget.classList.value.search('editing') == -1) {
				ev.currentTarget.classList.add('editing');

				let inputEdit = document.createElement('input');
				inputEdit.value = ev.currentTarget.firstElementChild.firstElementChild.nextElementSibling.innerText;
				inputEdit.classList.add('edit');
				
				ev.currentTarget.appendChild(inputEdit);

				inputEdit.onkeypress = (ev) => {
					if (ev.code === "Enter" && ev.currentTarget.value.trim() != "") {
						tasks[searchObjectInArray(tasks, ev.currentTarget.parentElement.getAttribute('id'))].taskName = ev.currentTarget.value.trim();
						ev.currentTarget.previousElementSibling.firstElementChild.nextElementSibling.innerText = ev.currentTarget.value.trim();
						removeLastEditFocusing();
					}
				};
			}
		};
	}
}
defineTaskRowOnDblClickFuntion();

function defineOnCheckedFunction() {
	for (let i = 0; i < checkBoxes.length; i++) {
		checkBoxes[i].onchange = (ev) => {
			let parentRow = ev.currentTarget.parentElement.parentElement;
			let indexInTasksArray = searchObjectInArray(tasks, parentRow.getAttribute('id'));
			
			if (parentRow.classList.value.search('completed') == -1) {
				parentRow.classList.add('completed');
				ev.currentTarget.setAttribute('checked', true);

				tasks[indexInTasksArray].taskCompleted = true;
			} else {
				parentRow.classList.remove('completed');
				tasks[indexInTasksArray].taskCompleted = false;
			}

			remainingTasks = document.getElementsByClassName('task-row').length - document.getElementsByClassName('completed').length;
			remainingTasksView.innerText = remainingTasks;
		}
	}
}
defineOnCheckedFunction();

function clearCompleted() {
	for (let i = 0; i < tasks.length; i++) {
		if(tasks[i].taskCompleted) {
			tasks.pop(tasks[i]);
		}
	}
	
	let completedTasks = document.getElementsByClassName('completed');

	while (completedTasks[0]) {
		todoList.removeChild(completedTasks[0]);
	}
}

newTodoInput.onkeypress = (ev) => {
	if (ev.code === "Enter" && newTodoInput.value.trim() != "") {
		let task = createTask(newTodoInput.value.trim());

		let taskTemplate =
		`<li id="${task.taskId}" class="task-row">
			<div class="view">
				<input class="toggle" type="checkbox">
				<label>${task.taskName}</label>
				<button class="destroy"></button>
			</div>
		</li>`;

		todoList.innerHTML = taskTemplate + todoList.innerHTML;

		defineDestroyOnClickFunc();
		defineTaskRowOnDblClickFuntion();
		defineOnCheckedFunction();
	}
};

function onAllCliqued() {
	for (let i = 0; i < taskRows.length; i++) {
		if (taskRows[i].classList.value.search('hidden') != -1) {
			taskRows[i].classList.remove('hidden');
		};
	}

	allFilterBtn.classList.remove('selected');
	allFilterBtn.classList.add('selected');
	activeFilterBtn.classList.remove('selected');
	completedFilterBtn.classList.remove('selected');
}

function onActiveCliqued() {
	for (let i = 0; i < taskRows.length; i++) {
		taskRows[i].classList.remove('hidden');

		if (taskRows[i].classList.value.search('completed') != -1) {
			taskRows[i].classList.add('hidden');
		};
	}

	allFilterBtn.classList.remove('selected');
	activeFilterBtn.classList.remove('selected');
	activeFilterBtn.classList.add('selected');
	completedFilterBtn.classList.remove('selected');
}

function onCompletedCliqued() {
	for (let i = 0; i < taskRows.length; i++) {
		taskRows[i].classList.remove('hidden');

		if (taskRows[i].classList.value.search('completed') == -1) {
			taskRows[i].classList.add('hidden');
		}
	}

	allFilterBtn.classList.remove('selected');
	completedFilterBtn.classList.remove('selected');
	completedFilterBtn.classList.add('selected');
	activeFilterBtn.classList.remove('selected');
}