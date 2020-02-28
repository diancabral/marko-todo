module.exports = {

    emitClick(){

        this.emit('click')

    },

    colorDefault(){

        return /\d/.test(this.input.color) || this.input.color === 'white' || this.input.color === 'black' ? this.input.color : this.input.color + '-500'

    },

    withLabel(){

        return (this.input.label !== '' && true) || ''

    }

}
