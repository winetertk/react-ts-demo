import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom"; // 解决函数式跳转提示语法错误的问题
import { Popover, Icon } from 'antd-mobile'
import './orderAdd.scss'

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
class OrderAdd extends React.Component<ItestProp, ItestState> {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }
    // 渲染DOM之后
    componentDidMount () {
        // let orderType = this.props.location.state.orderType
        console.log(this.props)
    }
    
    public render () {
        const { history, location } = this.props
        return (
            <div className="zzsb-order__add">
                {/* {location.state.orderType == 'E' ? '出口' : '进口'} */}
                新增申报单
            </div>
        )
    }
}

export default withRouter(OrderAdd)