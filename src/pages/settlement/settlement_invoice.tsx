/* eslint-disable @typescript-eslint/camelcase */
import Taro from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import {AtSwipeAction, AtIcon, AtActionSheet, AtActionSheetItem} from 'taro-ui'
import {CommonEvent} from '@tarojs/components/types/common';
import {SwipeActionOption} from 'taro-ui/types/swipe-action';
import ListView from 'taro-listview';
import {getListData} from '../../servers/http_method'
import './settlement_invoice.scss'


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

interface InvoiceState {
  isLoaded: boolean
  error: boolean
  hasMore: boolean
  isEmpty: boolean
  isOpened: boolean
  currentOperName: string
  currentOperTips: string
  list: any
}

export default class SettlementInvoice extends Taro.Component<{}, InvoiceState> {

  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      error: false,
      hasMore: true,
      isEmpty: false,
      isOpened: false,
      currentOperName: '',// 当前操作名称
      currentOperTips: '',// 当前操作提示信息
      list: blankList
    }
  }

  componentDidMount() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.refList.fetchInit();
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
      hasMore: hasMore
    });
    fn();
  };

  refList = {};

  insRef = (node) => {
    this.refList = node;
  };

  config = {
    navigationBarTitleText: '发票上传'
  }


  private handleInvoiceAdd = (): void => {
    Taro.navigateTo({
      url: '/pages/settlement/settlement_invoice_add'
    })
  }

  // 滑出提交、删除操作后，点击事件
  private handleClick = (data: any, item: SwipeActionOption, key: number, e: CommonEvent): void => {
    console.log('触发了点击', data, item, key, e)
    this.showToast(`${data.title}`)
    let operName = '';
    let operTips = '';
    if (key == 0) {// 提交
      operName = '提交';
      operTips = '结算申请单提交后不可修改，请了解';
    } else if (key == 1) {// 删除
      operName = '删除';
      operTips = '结算申请单删除后不可恢复，请了解';
    }
    this.setState({
      currentOperName: operName,
      currentOperTips: operTips
    })
    this.handleActionSheetDisplay(operName);
  }

  private showToast = (name: string): void => {
    Taro.showToast({
      icon: 'none',
      title: name
    })
  }

  // 控制动作面板显示隐藏
  private handleActionSheetDisplay = (action: string): void => {
    console.log('显示:' + action);
    this.setState({
      isOpened: true
    })
  }

  private handleClose = (): void => {
    this.setState({
      isOpened: false
    })
  }

  private handleCancel = (): void => {
    this.setState({
      isOpened: false
    })
    this.showToast('已取消');
  }

  private handleDeleteSure = (): void => {
    this.setState({
      isOpened: false
    })
    this.showToast('已删除');
  }

  render() {
    const {isLoaded, error, hasMore, isEmpty, list, isOpened, currentOperName, currentOperTips} = this.state;

    return (
      <View className='page'>
        <View className='default_spacing'></View>
        <View className='at-row'>
          <View className='at-col at-col-12'>

            {/* 汇总金额显示 */}
            {/* 卡片 */}
            <View className='flex-card card_margin'>
              <View className='at-row'>
                <View className='at-col at-col-4'>发票上传</View>
                <View className='at-col at-col-5'></View>
                <View className='at-col at-col-3'></View>
              </View>
              <View className='at-row at-row__align--center'>
                <View className='at-col at-col-1'></View>
                <View className='at-col at-col-9'>
                  <View className='at-row'>
                    <View className='at-col at-col-3'>累计</View>
                    <View
                      className='at-col at-col-9 text-align-left font-size-large-bold'
                    >89,000.00</View>
                  </View>
                </View>
                <View className='at-col at-col-2'>
                  <AtIcon value='add-circle' size='40' color='#FFF'
                    onClick={this.handleInvoiceAdd}
                  ></AtIcon>
                </View>
              </View>
              <View className='at-row'>
                <View className='at-col at-col-1'></View>
                <View className='at-col at-col-11 text-align-left font-size-small'>更新时间 2020-03-25
                  09:23:00</View>
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
                  let saveFlag = false;
                  let submitFlag = false;
                  let passFlag = false;
                  let backFlag = false;
                  if (index % 4 == 0) {
                    saveFlag = true;
                  } else if (index % 4 == 1) {
                    submitFlag = true;
                  } else if (index % 4 == 2) {
                    passFlag = true;
                  } else {
                    backFlag = true;
                  }


                  return (
                    <View className='module-list-container' key={index}>
                      <AtSwipeAction autoClose disabled={submitFlag || passFlag}
                        onClick={this.handleClick.bind(this, item)} options={[
                        {
                          text: '提交',
                          style: {
                            backgroundColor: '#6190E8'
                          }
                        },
                        {
                          text: '删除',
                          style: {
                            backgroundColor: '#FF4949'
                          }
                        }
                      ]}
                      >
                        <View className='at-row module-list-item skeleton-bg'>
                          <View
                            className='at-col at-col-1 module-list-item-state skeleton-rect'
                          >
                            {saveFlag && <View className='state_save'>
                              <Text className='at-icon at-icon-add-circle' />
                            </View>}
                            {submitFlag && <View className='state_submit'>
                              <Text className='at-icon at-icon-clock' />
                            </View>}
                            {passFlag && <View className='state_pass'>
                              <Text className='at-icon at-icon-check-circle' />
                            </View>}
                            {backFlag && <View className='state_back'>
                              <Text className='at-icon at-icon-close-circle' />
                            </View>}

                          </View>
                          <View
                            className='at-col at-col-9 at-col--wrap module-list-item-info skeleton-rect'
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
                      </AtSwipeAction>
                    </View>
                  )
                })}
              </ListView>
            </View>

          </View>
        </View>


        <AtActionSheet
          cancelText='取消'
          isOpened={isOpened}
          onCancel={this.handleCancel}
          onClose={this.handleClose}
          title={currentOperTips}
        >
          <AtActionSheetItem
            onClick={this.handleDeleteSure}
          >
            <Text className='danger'>确定{currentOperName}</Text>
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    )
  }
}
