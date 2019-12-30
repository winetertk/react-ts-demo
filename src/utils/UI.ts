import {
  Modal
} from 'antd-mobile';

const ALERT: any = Modal.alert
const OPERRATION: any = Modal.operation

interface INTERFACE_TIPS {
    title: String,
    message: String,
    cancelText: String,
    confirmText: String,
    cancelCallBack: any,
    confirmCallBack: any,
    style: String,
    autoClose: boolean,
    clickModalClose: boolean
}
interface INTERFACE_OPT {
  buttons: Array<any>, 
  platform: 'android' | 'ios',
  autoClose: boolean
}
//  Array<any>
const UITool = {
  // 弹窗 confirm
  showAlert: (title: String, tips: String, options: any) => {
    let opt: INTERFACE_TIPS = {
      title: title || '',
      message: tips || '是否要继续？',
      cancelText: options.cancelText || '',
      confirmText: options.confirmText || '',
      cancelCallBack: options.cancelCallBack,
      confirmCallBack: options.confirmCallBack,
      style: options.styles || 'default',
      autoClose: options.autoClose || false,
      clickModalClose: options.clickModalClose || false
    }

    let alertInstance = ALERT(opt.title, opt.message, [{
        text: opt.cancelText,
        onPress: opt.cancelCallBack,
        style: opt.style
      },
      {
        text: opt.confirmText,
        onPress: opt.confirmCallBack
      },
    ])

    let mask = document.querySelector('.am-modal-wrap')
    opt.clickModalClose ? mask.addEventListener('click', function () {
      alertInstance.close()
    }, false) : mask.removeEventListener('click', alertInstance.close, false)
    if (!opt.autoClose) return

    setTimeout(() => {
      alertInstance.close();
    }, 2000);
  },
  // 弹窗 operation
  showOpration: (params: INTERFACE_OPT) => {
    // const options: INTERFACE_OPT = {
    //   buttons: params.buttons, 
    //   platform: params.platform
    //   autoClose: params.autoClose
    // }
    const options = { ...params }
    let operation = OPERRATION(options.buttons, options.platform)
    if(options.autoClose) {
      setTimeout(() => {
        operation.close()
      }, 2000);
    }

  }
}

export default UITool as any