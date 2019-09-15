import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './redux/reducer'
import * as serviceWorker from './serviceWorker';

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}

const store = createStore(reducer, persistedState);

store.subscribe(()=>{
	localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>, document.getElementById('root')
	);

serviceWorker.register();
