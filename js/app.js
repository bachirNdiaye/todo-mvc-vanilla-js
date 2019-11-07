var app = new Vue({
	el: "#app",
	data: {
		appTitle: 'todos',
		todoId: -1,
		newTodoText: '',
		tasks: [],
		tasksToShow: []
	},
	methods: {
		addTodo: function(ev) {
			if (ev.code == "Enter" && this.newTodoText.trim()) {
				this.todoId += 1;
				
				this.tasks.push({
					taskId: this.todoId,
					taskName: this.newTodoText.trim(),
					taskCompleted: false,
					taskEditState: 'notEditing'
				});

				this.newTodoText = '';
			}
		},

		onTaskDblCliqued: function(task) {
			let lastEditTask = this.tasks.filter(task => task.taskEditState == 'editing')[0];
			if (lastEditTask) lastEditTask.taskEditState = 'notEditing';
			task.taskEditState = 'editing';
		},

		onEditKeypress: function(ev) {
			if (ev.code == "Enter") {
				let lastEditTask = this.tasks.filter(task => task.taskEditState == 'editing')[0];

				!lastEditTask.taskName.trim() ? this.tasks.splice(this.tasks.findIndex(task => task.taskName.trim() == ''), 1) : lastEditTask.taskEditState = 'notEditing';
			}
		},

		clearCompleted: function() {
			this.tasks = this.tasks.filter(task => !task.taskCompleted);
			this.tasksToShow = this.tasks;
		},

		removeTask: function(task) {
			this.tasks.splice(this.tasks.findIndex(taskItem => task.taskId == taskItem.taskId), 1);
		}
	},
	computed: {
		remainingTasks: function() {
			return this.tasks.filter(task => !task.taskCompleted).length;
		}
	},
	created() {
		document.querySelector('#all').setAttribute('class', 'selected');

		this.tasksToShow = this.tasks;
		
		window.addEventListener('hashchange', function() {
			if (window.location.hash == '#/active') {
				app.tasksToShow = app.tasks.filter(task => !task.taskCompleted);
				document.querySelector('#all').setAttribute('class', '');
				document.querySelector('#completed').setAttribute('class', '');
				document.querySelector('#active').setAttribute('class', 'selected');
			} else if (window.location.hash == '#/completed') {
				app.tasksToShow = app.tasks.filter(task => task.taskCompleted);
				document.querySelector('#all').setAttribute('class', '');
				document.querySelector('#active').setAttribute('class', '');
				document.querySelector('#completed').setAttribute('class', 'selected');
			} else {
				app.tasksToShow = app.tasks;
				document.querySelector('#active').setAttribute('class', '');
				document.querySelector('#completed').setAttribute('class', '');
				document.querySelector('#all').setAttribute('class', 'selected');
			}
		});
	},
})