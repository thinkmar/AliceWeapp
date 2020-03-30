import {ComponentClass} from 'react'
import Taro, {Component, Config} from '@tarojs/taro'
import {View, Button, Text} from '@tarojs/components'
import {AtIcon} from 'taro-ui'
import {connect} from '@tarojs/redux'

import {add, minus, asyncAdd} from '../../actions/counter'

import './index.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps
}

@connect(({counter}) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  },
  dec() {
    dispatch(minus())
  },
  asyncAdd() {
    dispatch(asyncAdd())
  }
}))

class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */


  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }

  config: Config = {
    navigationBarTitleText: '系统首页'
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  onButtonClick() {
    Taro.login({
      success: function (res) {
        if (res.code) {
          console.log(res)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }

  handleYueClick() {
    Taro.navigateTo({
      url: '/pages/settlement/account_balance'
    })
  }

  render() {
    return (
      <View className='page'>
        <View className='default_spacing'></View>
        {/* 卡片 */}
        <View className='flex-card' onClick={this.handleYueClick.bind(this)}>
          <View className='at-row'>
            <View className='at-col at-col-4'>账户余额</View>
            <View className='at-col at-col-5'></View>
            <View className='at-col at-col-3'>通联</View>
          </View>
          <View className='at-row at-row__align--center'>
            <View className='at-col at-col-1'></View>
            <View className='at-col at-col-9'>
              <View className='at-row'>
                <View className='at-col at-col-3'>说明</View>
                <View className='at-col at-col-9 text-align-left'>通联3个账户合计</View>
              </View>
              <View className='at-row'>
                <View className='at-col at-col-3'>余额</View>
                <View className='at-col at-col-9 text-align-left font-size-large-bold'>89,000.00</View>
              </View>
            </View>
            <View className='at-col at-col-2'>
              <AtIcon value='chevron-right' size='45' color='#FFF'></AtIcon>
            </View>
          </View>
          <View className='at-row'>
            <View className='at-col at-col-1'></View>
            <View className='at-col at-col-11 text-align-left font-size-small'>更新时间 2020-3-8 09:23:39</View>
          </View>
        </View>

        {/* 卡片 */}
        <View className='flex-card flex-card-blue' onClick={this.handleYueClick.bind(this)}>
          <View className='at-row'>
            <View className='at-col at-col-4'>账户余额</View>
            <View className='at-col at-col-5'></View>
            <View className='at-col at-col-3'>富友</View>
          </View>
          <View className='at-row at-row__align--center'>
            <View className='at-col at-col-1'></View>
            <View className='at-col at-col-9'>
              <View className='at-row'>
                <View className='at-col at-col-3'>说明</View>
                <View className='at-col at-col-9 text-align-left'>富友3个账户合计</View>
              </View>
              <View className='at-row'>
                <View className='at-col at-col-3'>余额</View>
                <View className='at-col at-col-9 text-align-left font-size-large-bold'>9,000.00</View>
              </View>
            </View>
            <View className='at-col at-col-2'>
              <AtIcon value='chevron-right' size='45' color='#FFF'></AtIcon>
            </View>
          </View>
          <View className='at-row'>
            <View className='at-col at-col-1'></View>
            <View className='at-col at-col-11 text-align-left font-size-small'>更新时间 2020-3-8 09:23:39</View>
          </View>
        </View>

        <View className='info_view'>
          <View className='bio'>交易汇总信息</View>
          <View className='item_view'>
            <View className='item'>
              <View className='title'>今日</View>
              <View className='desc'>9,000.00</View>
            </View>
            <View className='item'>
              <View className='title'>7日</View>
              <View className='desc'>6,008.00</View>
            </View>
          </View>
          <View className='item_view'>
            <View className='item'>
              <View className='title'>本月</View>
              <View className='desc'>90,000.00</View>
            </View>
            <View className='item'>
              <View className='title'>本年</View>
              <View className='desc'>606,008.00</View>
            </View>
          </View>
        </View>

        <View className='info_view'>
          <View className='bio'>结算汇总信息</View>
          <View className='item_view'>
            <View className='item'>
              <View className='title'>今日</View>
              <View className='desc'>9,000.00</View>
            </View>
            <View className='item'>
              <View className='title'>7日</View>
              <View className='desc'>6,008.00</View>
            </View>
          </View>
          <View className='item_view'>
            <View className='item'>
              <View className='title'>本月</View>
              <View className='desc'>90,000.00</View>
            </View>
            <View className='item'>
              <View className='title'>本年</View>
              <View className='desc'>606,008.00</View>
            </View>
          </View>
        </View>

        <View><Text>Hello, World</Text></View>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>

        <Button className='dec_btn' onClick={this.onButtonClick.bind(this)}>跳转页面</Button>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
