/* eslint-disable @typescript-eslint/no-empty-function */
import Taro, {Component, Config} from '@tarojs/taro'
import {Provider} from '@tarojs/redux'

import Index from './pages/index'
import configStore from './store'
import {getAuthInfo} from './servers/http_method'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  componentWillMount() {
    Taro.checkSession({
      success() {
        return Taro.getStorage({key: 'session3rd'})
      },
      async fail() {
        console.log('checkSession fail')
        try {
          const response = await Taro.login();
          // 调用后台请求获取session_key
          // const res = await Taro.request({
          //   url: 'https://www.thinkmar.net/miniprogram/auth/' + response.code,
          // })
          await getAuthInfo(response.code).then(res => {
            Taro.setStorage({key: 'session3rd', data: res.data.session_key})
            Taro.setStorage({key: 'openid', data: res.data.openid});
            Taro.setStorage({key: 'AccessToken', data: res.data.AccessToken});
          }).catch(err => {
            Taro.showToast({title: 'Auth 发生错误，请重试！' + err.toString(), icon: 'none'})
          })
        } catch (err) {
          console.log(err)
          Taro.showToast({title: '发生错误，请重试!', icon: 'none'})
        }
      }
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount() {
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/user_authorize',
      'pages/index/index',
      'pages/settlement/settlement',
      'pages/settlement/account_balance',
      'pages/settlement/account_all_detail',
      'pages/settlement/consume_all_detail',
      'pages/settlement/settlement_all_detail',
      'pages/settlement/settlement_apply',
      'pages/settlement/settlement_cashout',
      'pages/settlement/settlement_invoice',
      'pages/settlement/settlement_invoice_add',
      'pages/settlement/settlement_notsettled',
      'pages/person/person',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [{
        pagePath: 'pages/index/index',
        text: '系统首页',
        iconPath: './assets/images/home.png',
        selectedIconPath: './assets/images/home_s.png'
      }, {
        pagePath: 'pages/settlement/settlement',
        text: '结算业务',
        iconPath: './assets/images/settlement.png',
        selectedIconPath: './assets/images/settlement_s.png'
      },
        {
          pagePath: 'pages/person/person',
          text: '个人中心',
          iconPath: './assets/images/usercenter.png',
          selectedIconPath: './assets/images/usercenter_s.png'
        }],
      color: '#8a8a8a',
      selectedColor: '#2d8cf0',
      backgroundColor: '#fff',
      borderStyle: 'white'
    },
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
