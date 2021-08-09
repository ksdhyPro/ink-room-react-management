import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import { ImageUtils } from 'braft-finder'
import { PictureOutlined ,DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Upload, Form, Input, Checkbox ,DatePicker,message,Row,Col,Image, Select} from 'antd'
import {ConfigBaseURL} from '../../../../api/http'

import moment from 'moment'
import ImgCrop from 'antd-img-crop';
import { addShop, editShop } from '../../../../api/shopApi'



const layout = {
  labelCol: { 
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};




const config = {
  rules: [
    {
      type: 'object',
      required: true,
      message: 'Please select time!',
    },
  ],
};




export default class AddShop extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      editorState: BraftEditor.createEditorState(this.props.operator == 'edit'?this.props.data.msg:null),
      shopShowFileList:[] ,//商品详情页展示的轮播图
      propsImage:props.data.coverPath?[...props.data.coverPath] : [],
      index:''//更换图片的index
    })

}




  formRef = React.createRef();

  onFinish = async(values) => {
    let coverPath = [...this.state.shopShowFileList.map(item => item.response.storageAddress),...this.state.propsImage]
    if(coverPath.length <= 0){
      message.error("至少上传一张图片！");
    }else{
      if(this.props.operator == 'edit'){
       let res = await editShop(
         {...values,
          type:parseInt(values.type),
          msg:this.state.editorState.toHTML(),
          coverPath:JSON.stringify(coverPath)
        })
       if(res.code == 200){
         this.props.onChange(true)
       }else{
        this.props.onChange(false)
       }
      }

      if(this.props.operator == 'add'){

        let res = await addShop(
          {...values,
           type:parseInt(values.type),
           msg:this.state.editorState.toHTML(),
           coverPath:JSON.stringify(coverPath),
           createTime:new Date().getTime()
         })
        if(res.code == 200){
          this.props.onChange(true)
        }else{
         this.props.onChange(false)
        }




      }
      
    }

    



   

  
  };


  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  onReset = () => {
    this.formRef.current.resetFields();
  };

  handleChange = (editorState) => {

    this.setState({ editorState })
  } 

  uploadHandler = ({ fileList: newFileList }) => {
    if(newFileList[0].response){
      if(newFileList[0].response.storageAddress)
      {
        this.setState({
          editorState: ContentUtils.insertMedias(this.state.editorState, [{
            type: 'IMAGE',
            url: newFileList[0].response.showAddress
          }])
        })
      }
      else{
        message.error('插入图片失败，请检查网络');
      }
    }
  }

