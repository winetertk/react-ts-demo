import * as React from "react";
import './list.scss'
import { replaceIdNo } from '../../utils/common.js'
import { RouteComponentProps } from "react-router-dom"; // 解决函数式跳转提示语法错误的问题
import { List, Radio, Flex, WhiteSpace } from 'antd-mobile'
import noDataImg from '../../assets/img/no-data__dark.png'

// 定义组件props类型以及名称
interface basicProp {
    type: String,
    func: String,
    test: String
}

// 定义组件state类型以及名称
interface ItestState {
    list: Array<any>,
    selected: any, 
    showSearch: boolean,
    total: number
    noMore: boolean,
    applayStatus: any, 
    canSearch: boolean
}
type ItestProp = basicProp & RouteComponentProps;
const RadioItem = Radio.RadioItem;

// <ItestProp, ItestState> 联合类型接收 props，以及限制state必须包含哪些参数
class IList extends React.Component<ItestProp, ItestState> {
    
    constructor(props, context) {
        super(props, context)
        this.state = {
            list: [],
            selected: {}, 
            showSearch: false,
            canSearch: true,
            total: 0,
            noMore: false,
            applayStatus: {
                allDec: false,
                noDec: true,
                haveDec: false,
            }
        }
        console.log(this)
            
    }
    // 渲染DOM之前 该生命周期已不建议使用
    // componentWillMount() {
    //     this.getDate()
    // }
    // 渲染DOM之后
    componentDidMount () {
        this.getList()
    }

    getList() {
        let _this = this
        let list = [
            {
                allDclQty: 1,
                allGrossWt: 1,
                btrnbBizModecd: "2",
                bybordPltno: null,
                createDate: "2019-12-24 10:54:25",
                dclCuscd: "8609",
                dclerName: "陶昆",
                decDate: "2019-12-24 10:54:50",
                decStatus: "3",
                dtlist: [
                    {
                        btrnbShopsNm: null,
                        dclQty: 1,
                        dclTypecd: "0",
                        dclUnitcd: null,
                        dclUprcAmt: 10,
                        fstQty: 1,
                        gdeCd: "1",
                        gdsNm: "重量在50千克及以上的其他野猪",
                        gdsSpcfModelDesc: "10",
                        grossWt: 1,
                        hsGdecd: "0103920010",
                        id: "201912241054380694068",
                        originNatcd: null,
                        secdQty: 1,
                        seqNo: "201912241054256809281",
                        unit1: null,
                        unit1QtyRatio: null,
                        unit2: null,
                        unit2QtyRatio: null,
                        wrapTypecd: "1"
                    }
                ],
                gdItems: 1,
                gdTatlprice: 10,
                idno: "500233199408280315",
                igdsdclNo: null,
                impexpMarkcd: "E",
                inDate: null,
                logisStatus: "0",
                outDate: null,
                pltno: "渝B10004",
                putrecChgFlag: "0",
                rmk: null,
                seqNo: "201912241054256809281",
                shipNo: null,
                supvLoctNm: null,
                supvLoctNo: "DLHGN8609005",
                tDeclarationListList: null,
                tdeclarationListList: null,
                trcplFlag: "0",
                trspModecd: null,
                veCountry: null,
            }
        ]
        for (let index = 1; index < 3; index++) {
            list.push(JSON.parse(JSON.stringify(list[0])))
            if (index > 0) {
                list[index].seqNo = list[0].seqNo + index
            }
        }
        // list = []
        setTimeout(() => {
            _this.setState({
                list: list
            })
        }, 1000);
    }

    refreshList(type: string) {
        const _STATE = this.state
        if (!_STATE.canSearch) {
            // this.$message.warning('正在从后台拉取数据，请勿频繁操作！')
            return
        }
        this.setState({
            showSearch: false,
            total: 0,
            list: [],
            selected: {},
            noMore: false
        })
        for (const key in _STATE.applayStatus) {
            if (key === type) {
                _STATE.applayStatus[key] = true
            } else {
                _STATE.applayStatus[key] = false
            }
        }
        let el = document.querySelector('.zzsb-list')
        el.scrollTop = 0
        this.resetList(type)
    }

    resetList(type: string) {

    }

    toggleSearch() {
        this.setState({
            showSearch: !this.state.showSearch,
            selected: {}
        })
    }

    handleSelected(data: any) {
        this.setState({
            selected: data
        })
        console.log(data)
    }

