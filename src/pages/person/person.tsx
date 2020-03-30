import Taro from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import {AtAvatar, AtList, AtListItem} from 'taro-ui'
import './person.scss'


interface PersonCenterState {
  userInfo: {
    avatarUrl: string
    nickName: string
  }
}

export default class PersonCenter extends Taro.Component<{}, PersonCenterState> {

  constructor(props) {
    super(props)
    this.state = {
      userInfo: {
        avatarUrl: '',
        nickName: ''
      }
    }
  }


  componentWillMount() {
    const value = Taro.getStorageSync('userInfo');
    if (value) {
      this.setState({
        userInfo: value
      })
    }
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
    navigationBarTitleText: '个人中心'
  }

  render() {
    return (
      <View className='page page-person'>

        <View className='at-row top-info'>
          <View className='at-col at-col-12'>
            {/* 头像 */}
            <View className='at-row'>
              <View className='at-col at-col-12'>
                <View className='at-row'>
                  <View className='at-col at-col-12 top-info-content'>
                    <AtAvatar className='avatar' circle image={this.state.userInfo.avatarUrl} />
                  </View>
                </View>
                <View className='at-row'>
                  <View className='at-col at-col-12 top-info-content'>
                    <Text className='username'>{this.state.userInfo.nickName}</Text>
                  </View>
                </View>
              </View>
            </View>
            {/* 统计数据 */}
            <View className='at-row at-row__justify--center'>
              <View className='at-col at-col-11 data-statistics'>
                <View className='at-row'>
                  <View className='at-col at-col-12 top-info-content'>
                    <Text className='tips_font_size'>数据统计</Text>
                  </View>
                </View>
                <View className='at-row'>
                  <View className='at-col at-col-4'>
                    <View className='at-row at-row__justify--center'>
                      <Text>账户余额</Text>
                    </View>
                    <View className='at-row at-row__justify--center'>
                      <Text className='number_font_size'>1,200.00</Text>
                    </View>
                  </View>
                  <View className='at-col at-col-4'>
                    <View className='at-row at-row__justify--center'>
                      累计交易额
                    </View>
                    <View className='at-row at-row__justify--center'>
                      <Text className='number_font_size'>1,200.00</Text>
                    </View>
                  </View>
                  <View className='at-col at-col-4'>
                    <View className='at-row at-row__justify--center'>
                      累计结算额
                    </View>
                    <View className='at-row at-row__justify--center'>
                      <Text className='number_font_size'>1,200.00</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className='at-row at-row__justify--center'>
          <View className='at-col at-col-11'>
            <AtList className='operation' hasBorder={false}>
              <AtListItem
                title='完善信息'
                note='完善银行卡'
                arrow='right'
                thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
              />
              <AtListItem
                title='完善信息'
                note='手机号'
                arrow='right'
                thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
              />
              <AtListItem
                title='完善信息'
                note='微信绑定'
                arrow='right'
                thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
              />
              <AtListItem
                title='实名认证'
                note='进行个人实名认证'
                arrow='right'
                thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
              />
              <AtListItem hasBorder={false} title='修改密码' note='修改登录密码' arrow='right' iconInfo={{
                size: 25, color: '#78A4FA', value: 'lock',
              }}
              />
            </AtList>
          </View>
        </View>

      </View>
    )
  }
}
