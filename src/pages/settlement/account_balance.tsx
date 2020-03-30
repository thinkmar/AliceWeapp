import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtIcon} from 'taro-ui'
import './account_balance.scss'


export default class AccountBalance extends Taro.Component {

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  config = {
    navigationBarTitleText: '结算业务'
  }

  onGotoDetail() {
    Taro.navigateTo({
      url: '/pages/settlement/account_all_detail'
    })
  }

  render() {

    return (
      <View className='page page-index'>
        <View className='default_spacing'></View>
        {/* 卡片 */}
        <View className='flex-card'>
          <View className='at-row'>
            <View className='at-col at-col-4'>账户余额</View>
            <View className='at-col at-col-5'></View>
            <View className='at-col at-col-3'>通联</View>
          </View>
          <View className='at-row at-row__align--center'>
            <View className='at-col at-col-1'></View>
            <View className='at-col at-col-9'>
              <View className='at-row'>
                <View className='at-col at-col-3'>账号</View>
                <View className='at-col at-col-9 text-align-left font-size-large'>6000 9888 8888</View>
              </View>
              <View className='at-row'>
                <View className='at-col at-col-3'>名称</View>
                <View className='at-col at-col-9 text-align-left'>加盟站0009通联主账户</View>
              </View>
              <View className='at-row'>
                <View className='at-col at-col-3'>余额</View>
                <View className='at-col at-col-9 text-align-left font-size-large-bold'>89,000.00</View>
              </View>
            </View>
            <View className='at-col at-col-2'>
              <AtIcon value='chevron-right' size='45' color='#FFF'
                onClick={this.onGotoDetail.bind(this)}
              ></AtIcon>
            </View>
          </View>
          <View className='at-row'>
            <View className='at-col at-col-1'></View>
            <View className='at-col at-col-11 text-align-left font-size-small'>更新时间 2020-3-8 09:23:39</View>
          </View>
        </View>

        {
          Array(2).fill(1).map(i => (
              <View className='flex-card flex-card-blue' key={i}>
                <View className='at-row'>
                  <View className='at-col at-col-4'>账户余额</View>
                  <View className='at-col at-col-5'></View>
                  <View className='at-col at-col-3'>富友</View>
                </View>
                <View className='at-row at-row__align--center'>
                  <View className='at-col at-col-1'></View>
                  <View className='at-col at-col-9'>
                    <View className='at-row'>
                      <View className='at-col at-col-3'>账号</View>
                      <View className='at-col at-col-9 text-align-left font-size-large'>6000 9888
                        8888</View>
                    </View>
                    <View className='at-row'>
                      <View className='at-col at-col-3'>名称</View>
                      <View className='at-col at-col-9 text-align-left'>加盟站0009富友主账户</View>
                    </View>
                    <View className='at-row'>
                      <View className='at-col at-col-3'>余额</View>
                      <View
                        className='at-col at-col-9 text-align-left font-size-large-bold'
                      >89,000.00</View>
                    </View>
                  </View>
                  <View className='at-col at-col-2'>
                    <AtIcon value='chevron-right' size='45' color='#FFF'
                      onClick={this.onGotoDetail.bind(this)}
                    ></AtIcon>
                  </View>
                </View>
                <View className='at-row'>
                  <View className='at-col at-col-1'></View>
                  <View className='at-col at-col-11 text-align-left font-size-small'>更新时间 2020-3-8
                    09:23:39</View>
                </View>
              </View>
            )
          )
        }
      </View>
    )
  }
}
