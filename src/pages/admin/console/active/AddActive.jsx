import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import { ImageUtils } from 'braft-finder'
import { PictureOutlined  } from '@ant-design/icons';
import { Button, Card, Upload, Form, Input, Checkbox ,DatePicker,message,Row,Col,Image} from 'antd'
import {ConfigBaseURL} from '../../../../api/http'
import {addActive,editActive} from '../../../../api/consoleApi'
import moment from 'moment'
import ImgCrop from 'antd-img-crop';



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




export default class AddActive extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = ({
      editorState: BraftEditor.createEditorState(this.props.operator == 'edit'?this.props.data.content:null),
      fileList:[],
      filePath:"",
    })

}


  formRef = React.createRef();

  onFinish = async(values) => {


    if(this.props.operator == 'add'){
      let data = {
        ...values,
        content:this.state.editorState.toHTML(),
        startTime:moment(values.startTime).unix()*1000,
        cover:this.state.filePath
      }
      let res = await addActive(data);
      if(res.code == 200){
        message.success("添加成功")
        this.onReset();
        this.setState({
          filePath:"",
          fileList:[],
  
        })
        this.clearContent();
        this.props.getChildValue(true)
      }else{
        this.props.getChildValue(false)
      }
    }else if(this.props.operator == 'edit'){

      let data = {
        ...values,
        content:this.state.editorState.toHTML(),
        startTime:moment(values.startTime).unix()*1000,
        cover:this.state.filePath == ""?(this.props.data.cover.replace(ConfigBaseURL,"")):this.state.filePath
      }
      let res = await editActive(data);
      if(res.code == 200){
        this.props.getChildValue(true)
      }else{
        this.props.getChildValue(false)
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




  onChange2 = ({ fileList: newFileList }) => {
    this.setState({fileList:newFileList})
    if(newFileList[0].response){
      if(newFileList[0].response.storageAddress)
      {
        this.setState({filePath:newFileList[0].response.storageAddress})
        
      }
      else{
        message.error('图片上传失败，请检查网络');
      }
    }
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
      initialValues={{
        remember: true,
      }}
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


    {
      this.props.operator == 'edit'?(
        <Form.Item
            label="排序"
            name="sort"
            initialValue={this.props.operator == 'edit'?this.props.data.sort:''}
            rules={[
              {
                required: true,
                message: '填写排序信息',
              },
            ]}
          >
            <Input/>
      </Form.Item>
      ):''
    }
      

      <Form.Item
        label="活动名称"
        name="name"
        initialValue={this.props.operator == 'edit'?this.props.data.name:''}
        rules={[
          {
            required: true,
            message: '请输入活动名称',
          },
        ]}
      >
        <Input />
      </Form.Item>

  


      <Form.Item 
        label="最多报名人数"
        name="maxPeople"
        initialValue={this.props.operator == 'edit'?this.props.data.maxPeople:''}
        rules={[
          {
            required: true,
            message: '请输入最大报名人数',
          },
        ]}
      >
        <Input type="number"/>
      </Form.Item>

     
      
      <Form.Item label="活动封面图">
        <ImgCrop aspect={1920/1080}>
              <Upload
                action={ConfigBaseURL+'/addActiveImage'} 
                listType="picture-card"
                fileList={this.state.fileList} 
                onChange={this.onChange2}
                name="file"
              >
            {this.state.fileList.length < 1 && '+ 上传'}
          </Upload>
        </ImgCrop>
      </Form.Item>

        <Image 
          src={
              this.props.operator == 'edit'?
              (
                this.state.filePath==""?
                this.props.data.cover:
                (ConfigBaseURL + this.state.filePath)
              )
              :''
            } 
            style={{maxWidth:300,marginLeft:160,marginBottom:20}}/>






      <Form.Item name="startTime" label="活动开始时间" {...config} 
      initialValue={(moment(new Date(parseInt(this.props.data.startTime))))}
      >
        <DatePicker />
      </Form.Item>


        

          <Form.Item 
          label="活动介绍"
             name="content"
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