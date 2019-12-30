import React, {Component} from 'react'
import { getUserIdno, getIcCardMsg, getUserInfoByIc, getToken } from '../../api/common'
import Swiper from "react-image-swiper"
import UITool from '../../utils/UI.ts'
import './userAuth.scss'
import imgA from '../../assets/img/ad_pic_a.png'
import imgB from '../../assets/img/ad_pic_b.png'
import imgC from '../../assets/homeImg/bg_head.png'
import { RouteComponentProps } from "react-router-dom"; // 解决函数式跳转提示语法错误的问题
type Iprops = RouteComponentProps
// import Home from '../home/home.tsx'
const options = {
    showPot: false,  //是否显示下方pot 默认为true
    timeGap: 3000,   //时间间隔 默认3000
    autoplay: true  //默认为true
};
export default class userAuth extends Component<Iprops> {
    state = {
        icRead: false,
        SERVICE_CONFIG: {
            USER_ACOUNT: "HT01",
            USER_PASSWORD: "HT01"
        },
        canTaggle: true,
        showProScreen: false,
        runningTime: 0, 
        userInfo: {}
    }
    // 渲染DOM之前
    componentWillMount() {
    }
    // 渲染DOM之后
    componentDidMount () {
        console.log(UITool)
        // 重置用户信息
        localStorage.removeItem('userInfo')
        let params: any = this.state.SERVICE_CONFIG
        getToken(params.USER_ACOUNT, params.USER_PASSWORD, 'BMHSCS').then(res => {
            localStorage.token = 'aeacdiueyn1023oekdmpejjc' || res.token
            localStorage.orgId = '720001' || res.params.orgId
            localStorage.orgShortName = 'react_测试' || res.user.orgShortName
        })
        this.readIdCard()
    }

    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
            return;
        };
    }

    readIdCard() {
        if (this.state.showProScreen) return
        getUserIdno().then(res => {
            this.state.userInfo = res
            let userInfo = {
                userName: res.PeopleName,
                userIdno: res.PeopleIDCode
            }
            this.initUserinfo(userInfo)
        }).catch(err => {
            console.log(err)
            if (err == 10005) {
                // this.$message.error('')
                UITool.showAlert('提示', '身份证感应区初始化失败，请联系管理员。', {
                    confirmText: '',
                    cancelText: '',
                    confirmCallBack: this.state.icRead ? this.readIcCard : null
                })
                this.setState({ runningTime: 0 })
                return
            }
            if (localStorage.userInfo) return
            if (!this.state.icRead) {
                console.log(this.state.runningTime)
                this.readIdCard()
                if (location.href.indexOf('userauth') != -1) this.state.runningTime++
                
            }
        })
    }
    readIcCard() {
        if (this.state.showProScreen) return
        getIcCardMsg().then((response) => {
            getUserInfoByIc({icPhNo: response.PhysicsNo})
            .then(res => {
                 if (!res.data) {
                    UITool.showAlert('提示', '未找到该IC卡关联的用户信息，请重新刷卡！', {
                        confirmText: '重新读卡',
                        cancelText: '确定',
                        confirmCallBack: this.state.icRead ? this.readIcCard : null
                    })
                    this.setState({ runningTime: 0 })
                    return
                }
                let userInfo = {
                    userName: res.data.peName,
                    userIdno: res.data.idno
                }
                this.initUserinfo(userInfo)
            }).catch(err => {})
        })
        .catch((err)=>{
            if (err && err == 10005) {
                // this.$message.error('IC卡感应区初始化失败，请联系管理员。')
                return
            }
            if (localStorage.userInfo) return
            if (this.state.icRead) {
                this.readIcCard()
                console.log(location.href.indexOf('userauth'))
                if (location.href.indexOf('userauth') != -1) this.state.runningTime++
            }
            
        })
    }
    initUserinfo(userInfo) {
        localStorage.setItem('identityAuth', 'yes')
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        this.props.history.push('/home')
    }
    setTimer() {
        let _this = this;
        _this.state.showProScreen = false
        setTimeout(()=>{
            if (_this.state.icRead) _this.readIcCard()
            else _this.readIdCard()
        }, 100)
    }
    toggleAuthWay () {
        let _this = this;
        if (!this.state.canTaggle) {
            let options = {
                cancelText: '取消',
                confirmText: '确认',
                clickModalClose: true
            }
            UITool.showAlert('警告', '请勿频繁操作！', options)
            return
        }
        this.setState({
            canTaggle: false,
            icRead: !this.state.icRead
        })
        if (this.state.icRead) this.readIcCard()
        else this.readIdCard()
        setTimeout(() => { _this.setState({ canTaggle: true }) }, 4000)
    }
    resetTimer() {
        this.state.runningTime = 0
    }
    
    render () {
        return (
            <div className="zzsb-auth">
                <Swiper options={options}>
                    <div className="slider-item" key={0}><img src={ imgA } height="432"></img></div>
                    <div className="slider-item" key={1}><img src={ imgC } height="435"></img></div>
                    <div className="slider-item" key={2}><img src={ imgB } height="432"></img></div>
                </Swiper>
                <div className="arrow text-c">
                    <span className="arrow-bt"></span>
                    { this.state.icRead ? <div className="font-img font-ic__img"></div> : <div className="font-img font-id__img"></div> }
                </div>
                <div className="read-button">
                    <div className={this.state.icRead ? 'authway-wrap flex-row ic_active' : 'authway-wrap flex-row' }>
                        <div className="auth-way read-id"></div>
                        <div className="auth-way read-ic"></div>
                    </div>
                </div>
                <div className="tips text-c" onClick={this.toggleAuthWay.bind(this)}>或使用{ this.state.icRead ? '身份证' : 'IC卡' }登陆 > </div>
                <div className="home-bottom text-c">深圳市航通智能技术有限公司</div>
            </div>
        )
    }
}

