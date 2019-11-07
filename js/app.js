var app = new Vue({
	el: "#app",
	data: {
		appTitle: 'todos',
		todoId: -1,
		newTodoText: '',
		tasks: []
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
			console.log(task);
			let lastEditTask = this.tasks.filter(task => task.taskEditState == 'editing')[0];
			console.log(lastEditTask);
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
		},

		removeTask: function(task) {
			this.tasks.splice(this.tasks.findIndex(taskItem => task.taskId == taskItem.taskId), 1);
		},

		filter: function(ev) {
			switch (ev.currentTarget.getAttribute('id')) {
				case 'all':
					document.querySelector('#active').setAttribute('class', '');
					document.querySelector('#completed').setAttribute('class', '');
					ev.currentTarget.setAttribute('class', 'selected');

					break;
				
				case 'active':
					document.querySelector('#all').setAttribute('class', '');
					document.querySelector('#completed').setAttribute('class', '');
					ev.currentTarget.setAttribute('class', 'selected');

					break;
				
				case 'completed':
					document.querySelector('#all').setAttribute('class', '');
					document.querySelector('#active').setAttribute('class', '');
					ev.currentTarget.setAttribute('class', 'selected');

					break;
			
				default:
					break;
			}
		},

		amIVisible: function(taskCompleted) {
			if (window.location.hash == '#/active')
				return taskCompleted ? false : true;
			else if (window.location.hash == '#/completed')
				return taskCompleted ? true : false;
			else return true
		}
	},
	computed: {
		remainingTasks: function() {
			return this.tasks.filter(task => !task.taskCompleted).length;
		}
	},
	created() {
		document.querySelector('#all').setAttribute('class', 'selected');
	},
})