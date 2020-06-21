class TasksService {

    constructor(){

        this.tasks = []

    }

    getAllTasks(category){

        console.log(category)

    }

    newTask(task){

        this.newTaskHandler(task)

    }

    newTaskHandler(task){

        this.tasks.push(task)

    }

}

module.exports = new TasksService()
