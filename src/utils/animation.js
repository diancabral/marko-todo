const anime = require('animejs').default

/* */

const defaultOptions = (e, el, delay) => ({

    targets  : el,
    easing   : 'cubicBezier(.25, .1, .25, 1)',
    duration : 300,
    delay    : (el, i) => el.length ? i * delay : delay,
    begin : () => {

        // el.style.transition = 'none'

    },
    complete : () => {

        if(!e) return false
        if(Object.entries(e).length) e.detach()

    }

})

const defaultOptionsAnimations = {

    fadeIn : {

        opacity : [0, 1]

    },

    fadeOut : {

        opacity : [1, 0]

    },

    translateUp : {

        translateY: [10, 0]

    },

    translateDown : {

        translateY: [-10, 0]

    },

    scaleDown : {

        scale: [1, 0.98]

    },

    get fadeInUp(){

        return {

            ...this.fadeIn,
            ...this.translateUp

        }

    },

    get fadeInDown(){

        return {

            ...this.fadeIn,
            ...this.translateDown

        }

    },

    get fadeOutUp(){

        return {

            ...this.fadeOut,
            ...this.translateUp

        }

    },

    get fadeOutDown(){

        return {

            ...this.fadeOut,
            ...this.translateDown

        }

    }

}

/* */

// const addEnterClasses = el => {
//
//     let elements = el[0] ? [...el] : [el]
//
//     elements.forEach(element => {
//
//         element.classList.add('animation-enter')
//
//     })
//
// }
//
// const removeEnterClasses = el => {
//
//     let elements = el[0] ? [...el] : [el]
//
//     elements.forEach(element => {
//
//         element.classList.remove('animation-enter')
//
//     })
//
// }
//
// const addLeaveClasses = el => {
//
//     let elements = el[0] ? [...el] : [el]
//
//     elements.forEach(element => {
//
//         element.classList.add('animation-leave')
//
//     })
//
// }
//
// const removeLeaveClasses = el => {
//
//     let elements = el[0] ? [...el] : [el]
//
//     elements.forEach(element => {
//
//         element.classList.remove('animation-leave')
//
//     })
//
// }

/* */

const animate = (type, e, el, customOptions, delay = 0, state) => {

    // console.log(el)

    if(e && Object.entries(e).length) e.preventDefault()

    return anime({

        ...defaultOptions(e, el, delay),
        ...defaultOptionsAnimations[type],
        ...customOptions

    })

}

module.exports = {

    fadeIn        : (e, el, customOptions, delay) => animate('fadeIn', e, el, customOptions, delay, 'enter'),
    fadeOut       : (e, el, customOptions, delay) => animate('fadeOut', e, el, customOptions, delay, 'leave'),
    fadeInUp      : (e, el, customOptions, delay) => animate('fadeInUp', e, el, customOptions, delay, 'enter'),
    fadeInDown    : (e, el, customOptions, delay) => animate('fadeInDown', e, el, customOptions, delay, 'leave'),
    fadeOutUp     : (e, el, customOptions, delay) => animate('fadeOutUp', e, el, customOptions, delay, 'enter'),
    fadeOutDown   : (e, el, customOptions, delay) => animate('fadeOutDown', e, el, customOptions, delay, 'leave'),
    translateUp   : (e, el, customOptions, delay) => animate('translateUp', e, el, customOptions, delay, 'enter'),
    translateDown : (e, el, customOptions, delay) => animate('translateDown', e, el, customOptions, delay, 'enter'),
    scaleDown     : (e, el, customOptions, delay) => animate('scaleDown', e, el, customOptions, delay, 'enter'),

}
