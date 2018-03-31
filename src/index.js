import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './index.css';
import App from './component/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />,  document.getElementById('root'));
registerServiceWorker();
