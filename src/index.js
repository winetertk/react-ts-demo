import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './router/app'
import './styles/reset.scss'
import 'antd-mobile/dist/antd-mobile.css'
import './styles/theme/theme.scss'

const render = Component => {
    ReactDOM.render(
            <Component />,
        document.getElementById('root')
    )
}
render(App)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
