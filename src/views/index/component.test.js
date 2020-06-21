const { v4 : uuidv4 } = require('uuid')
const anime = require('animejs').default
const { render, cleanup, fireEvent, waitFor } = require('@marko/testing-library');
const Template = require('./index.marko');

/* */

jest.mock('uuid')
uuidv4.mockImplementation(() => Math.random())
//
// jest.mock('animejs')
// anime.mockImplementation(() => true)

/* */

describe('Unit Tests', () => {

    let render, _this

    beforeEach(() => {

        render = Template.renderSync({}).appendTo(document.body)
        _this = render.getComponent()

    })

    afterEach(() => {

        _this.destroy()

    })

    describe('onCreate', () => {

        test('Should populate the state with 10 fake tasks', () => {

            expect(_this.state.items).not.toEqual([])
            expect(_this.state.items).toHaveLength(10)

        })

    })

    describe('getTotalItemsLeft', () => {

        test.each([

            [[2, 4, 6, 8], 6],
            [[1, 2], 8],
            [[5, 4, 3, 2, 1], 5],
            [[...new Array(10).keys()], 0]

        ])('Complete the tasks with indexes %p should return %i left', (items, expected) => {

            items.forEach(index => {

                _this.state.items[index].done = true

            })

            expect(_this.getTotalItemsLeft()).toBe(expected)

        })

    })

    describe('getFilteredItems', () => {

        test.each([

            [[2, 4, 6, 8], 'all', 10],
            [[2, 4, 6, 8], 'active', 6],
            [[2, 4, 6, 8], 'completed', 4],

            [[1, 2], 'all', 10],
            [[1, 2], 'active', 8],
            [[1, 2], 'completed', 2],

            [[5, 4, 3, 2, 1], 'all', 10],
            [[5, 4, 3, 2, 1], 'active', 5],
            [[5, 4, 3, 2, 1], 'completed', 5],

            [[...new Array(10).keys()], 'all', 10],
            [[...new Array(10).keys()], 'active', 0],
            [[...new Array(10).keys()], 'completed', 10]

        ])('Complete the tasks with indexes %p and set filter to %p it should return %i items', (items, filter, expected) => {

            items.forEach(index => {

                _this.state.items[index].done = true

            })

            _this.state.filter = filter

            expect(_this.getFilteredItems()).toHaveLength(expected)

        })

    })

    describe('handleInputValue', () => {

        test('When add new task should unshift data to items state', () => {

            _this.handleInputValue('Fake task for the test!')

            expect(_this.state.items[0]).toEqual(expect.objectContaining({

                uuid: expect.any(Number),
                title : 'Fake task for the test!',
                done: false

            }))

        })

        test('When add new task without text should return false', () => {

            const spyHandleInputValue = jest.spyOn(_this, 'handleInputValue')

            _this.handleInputValue('')

            expect(spyHandleInputValue).toHaveReturnedWith(false)

        })

        test('When add new task with text length less then 4 should return false', () => {

            const spyHandleInputValue = jest.spyOn(_this, 'handleInputValue')

            _this.handleInputValue('Foo')

            expect(spyHandleInputValue).toHaveReturnedWith(false)

        })

        test('When add a duplicated task text should return false', () => {

            const spyHandleInputValue = jest.spyOn(_this, 'handleInputValue')

            _this.handleInputValue('Tarefa 1')

            expect(spyHandleInputValue).toHaveReturnedWith(undefined)

            _this.handleInputValue('Tarefa 1')

            expect(spyHandleInputValue).toHaveReturnedWith(false)

        })

    })

    describe('completeTask', () => {

        test.each([...new Array(10).keys()])('When complete task with index %p should set the "done" property to true', index => {

            const getTaskUuid = _this.state.items[index].uuid

            _this.completeTask(getTaskUuid)

            expect(_this.state.items[index].done).toBeTruthy()

        })

    })

    describe('handleDeleteTask', () => {

        test.each([...new Array(10).keys()])('When delete task with index %p should remove from state', index => {

            const getTaskUuid = _this.state.items[index].uuid

            _this.handleDeleteTask(getTaskUuid)

            expect(_this.state.items.find(({ uuid }) => uuid === getTaskUuid)).toBeUndefined()

        })

        test('When delete task nonexistent in state should return undefined', () => {

            const spyHandleDeleteTask = jest.spyOn(_this, 'handleDeleteTask')

            _this.handleDeleteTask('12345')

            expect(spyHandleDeleteTask).toHaveReturnedWith(undefined)

        })

    })

    describe('changeFilter', () => {

        test.each([

            'all',
            'active',
            'completed'

        ])('Call the function with %p parameter should update filter parameter in state', filter => {

            _this.changeFilter(filter)

            expect(_this.state.filter).toBe(filter)

        })

        test('Call the function three times with parameters all, active and completed should update filter parameter each time in state', () => {

            _this.changeFilter('completed')

            expect(_this.state.filter).toBe('completed')

            _this.changeFilter('active')

            expect(_this.state.filter).toBe('active')

            _this.changeFilter('all')

            expect(_this.state.filter).toBe('all')

        })

    })

    describe('deleteCompletedTasks', () => {

        test.each([

            [[2, 4, 6, 8], 6],
            [[1, 2], 8],
            [[5, 4, 3, 2, 1], 5],
            [[...new Array(10).keys()], 0]

        ])('Complete the tasks with indexes %p and call this.deleteCompletedTasks() should remove the tasks from state', (items, expected) => {

            items.forEach(index => {

                _this.state.items[index].done = true

            })

            _this.deleteCompletedTasks()

            expect(_this.state.items).toHaveLength(expected)

        })

    })

})

// describe('Component Tests', () => {
//
//     afterEach(cleanup);
//
//     test('Should delete a task when click in X icon', async () => {
//
//         const { container } = await render(Template);
//
//         const appOverlay = document.createElement('div')
//
//         appOverlay.id = 'app-overlay'
//
//         document.body.appendChild(appOverlay)
//
//         const tasksElements = container.querySelectorAll('.app__list')
//         const deleteElement = tasksElements[1].querySelector('.app__list__icon--close svg')
//
//         await fireEvent.click(deleteElement)
//         await waitFor(() => container.querySelector('.confirm'));
//
//         const confirm = container.querySelector('.confirm')
//         const ok = confirm.querySelectorAll('button')
//
//         await fireEvent.click(ok[0])
//         await waitFor(() => !container.querySelector('.confirm'));
//
//         expect(tasksElements).toHaveLength(9)
//
//     })
//
// })
