import './scss/style.scss'
import 'material-colors/dist/colors.var.css'

/* */

import App from './views/index/index.marko'

App.render({}).then(result => {

    result.replace(document.getElementById('app'))

})
