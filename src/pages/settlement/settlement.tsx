import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtGrid} from 'taro-ui'
import './settlement.scss'

export default class Settlement extends Taro.Component {

  constructor() {
    super()
  }

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

  // 处理点击事件
  handleQueryClick(type, item, index) {
    console.log(type, item);
    if (type == 'account') {
      if (index == 0) {
        Taro.navigateTo({
          url: '/pages/settlement/account_balance'
        })
      } else if (index == 1) {
        Taro.navigateTo({
          url: '/pages/settlement/account_all_detail'
        })
      }
    } else if (type == 'consume') {
      Taro.navigateTo({
        url: '/pages/settlement/consume_all_detail'
      })
    } else if (type == 'settlement') {
      if (index == 0) {
        Taro.navigateTo({
          url: '/pages/settlement/settlement_all_detail'
        })
      } else if (index == 1) {
        Taro.navigateTo({
          url: '/pages/settlement/settlement_apply'
        })
      } else if (index == 2) {// 金额提现
        Taro.navigateTo({
          url: '/pages/settlement/settlement_cashout'
        })
      } else if (index == 3) {// 金额提现
        Taro.showToast({
          title: '功能开发中',
          icon: 'none',
          duration: 2000
        })
      } else if (index == 4) {
        Taro.navigateTo({
          url: '/pages/settlement/settlement_notsettled'
        })
      } else if (index == 5) {// 发票上传
        Taro.navigateTo({
          url: '/pages/settlement/settlement_invoice'
        })
      }
    }

  }

  render() {
    return (
      <View className='page'>

        <View className='doc-body'>

          <View className='panel'>
            <View className='panel__title'>账户</View>
            <View className='panel__content'>
              <View className='example-item'>
                <AtGrid onClick={this.handleQueryClick.bind(this, 'account')} mode='rect' columnNum={2}
                  data={
                          [
                            {
                              image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                              value: '余额查询'
                            },
                            {
                              image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                              value: '汇总明细'
                            }
                          ]
                        }
                />
              </View>
            </View>
          </View>

          <View className='panel'>
            <View className='panel__title'>消费</View>
            <View className='panel__content'>
              <View className='example-item'>
                <AtGrid onClick={this.handleQueryClick.bind(this, 'consume')} mode='rect' columnNum={2}
                  data={
                          [
                            {
                              image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                              value: '汇总明细'
                            }
                          ]
                        }
                />
              </View>
            </View>
          </View>

          <View className='panel'>
            <View className='panel__title'>结算</View>
            <View className='panel__content'>
              <View className='example-item'>
                <AtGrid onClick={this.handleQueryClick.bind(this, 'settlement')} mode='rect'
                  columnNum={2} data={
                  [
                    {
                      image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                      value: '汇总明细'
                    },
                    {
                      image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                      value: '结算申请'
                    },
                    {
                      image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                      value: '金额提现'
                    },
                    {
                      image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                      value: '剩余税费'
                    },
                    {
                      image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
                      value: '尚未结算'
                    },
                    {
                      image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                      value: '发票上传'
                    }
                  ]
                }
                />
              </View>
            </View>
          </View>
        </View>

      </View>
    )
  }
}
