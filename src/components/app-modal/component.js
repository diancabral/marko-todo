const animation = require('@/utils/animation')

module.exports = {

    close(){

        let animateContent = animation.scaleDown(null, this.getEl('content'), { duration: 200 }, 0)

        let animateModal = animation.fadeOut(null, this.getEl(), { duration: 200 }, 0)

        animateModal.finished.then(() => {

            this.emitClose()

        })

    },

    emitClose(){

        this.emit('close')

    }

}
