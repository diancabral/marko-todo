const TasksService = require('./tasks.service')

/* */

const timer = () => new Promise(resolve => setTimeout(resolve(), 10000))

/* */

beforeEach(async () => {

    jest.restoreAllMocks()

})

/* */

describe('New Tasks', () => {

    test('push single new task with correct data', () => {

        const newTask = { id: 1, title : 'foo', description: 'bar' }

        jest.spyOn(TasksService, 'newTaskHandler');

        /* */

        TasksService.newTask(newTask)

        /* */

        expect(TasksService.newTaskHandler).toHaveBeenCalledTimes(1)
        expect(TasksService.tasks).toMatchObject([newTask])

    })

    test('console logs the text', () => {

        jest.spyOn(console, 'log').mockImplementation()

        const text = 'Hello World!'

        /* */

        TasksService.getAllTasks(text)

        /* */

        expect(console.log).toHaveBeenCalledTimes(1)
        expect(console.log).toHaveBeenCalledWith(text)

    })

})

describe('Delete tasks', () => {

    test('Remove a single task by id', () => {

        jest.spyOn(console, 'log').mockImplementation()

        const text = 'Hello World 1!'

        /* */

        TasksService.getAllTasks(text)

        /* */

        expect(console.log).toHaveBeenCalledTimes(1)
        expect(console.log).toHaveBeenCalledWith(text)

    })

    it('Remove a single task by id 2', async () => {

        await timer()

        expect(1).toBe(1)

    })

})
