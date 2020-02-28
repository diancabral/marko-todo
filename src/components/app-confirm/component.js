module.exports = {

    onMount(){

        this.subscribeTo(this.getComponent('modal')).on('close', () => {

            this.emit('close')

        })

    },

    close(){

        this.getComponent('modal').close()

    },

    emitOk(){

        this.emit('ok')
        this.getComponent('modal').close()

    }

}
