/* eslint-disable @typescript-eslint/camelcase */
import Taro from '@tarojs/taro'
import {View, Text, Picker} from '@tarojs/components'
import {AtButton, AtDrawer, AtIcon} from 'taro-ui'
import ListView from 'taro-listview';
import {getListData} from '../../servers/http_method'
import './account_all_detail.scss'

const blankList = [{
  title: 'this is a example this is a examplethis is a examplethis is a examplethis is a example',
  author_id: ''
}, {
  title: 'this is a example this is a examplethis is a examplethis is a examplethis is a example',
  author_id: ''
}, {
  title: 'this is a example this is a examplethis is a examplethis is a examplethis is a example',
  author_id: ''
}, {
  title: 'this is a example this is a examplethis is a examplethis is a examplethis is a example',
  author_id: ''
}, {
  title: 'this is a example this is a examplethis is a examplethis is a examplethis is a example',
  author_id: ''
}, {
  title: 'this is a example this is a examplethis is a examplethis is a examplethis is a example',
  author_id: ''
}, {
  title: 'this is a example this is a examplethis is a examplethis is a examplethis is a example',
  author_id: ''
}, {
  title: 'this is a example this is a examplethis is a examplethis is a examplethis is a example',
  author_id: ''
}]

let pageIndex = 1;

interface AccountAllDetailState {
  showQueryParas: boolean
  selector: any
  selectorValue: number
  startDateSel: string
  endDateSel: string
  isLoaded: boolean
  error: boolean
  hasMore: boolean
  isEmpty: boolean
  list: any
}

export default class AccountAllDetail extends Taro.Component<{}, AccountAllDetailState> {

  constructor(props) {
    super(props)
    this.state = {
      showQueryParas: false,
      selector: ['Z010001000101', 'Z010001000102', 'Z010001000103'],
      selectorValue: 0,
      startDateSel: '2020-02-22',
      endDateSel: '2020-03-02',
      isLoaded: false,
      error: false,
      hasMore: true,
      isEmpty: false,
      list: blankList,
    }
  }

  componentDidMount() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.refList.fetchInit()
  }

  pullDownRefresh = async (rest) => {
    console.log('pullDownRefresh');
    pageIndex = 1;
    const res = await getListData(1);
    this.setState(res);
    rest()
  };

  onScrollToLower = async (fn) => {
    const {list} = this.state;
    const {list: newList, hasMore} = await getListData(++pageIndex);
    this.setState({
      list: list.concat(newList),
      hasMore
    });
    fn();
  };

  refList = {};

  insRef = (node) => {
    this.refList = node;
  };

  config = {
    navigationBarTitleText: '账户交易汇总明细'
  }


  handleDateChange = e => {
    this.setState({
      startDateSel: e.detail.value
    })
  }

  handleJmzChange = e => {
    this.setState({
      selectorValue: e.detail.value
    })
  }


  handleQueryParas() {
    this.setState({
      showQueryParas: true
    })
  }

  onQueryParasClose() {
    this.setState({
      showQueryParas: false
    })
  }

  render() {
    const {isLoaded, error, hasMore, isEmpty, list} = this.state;

    return (
      <View className='page'>
        <View className='default_spacing'></View>
        <View className='at-row'>
          <View className='at-col at-col-12'>

            {/* 汇总金额显示 */}
            {/* 卡片 */}
            <View className='flex-card card_margin'>
              <View className='at-row'>
                <View className='at-col at-col-4'>汇总金额</View>
                <View className='at-col at-col-5'></View>
                <View className='at-col at-col-3'></View>
              </View>
              <View className='at-row at-row__align--center'>
                <View className='at-col at-col-1'></View>
                <View className='at-col at-col-9'>
                  <View className='at-row'>
                    <View className='at-col at-col-3'>余额</View>
                    <View
                      className='at-col at-col-9 text-align-left font-size-large-bold'
                    >89,000.00</View>
                  </View>
                </View>
                <View className='at-col at-col-2'>
                  <AtIcon value='settings' size='40' color='#FFF'
                    onClick={this.handleQueryParas.bind(this)}
                  ></AtIcon>
                </View>
              </View>
              <View className='at-row'>
                <View className='at-col at-col-1'></View>
                <View className='at-col at-col-11 text-align-left font-size-small'>更新时间 2020-3-8
                  09:23:39</View>
              </View>
            </View>

          </View>
        </View>

        <View className='at-row'>
          <View className='at-col at-col-12'>

            <View className='skeleton module-list'>
              <ListView
                ref={node => this.insRef(node)}
                isLoaded={isLoaded}
                isError={error}
                hasMore={hasMore}
                style={{height: '100vh'}}
                isEmpty={isEmpty}
                onPullDownRefresh={fn => this.pullDownRefresh(fn)}
                onScrollToLower={this.onScrollToLower}
              >
                {list.map((item, index) => {
                  return (
                    <View className='at-row module-list-item skeleton-bg' key={index}>
                      <View
                        className='at-col at-col-10 at-col--wrap module-list-item-info skeleton-rect'
                      >
                        <View className='at-row title'>{item.title}</View>
                        <View className='at-row content'>{item.author_id}</View>
                      </View>
                      <View
                        className='at-col at-col-2 module-list-item-operation skeleton-radius'
                      >
                        <View className='arrow'>
                          <Text className='at-icon at-icon-eye' />
                        </View>
                      </View>
                    </View>
                  )
                })}
              </ListView>
            </View>

          </View>
        </View>


        {/* 查询条件 */}
        <AtDrawer show={this.state.showQueryParas} right width='70%' mask
          onClose={this.onQueryParasClose.bind(this)}
        >
          <View className='drawer-item'>

            <View className='example-item'>
              <Picker mode='selector' range={this.state.selector} value={this.state.selectorValue}
                onChange={this.handleJmzChange}
              >
                <View className='demo-list-item'>
                  <View className='demo-list-item__label'>账户</View>
                  <View
                    className='demo-list-item__value'
                  >{this.state.selector[this.state.selectorValue]}</View>
                </View>
              </Picker>
            </View>

            <View className='example-item'>
              <Picker mode='date' value={this.state.startDateSel} onChange={this.handleDateChange}>
                <View className='demo-list-item'>
                  <View className='demo-list-item__label'>开始日期</View>
                  <View className='demo-list-item__value'>{this.state.startDateSel}</View>
                </View>
              </Picker>
            </View>

            <View className='example-item'>
              <Picker mode='date' value={this.state.endDateSel} onChange={this.handleDateChange}>
                <View className='demo-list-item'>
                  <View className='demo-list-item__label'>结束日期</View>
                  <View className='demo-list-item__value'>{this.state.endDateSel}</View>
                </View>
              </Picker>
            </View>

            <View className='demo-list-btn'>
              <AtButton className='btn' type='primary' size='normal'>确定</AtButton>
              <AtButton className='btn' type='secondary'>重置</AtButton>
            </View>
          </View>
        </AtDrawer>


      </View>
    )
  }
}
