class Task {
    constructor(taskId, taskName, taskCompleted = false) {
        this._taskId = taskId;
        this._taskName = taskName;
        this._taskCompleted = taskCompleted;
    }

    get taskId() {
        return this._taskId;
    }

    get taskName() {
        return this._taskName;
    }

    get taskCompleted() {
        return this._taskCompleted;
    }

    set taskName(taskName) {
        this._taskName = taskName;
    }

    set taskCompleted(taskCompleted) {
        this._taskCompleted = taskCompleted;
    }
};