/** 入口文件 */
import * as React from "react";
import { HashRouter, Route, Router} from 'react-router-dom'
import asyncComponent from '../utils/asyncComponent'
import '../styles/reset.scss'
import '../assets/icon/iconfont/iconfont.css'
import store from "../store";
import { Provider } from 'react-redux'

const IndexPage = asyncComponent(() => import("./index.tsx"))
class App extends React.Component {
    render () {
        const state = store.getState()
        console.log(state)
        return (
            <HashRouter>
                <Provider store={store}><Route path="/" component={IndexPage}/></Provider>
            </HashRouter>            
        )
    }
}
export default App