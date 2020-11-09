import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router} from "react-router-dom"
import './sass/main.scss'
import { Provider } from 'react-redux'
import { store } from './redux/store';


// import { gsap } from 'gsap'
// gsap.config({ nullTargetWarn: false })

ReactDOM.render(
  
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);