// 清空编辑器内容
 clearContent = () => {
    this.setState({
      editorState: ContentUtils.clear(this.state.editorState)
    })
  }





  componentWillUnmount(){
    this.onReset();
    this.setState({
      filePath:"",
      fileList:[],

    })
    this.clearContent();
  }


  // 预览
  preview = () => {

    if (window.previewWindow) {
      window.previewWindow.close()
    }

    window.previewWindow = window.open()
    window.previewWindow.document.write(this.buildPreviewHtml())
    window.previewWindow.document.close()

  }


  buildPreviewHtml () {

    return `
      <!Doctype html>
      <html>
        <head>
          <title>预览</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${this.state.editorState.toHTML()}</div>
        </body>
      </html>
    `

  }


  onChange3 = ({ fileList: newFileList }) => {
    this.setState({shopShowFileList:newFileList})
    if(newFileList[0] && newFileList[0].response){
      if(!newFileList[0].response.storageAddress)
      {
        message.error('图片上传失败，请检查网络');
      }
    }
  };


  onChange = (file) => {
    console.log(file);
    if(file.file.response)
    {
      let arr = this.state.propsImage;
      arr.splice(this.state.index,1,file.file.response.storageAddress);
      this.setState({
        propsImage:arr
      })
    }
    // if(newFileList[0] && newFileList[0].response){
    //   if(!newFileList[0].response.storageAddress)
    //   {
    //     message.error('图片上传失败，请检查网络');
    //   }
    // }
  };




  render () {
    
    const controls = [
      'line-height',
      'headings',
      'clear',
      'list-ol',
      'list-ul',
      'remove-styles',
      'hr',
      'text-align',
      'bold', 'italic', 'underline', 'text-color', 'separator', 'fullscreen'
    ]
    const extendControls = [
      {
        key: 'custom-button',
        type: "button",
        text: '预览',
        onClick: this.preview
      },
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <Upload
            accept="image/*"
            showUploadList={false}
            // customRequest={this.uploadHandler}
            action={ConfigBaseURL+"/addActiveImage"}
            method="post"
            name="file"
            onChange={this.uploadHandler}
          >
            <Button type="button" className="control-item button upload-button" data-title="插入图片">
            <PictureOutlined />
            </Button>
          </Upload>
        )
      },
      
    ]

    return (
      <>
        <Form
        ref={this.formRef}
      {...layout}
      name="basic"
      onFinish={this.onFinish}
      onFinishFailed={this.onFinishFailed}
    >

    {
      this.props.operator == 'edit'?(
        <Form.Item
            label="id"
            name="id"
            initialValue={this.props.operator == 'edit'?this.props.data.id:''}
            rules={[
              {
                required: true,
                message: '未设置id',
              },
            ]}
          >
            <Input disabled/>
      </Form.Item>
      ):''
    }


    
      
      <Form.Item
        label="名称"
        name="name"
        initialValue={this.props.operator == 'edit'?this.props.data.name:''}
        rules={[
          {
            required: true,
            message: '请输入商品名称',
          },
        ]}
      >
        <Input/>
      </Form.Item>


      <Form.Item
        label="价格"
        name="price"
        initialValue={this.props.operator == 'edit'?this.props.data.price:''}
        rules={[
          {
            required: true,
            message: '请输入价格',
          },
        ]}
      >
        <Input type="number"/>
      </Form.Item>

      <Form.Item 
        label="商品类型"
        name="type"
        initialValue={this.props.operator == 'edit'?""+this.props.data.type:''}
        rules={[
          {
            required: true,
            message: '请选择商品类型',
          },
        ]}
      >

          <Select >
              <Select.Option value="0">无</Select.Option>
              <Select.Option value="1">国画</Select.Option>
              <Select.Option value="2">建盏</Select.Option>
              <Select.Option value="3">衍生</Select.Option>
              <Select.Option value="4">礼品</Select.Option>
              <Select.Option value="5">油画</Select.Option>
              <Select.Option value="6">瓷器</Select.Option>
              <Select.Option value="7">雕塑</Select.Option>
              <Select.Option value="8">其他</Select.Option>
          </Select>

      </Form.Item>

      <Form.Item 
        label="艺术家"
        name="artist"
        initialValue={this.props.operator == 'edit'?this.props.data.artist:''}
      >
        <Input placeholder="没有可以不填"/>
      </Form.Item>



      <Form.Item  
            label="排序"
            name="sort"
            initialValue={this.props.operator == 'edit'?this.props.data.sort:1}
            rules={[
              {
                required: true,
                message: '填写排序信息',
              },
            ]}
          >
            <Input/>
      </Form.Item>


<Form.Item label="商品页详情轮播图">
  <ImgCrop aspect={600/600}>
        <Upload
          action={ConfigBaseURL+'/shopImage'} 
          listType="picture-card"
          fileList={this.state.shopShowFileList} 
          onChange={this.onChange3}
          name="file"
        >
      {this.state.shopShowFileList.length < (5-this.state.propsImage.length) && '+ 上传'}
    </Upload>
    
  </ImgCrop>
  {"（最多五张,还可以上传"+(5-this.state.propsImage.length - this.state.shopShowFileList.length) + "张）"}
</Form.Item>

{
  this.props.operator == 'edit'?(
    <div style={{position:'relative'}}>
       
      {
       this.state.propsImage.map((item,index)=>(
         <div style={{display:'flex',minHeight:100}} key={item}>
           <Image src={ConfigBaseURL + item}
            alt={"展示图片"+(index+1)}
            title={"展示图片"+(index+1)}
            width={300}
            preview={false}
            onMouseMove={()=>{
              this.setState({opacity:1})
            }}
            onMouseLeave={()=>{
              this.setState({opacity:0})
            }}
            style={{marginLeft:160,marginBottom:15}}
          ></Image>
          <div style={{marginLeft:200,display:'flex',flexFlow:'column',justifyContent:'center'}}>


          <ImgCrop aspect={1920/1080}>
              <Upload
                action={ConfigBaseURL+'/addActiveImage'} 
                showUploadList={false}
                onChange={this.onChange}
                name="file"
              >
           <Button type="primary"  style={{marginBottom:20}} onClick={()=>{
             this.setState({index})
           }}>更换</Button>
          </Upload>
          
        </ImgCrop>


            
            <Button type="primary" danger onClick={()=>{
              let arr = JSON.parse(JSON.stringify(this.state.propsImage))
              arr.splice(index,1)
              this.setState({
                propsImage:arr
              })
            }}>删除</Button>
          </div>
         </div>
         ))
      }
      
    </div>
  ):''
}





          <Form.Item 
          label="商品介绍"
             name="msg"
             >

              <div>
              <BraftEditor
                controls={controls}
                style={{border:'1px solid #ccc'}}
                extendControls={extendControls}
                contentStyle={{height: 400}}
                placeholder="请输入正文内容"
                onChange={this.handleChange}
                value={this.state.editorState}
              />
             </div>
             

     
          </Form.Item>
 
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>

    </Form>
      
    </>
    )

  }

}