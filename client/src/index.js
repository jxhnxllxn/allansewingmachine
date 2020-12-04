import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import './sass/main.scss'
import { Provider } from 'react-redux'
import store from './redux/store'

import { gsap } from 'gsap'
import axios from 'axios'
gsap.config({ nullTargetWarn: false })
axios.defaults.baseURL = '/api'
axios.defaults.headers.get['Accept'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
