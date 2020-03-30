import Taro from "@tarojs/taro";
import {View, Picker} from "@tarojs/components";
import {AtButton, AtForm, AtInput, AtImagePicker} from "taro-ui";
import getBaseUrl from '../../servers/base_url'
import {deleteFile} from '../../servers/http_method'
import "./settlement_invoice_add.scss";

type DogaImage = {
  url: string
  file: any
}

export default class SettlementInvoice extends Taro.Component<{}> {

  state = {
    selector: ['Z010001000101', 'Z010001000102', 'Z010001000103'],
    selectorValue: 0,
    invoiceNo: '',
    invoiceNote: '',
    files: []
  }

  componentWillMount() {

  }

  public config: Taro.PageConfig = {
    navigationBarTitleText: '发票上传新增'
  }

  // 输入框
  private handleInput(type: string, value: string): void {
    if (type == 'invoiceNo') {
      this.setState({
        invoiceNo: value
      })
    } else if (type == 'invoiceNote') {
      this.setState({
        invoiceNote: value
      })
    }

  }

  handleJmzChange = e => {
    this.setState({
      selectorValue: e.detail.value
    })
  }

  private onButtonClick(): void {
  }

  // 参数files包括所有的元素，删除时已被删除的元素不包括
  private onChange(files: DogaImage[], type: string, index: number): void {
    console.log(files, type, index);
    if (type == 'add') {// 新增图片，上传
      Taro.showLoading({title: '开始上传'});
      // 文件上传
      Taro.uploadFile({
        url: getBaseUrl() + '/file/upload',// 服务器地址
        filePath: files[files.length - 1].file.path,// 要上传文件资源的路径
        name: 'file',// 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
        success: (response) => {
          console.log(response);
          const dataObj = JSON.parse(response.data);
          console.log(dataObj.fileDownloadUri);
          files[files.length - 1].url = dataObj.fileDownloadUri;
          files[files.length - 1].file.name = dataObj.fileName;
          // files[files.length - 1].file = {};

          this.setState({
            files: files
          })
          Taro.showToast({title: '上传成功', icon: 'success', duration: 2000})
        },
        fail: () => {
          Taro.showToast({title: '上传失败', icon: 'none', duration: 2000})
        },
        complete: () => {
          Taro.hideLoading();
        }
      })
    } else if (type == 'remove') {// 删除图片，同步删除
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
      deleteFile(this.state.files[index].file.name).then(res => {
        console.log(res)
        files = files.slice(0, index).concat(files.slice(index + 1));
        this.setState({
          files: files
        })
      }).catch(err => {
        Taro.showToast({title: '操作失败，请重试' + err.toString(), icon: 'none', duration: 2000})
      })
    } else {
      Taro.showToast({
        title: '不支持的操作类型',
        icon: 'none',
        duration: 2000
      })
    }
  }

  private onFail(mes: string): void {
    console.log(mes)
  }

  private onImageClick(index: number, file: DogaImage): void {
    console.log(index, file)
  }

  public render(): JSX.Element {
    return (
      <View className='page'>
        {/* S Body */}
        <View className='doc-body'>

          <View className='panel'>
            <View className='panel__title'>基本信息</View>
            <View className='panel__content no-padding'>
              <View className='example-item'>
                <AtForm>
                  <AtInput name='invoiceNo' title='加盟站' type='text' placeholder='' disabled
                    value='济南20001站'
                    onChange={this.handleInput.bind(this)}
                  />
                  <AtInput name='invoiceNo' title='发票编号' type='text' placeholder='输入发票编号'
                    value={this.state.invoiceNo}
                    onChange={this.handleInput.bind(this, 'invoiceNo')}
                  />

                  <Picker mode='selector' range={this.state.selector} value={this.state.selectorValue}
                    onChange={this.handleJmzChange}
                  >
                    <View className='demo-list-item'>
                      <View className='demo-list-item__label'>油气品</View>
                      <View
                        className='demo-list-item__value'
                      >{this.state.selector[this.state.selectorValue]}</View>
                    </View>
                  </Picker>

                  <AtInput name='invoiceNo' title='税率' type='digit' placeholder='输入税率'
                    value={this.state.invoiceNo} onChange={this.handleInput.bind(this)}
                  />
                  <AtInput name='invoiceNo' title='油品数量' type='digit' placeholder='输入油品数量'
                    value={this.state.invoiceNo} onChange={this.handleInput.bind(this)}
                  />
                  <Picker mode='selector' range={this.state.selector} value={this.state.selectorValue}
                    onChange={this.handleJmzChange}
                  >
                    <View className='demo-list-item'>
                      <View className='demo-list-item__label'>计量单位</View>
                      <View
                        className='demo-list-item__value'
                      >{this.state.selector[this.state.selectorValue]}</View>
                    </View>
                  </Picker>
                  <AtInput name='invoiceNo' title='发票金额' type='digit' placeholder='输入发票金额'
                    value={this.state.invoiceNo} onChange={this.handleInput.bind(this)}
                  />
                  <AtInput name='invoiceNo' title='发票税额' type='digit' placeholder='输入发票税额'
                    value={this.state.invoiceNo} onChange={this.handleInput.bind(this)}
                  />
                  <AtInput name='invoiceNote' title='备注信息' type='text' placeholder='输入备注信息'
                    value={this.state.invoiceNote}
                    onChange={this.handleInput.bind(this, 'invoiceNote')}
                  />
                </AtForm>
              </View>
            </View>
          </View>

          <View className='panel'>
            <View className='panel__title'>发票上传</View>
            <View className='panel__content no-padding'>
              <View className='example-item'>
                <AtImagePicker
                  files={this.state.files}
                  onChange={this.onChange.bind(this)}
                  onFail={this.onFail.bind(this)}
                  onImageClick={this.onImageClick.bind(this)}
                />
              </View>
            </View>
          </View>

          <View className='panel'>
            <View className='panel__content'>
              <View className='btn-item'>
                <AtButton type='secondary' onClick={this.onButtonClick.bind(this)}>保存</AtButton>
              </View>
              <View className='btn-item'>
                <AtButton type='primary' onClick={this.onButtonClick.bind(this)}>提交</AtButton>
              </View>
            </View>
          </View>

        </View>
      </View>
    )
  }
}
