import React, {Component} from 'react'
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom'
import asyncComponent from '../utils/asyncComponent'
import routes from './router'
import store from '../store/index'
import * as gettes from '../store/getter'

const Header = asyncComponent(() => import("../pages/components/header/header.tsx"))

// 定义组件props类型以及名称
interface basicProp {
  type: String,
  func: String,
  test: String, 
  store: any
}

// 定义组件state类型以及名称
interface ItestState {
  headerVisible: boolean,
  routeInfo: any,
  name: string
}

type ItestProp = basicProp & RouteComponentProps;

let routeInfo = null // 当前组件路由信息

class IndexPage extends React.Component<ItestProp, ItestState> {
  constructor(props) {
    super(props)
    this.state = {
      headerVisible: true,
      routeInfo: null,
      name: '123123'
    }
  }

  // 渲染DOM之后
  componentDidMount () {
  }

  test() {
    store.dispatch({
      type: 'CHANGE_DOC_TITLE',
      value: routeInfo.title
    })
  }

  /**
   * 组件更新状态来监听路由，但是页面数据更新也会触发 *
   */
  componentWillUpdate() {
  }

  componentDidUpdate() {
    this.test()
    console.log(gettes.sys())
  }

  getRoute() {
    const pathname = this.props.location.pathname
    for (let index = 0; index < routes.length; index++) {
      if (routes[index].path === pathname) {
        routeInfo = routes[index]
        document.title = routeInfo.title
        console.log(routeInfo)
        break
      }
    }
  }

  render () {
    // 高阶组件里面的render函数。页面每次操作都会执行
    this.getRoute()
    const { location } = this.props
    // 动态生成路由表
    const routesHTMLArr = routes.map( (item, index) => {
      return item.redirect ? 
        <Redirect exact from={ item.path } to={ item.redirect } key={ index } /> : 
        item.children.length > 0 ? 
          item.children.map( (subItem, subIndex) => {
            return subItem.redirect ? 
              <Redirect exact from= {item.path } to={ item.redirect } key={'child_' + subIndex }/> : 
              <Route path={ subItem.path } component={subItem.component}/>
          }) : 
          <Route path={ item.path } component={ item.component } key={ index } />
    })
    return (
      <div className={location.pathname == '/userauth' ? "zzsb-container" : 'zzsb-container has-header'}>
        { location.pathname == '/userauth' ? '' : <Header /> }
        <Switch>{ routesHTMLArr.map(item => item) }</Switch>
      </div>
    )
  }
}

export default withRouter(IndexPage)