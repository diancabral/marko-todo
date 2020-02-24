import './scss/style.scss';

/* */

import App from './index.marko'

App.render({}).then(result => {

    result.appendTo(document.getElementById('app'))

})
