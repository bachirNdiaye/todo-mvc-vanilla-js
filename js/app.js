var app = new Vue({
	el: "#app",
	data: {
		appTitle: 'todos',
		todoId: -1,
		newTodoText: '',
		tasks: [],
		filter: ''
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
		},

		updateFilter(filter) {
			this.filter = filter;
		}
	},
	computed: {
		remainingTasks: function() {
			return this.tasks.filter(task => !task.taskCompleted).length;
		},

		tasksToShow: function () {
			if (this.filter == 'active') return this.tasks.filter(task => !task.taskCompleted);
			else if (this.filter == 'completed') return this.tasks.filter(task => task.taskCompleted);
			else return this.tasks;
		}
	}
})