import * as React from "react";
import './home.scss'
import { replaceIdNo } from '../../utils/common.js'
import { RouteComponentProps, withRouter } from "react-router-dom"; // 解决函数式跳转提示语法错误的问题
import UITool from '../../utils/UI.ts'

// 定义组件props类型以及名称
interface basicProp {
    type: String,
    func: String,
    test: String,
    curRoutes: any
}

// 定义组件state类型以及名称
interface ItestState {
    age: number,
    name: String,
    userInfo: any,
    date: any,
    timer: any,
    startTime: any,
    replaceIdNo: any
}
type ItestProp = basicProp & RouteComponentProps;

// <ItestProp, ItestState> 联合类型接收 props，以及限制state必须包含哪些参数
class Home extends React.Component<ItestProp, ItestState> {
    constructor(props) {
        super(props)
        this.state = {
            age: 13,
            name: '逸心丿',
            userInfo: {
                userName: '逸心',
                userIdno: '5002****0315'
            },
            date: {
                y: null,
                m: null,
                d: null,
                h: null,
                minu: null,
                w: null
            },
            timer: null,
            startTime: null,
            replaceIdNo: null,
        }
        // this.getDate()
    }
    // 渲染DOM之前 该生命周期已不建议使用
    // componentWillMount() {
    //     this.getDate()
    // }
    // 渲染DOM之后
    componentDidMount () {
        console.log('-----------')
        console.log(this.props)
        this.getDate()
    }

    getDate() {
        let _this = this
        let date = new Date()
        let y = date.getFullYear()
        let m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        let w = date.getDay()
        let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        let minu = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        let week = ''
        switch (w) {
          case 0:
            week = '七'
            break;
          case 1:
            week = '一'
            break;
          case 2:
            week = '二'
            break;
          case 3:
            week = '三'
            break;
          case 4:
            week = '四'
            break;
          case 5:
            week = '五'
            break;
          case 6:
            week = '六'
            break;
          default:
            break;
        }
        setTimeout(() => {
            _this.setState({
                date: { y: y, m: m, d: d, h: h, minu: minu, w: week }
            })
        }, 1000);
        
    }
    applyOrderAded(type) {
        // this.$router.push({name: 'declarFormHead', query: {from: 'add', impexpMarkcd: type}})
        this.props.history.push('/orderadd')
    }
    applyOrderSearched() {
        this.props.history.push('/list')
    }
    exitSys() {
        UITool.showAlert('提示', '退出系统之后需要重新验证身份，确认退出？', {
            confirmText: '确定',
            cancelText: '取消',
            confirmCallBack: () => {
                localStorage.identityAuth = 'no'
                localStorage.removeItem('userInfo')
                this.props.history.replace('/userauth')
            },
            cancelCallBack: () => { }
        })
    }
    
    public render () {
        const { name, userInfo, date } = this.state
        return (
            <div className="zzsb-home">
                <div className="home-head text-c">
                <div className="home-head__t">
                <span>欢迎您，{name}</span>
                </div>
                <div className="home-head__b">{replaceIdNo(userInfo.userIdno)}</div>
                </div>
                <div className="home-center text-c flex-row">
                <div className="module-item" onClick={this.applyOrderAded.bind(this)}>进口申报单</div>
                <div className="module-item" onClick={this.applyOrderAded.bind(this)}>出口申报单</div>
                <div className="module-item" onClick={this.applyOrderSearched.bind(this)}>查询申报单</div>
                <div className="module-item">
                    <div className="center-r__top">
                        <span>{date.h}:{date.minu}</span>
                        <span>星期{date.w}</span>
                        <span>{date.y}年{date.m}月{date.d}日</span>
                    </div>
                    <div className="center-r__buttom" onClick={this.exitSys.bind(this)}>退出系统</div>
                    </div>
                </div>
                <div className="home-bottom text-c">深圳市航通智能技术有限公司</div>
            </div>
        )
    }
}

export default withRouter(Home)