    linkDeclarFormAdded(type: number) {
        this.props.history.push('orderadd')
    }
    
    goDeclear() {}
    
    public render () {
        const { list, selected, showSearch, applayStatus } = this.state
        const itemKey = [
            { label: '商品数量：', key: 'allDclQty' },
            { label: '毛重(kg)：', key: 'allGrossWt' },
            { label: '商品项数：', key: 'gdItems' },
            { label: '进出口：', key: 'impexpMarkcd' },
            { label: '车牌号：', key: 'pltno' },
            { label: '拼车标识：', key: 'trcplFlag' },
            { label: '场所名称：', key: 'orgName' },
            { label: '场所编码：', key: 'supvLoctNo' },
            { label: '创建时间：', key: 'createDate' },
            { label: '申报时间：', key: 'decDate' },
        ]

        return (
            <div className="zzsb-list">
                {/* 条件 */}
                <div className={showSearch ? 'search minh412' : 'search'}>
                    <div className="search-top flex-row">
                        <div className="text-btn text-l">
                            <span className={applayStatus.allDec ? 'active' : ''} onClick={this.refreshList.bind(this, 'allDec')}>全部</span>
                            <span className={applayStatus.noDec ? 'active' : ''} onClick={this.refreshList.bind(this, 'noDec')}>待申报</span>
                            <span className={applayStatus.haveDec ? 'active' : ''} onClick={this.refreshList.bind(this, 'haveDec')}>已申报</span>
                        </div>
                        <div className="text-btn text-r">
                        {
                            !showSearch
                            ? 
                            <span className="iconfont icon-tubiao-" onClick={this.toggleSearch.bind(this)}></span>
                            :
                            <span onClick={this.toggleSearch.bind(this)}>
                                <div>
                                    收起
                                    <i className="el-icon-arrow-up"></i>
                                </div>
                            </span>
                        }
                        </div>
                    </div>
                    <div className={showSearch ? 'search-bttom more-conditions' : 'search-bttom'}>
                        更多条件
                    </div>
                </div>
                <div className={showSearch ? 'modal modal-active' : 'modal'}></div>
                {/* 列表 */}
                {
                    list.length > 0
                    ?
                    <List>
                        {list.map(i => (
                            <RadioItem key={i.seqNo} checked={selected.seqNo === i.seqNo} onChange={() => this.handleSelected(i)} className={ selected.seqNo === i.seqNo ? 'selected' : '' }>
                                <div className="list-item">
                                    <div className="item-header">交易序列号：{i.seqNo}</div>
                                    <div className="flex-row item-cont">
                                        {
                                            itemKey.map((itemKey, _index) =>
                                            <div key={_index} className={itemKey.label.indexOf('时间') != -1 ? 'item-cont__details w100' : 'item-cont__details'}>
                                                <span className="item-label">{itemKey.label}</span>
                                                {(()=>{
                                                    switch (itemKey.label) {
                                                        case '进出口：':
                                                            return <span>{i[itemKey.key] == 'E' ? '出口' : '进口'}</span>
                                                        case '场所名称：':
                                                            return <span>航通测试</span>
                                                        default:
                                                            return <span>{i[itemKey.key]}</span>
                                                    }
                                                })()}
                                            </div>)
                                        }
                                    </div>
                                    <div className="money text-r">总金额：<i>{i.gdTatlprice.toFixed(2)}</i>元</div>
                                </div>
                            </RadioItem>
                        ))}
                    </List>
                    :
                    <div className="no-data flex-colum">
                        <img src={noDataImg} alt="" width="300" />
                        <p>未查询到申报单信息</p>
                    </div>                     
                }
                {/* 底部按钮 */}
                <div className="foot-btn__wrap flex-row">
                    <div>
                        <button onClick={this.linkDeclarFormAdded.bind(this, 1)}>修改</button>
                        <button onClick={this.linkDeclarFormAdded.bind(this, 3)}>复制</button>
                    </div>
                    <div>
                        {
                            (selected.seqNo && selected.decStatus == '2')
                            ?
                            <button className="dec-btn" onClick={this.linkDeclarFormAdded.bind(this, 4)}>改单重报</button>
                            :
                            <button className={selected.seqNo ? 'dec-btn' : 'dec-btn untouch-btn'} onClick={this.goDeclear}>去申报</button>
                        }
                        
                        
                    </div>
                </div>

            </div>
        )
    }
}

export default IList