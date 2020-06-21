const { v4 : uuidv4 } = require('uuid')

/* */

const AppConfirm = require('@/components/app-confirm/index.marko')

/* */

module.exports = {

    onCreate(){

        this.state = {

            items : [],
            filter : 'all'

        }

        /* */

        this.addFakeTasks()

    },

    // onMount() {
    //
    //     this.getComponent('icons').getEl();
    // }

    /* */

    getFilteredItems(){

        let items = this.state.items

        if(this.state.filter === 'active'){

            items = this.state.items.filter(({ done }) => !done)

        } else if(this.state.filter === 'completed'){

            items = this.state.items.filter(({ done }) => done)

        }

        return items

    },

    getTotalItemsLeft(){

        return this.getFilteredItems().filter(({ done }) => !done).length

    },

    /* */

    addFakeTasks(){

        [...new Array(10).keys()].forEach(val => {

            this.state.items.unshift({

                uuid : uuidv4(),
                title : `Tarefa de teste ${val + 1}`,
                done : false

            })

        })

    },

    handleInputValue(value){

        if(!value) return false
        if(value.length < 4) return false

        const searchExistingTask = this.state.items.find(({ title }) => title === value)

        if(searchExistingTask) return false

        this.state.items.unshift({

            uuid : uuidv4(),
            title : value,
            done : false

        })

        this.setStateDirty('items')

    },

    completeTask(id){

        let task = this.state.items.find(({ uuid }) => id === uuid)

        if(task !== -1){

            task.done = !task.done

            this.setStateDirty('items')

        }

    },

    deleteTask(id){

        AppConfirm.render({

            title       : 'Atenção',
            description : 'Você realmente deseja excluir essa tarefa?',
            okText      : 'Sim, quero excluir!',
            cancelText  : 'Não'

        }).then(result => {

            result.appendTo(document.getElementById('app-overlay'))

            /* */

            let component = result.getComponent()

            component.on('close', () => {

                component.destroy()

            })

            component.on('ok', () => this.handleDeleteTask(id))

        })

    },

    handleDeleteTask(id){

        let task = this.state.items.findIndex(({ uuid }) => id === uuid)

        if(task !== -1){

            this.state.items.splice(task, 1)

            this.setStateDirty('items')

        }

    },

    deleteCompletedTasks(){

        let actives = this.state.items.filter(({ done }) => !done)

        this.state.items = actives

        this.setStateDirty('items')

    },

    changeFilter(filter){

        this.state.filter = filter

    }

}
