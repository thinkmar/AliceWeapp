import Taro from '@tarojs/taro';
import {View, Button} from '@tarojs/components';
import {AtAvatar} from 'taro-ui'
import './user_authorize.scss'


export default class UserAuthorize extends Taro.Component {
  state = {}

  componentWillMount() {
    Taro.getSetting()
      .then(res => {
        if (res.authSetting["scope.userInfo"]) {
          return true;
        } else {
          return false;
        }
      }).then(res => {
      if (res) {
        const value = Taro.getStorageSync('userInfo');
        console.log('componentDidMount' + value);
        if (value) {
          Taro.switchTab({url: '/pages/index/index'})
        }
      }
    })
  }

  componentDidMount() {
  }

  config = {
    navigationBarTitleText: '用户授权'
  }

  tobegin = (res) => {
    Taro.setStorage({key: 'userInfo', data: res.detail.userInfo})
    Taro.switchTab({url: '/pages/index/index'})
  }

  render() {
    return (
      <View className='page'>
        <View className='at-row'>
          <View className='at-col at-col-12'>
            <View className='at-row'>
              <View className='at-col at-col-12 top-info-content'>
                <AtAvatar className='avatar' image={require('../../assets/images/zmyq.png')} />
              </View>
            </View>
            <View className='at-row'>
              <View className='at-col at-col-12 top-info-content'>
                <Button className='weapp_btn' openType='getUserInfo' onGetUserInfo={this.tobegin}
                  type='primary' lang='zh_CN'
                > 微信授权登录 </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }

}
