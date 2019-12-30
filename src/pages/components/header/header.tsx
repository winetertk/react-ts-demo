import * as React from "react";
import { RouteComponentProps, withRouter, Link } from "react-router-dom"; // 解决函数式跳转提示语法错误的问题
import backIcon from '../../../assets/img/pre_step.png'
import UITool from '../../../utils/UI.ts'
import { Popover, Icon } from 'antd-mobile'
import routes from '../../../router/router'
import store from '../../../store/index'
import * as gettes from '../../../store/getter'
import './header.scss'

// 定义组件props类型以及名称
interface basicProp {
    type: String,
    func: String,
    test: String
}

// 定义组件state类型以及名称
interface ItestState {
    visible: boolean
}

type ItestProp = basicProp & RouteComponentProps;

let routeInfo = null

// <ItestProp, ItestState> 联合类型接收 props，以及限制state必须包含哪些参数
class Header extends React.Component<ItestProp, ItestState> {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
         // 监听redux改变
        store.subscribe(() => {
            // 渲染UI
            this.setState({})
        })
    }
    // 渲染DOM之后
    componentDidMount () {
        console.log(this.props)
    }

    handleVisibleChange() {

    }
    onSelect() {
        
    }

    goback() {
        store.dispatch({
            type: 'CHANGE_NAME',
            value: '测试'
        })
        store.dispatch({
            type: 'CHANGE_AGE',
            value: 26
        })
        let pathname = this.props.history.location.pathname
        if (pathname == '/home') {
            this.exitSys()
            return
        }
        this.props.history.goBack()
    }

    getRoute() {
        const pathname = this.props.location.pathname
        for (let index = 0; index < routes.length; index++) {
          if (routes[index].path === pathname) {
            routeInfo = routes[index]
            console.log(routeInfo)
            break
          }
        }
    }

    exitSys() {
        UITool.showAlert('提示', '退出系统之后需要重新验证身份，确认退出？', {
            confirmText: '确定',
            cancelText: '取消',
            confirmCallBack: () => {
                this.props.history.replace('/userauth')
            },
            cancelCallBack: () => { }
        })
    }
    
    link(type) {
        console.log(type)
        switch (type) {
            case 'list':
                this.props.history.push('/list')
                break;
            case 'add':
                // 选择进出口
                let style = {
                    // color: '#fff',
                    // background: '#37393E', 
                    // 'text-align': 'center'
                }
                let buttons = [
                    { text: '出口', onPress: () => this.props.history.push({pathname: '/orderadd', state: {orderType: 'E'}}), style: style},
                    { text: '进口', onPress: () => this.props.history.push({pathname: '/orderadd', state: {orderType: 'I'}}), style: style },
                ]
                let params = {
                    buttons: buttons,
                    platform: 'ios',
                    autoClose: false,
                }
                UITool.showOpration(params)
                break;
            case 'addck':
                this.props.history.push('/orderadd')
                break;
        
            default:
                break;
        }
    }
    
    public render () {
        const { history } = this.props
        const { visible } = this.state
        const route = history.location
        const { name, age } = gettes.user()
        const { docTitle } = gettes.sys()
        return (
            <div className="zzsb-header">
                <img src={backIcon} alt="" onClick={this.goback.bind(this)}/>
                <span className="router-name">{ docTitle }</span>
                <Popover overlayClassName="fortest" overlayStyle={{ 
                        color: 'currentColor',
                        width: '213px'
                    }} visible={visible}
                    overlay={route.pathname == '/orderadd' ? [
                        (<div className="menu-item" onClick={this.link.bind(this, 'list')}>
                            <i className="iconfont icon-lishishuju"></i>
                            历史单据
                        </div>),
                        (<div className="menu-item">
                            <i className="iconfont icon-fanhuishouye1"></i>
                            返回首页
                        </div>),
                    ] : [
                        (<div className="menu-item" onClick={this.link.bind(this, 'add')}>
                            <i className="iconfont icon-caidan"></i>
                            录入申报单
                        </div>),
                        (<div className="menu-item">
                            <i className="iconfont icon-fanhuishouye1"></i>
                            返回首页
                        </div>),
                    ]}
                    align={{
                        overflow: { adjustY: 0, adjustX: 0 },
                        offset: [-10, 0],
                    }}
                    onVisibleChange={this.handleVisibleChange}
                    onSelect={this.onSelect}
                    >
                    <div style={{
                        height: '100%',
                        padding: '0 15px',
                        marginRight: '-15px',
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <span ref="button" className="circle-menu">
                            <i className="circle"></i>
                            <i className="circle"></i>
                            <i className="circle"></i>
                        </span>
                    </div>
                </Popover>
            </div>
        )
    }
}

export default withRouter(Header)