import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

import './assets/css/style.scss'
import './assets/css/media.scss'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

serviceWorker.register()