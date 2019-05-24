import React, { Component, PropTypes } from 'react';
import { Provider , connect } from 'react-redux';

import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';


import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';




import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';



const { SubMenu } = Menu;
const { Content, Sider } = Layout;
class Home_c extends Component{
    constructor(){
        super();

        // this.state = {
        //     editorState: EditorState.createEmpty(),
        // };



        const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            };
        }
    }

    componentDidMount() {
        window.that = this;

        //console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))


        //获取内容
        //that.state.editorState.getCurrentContent().getPlainText()
    }

    onEditorStateChange (editorState) {
        this.setState({
            editorState,
        });
    };


    imageUploadCallBack (file) {
        return new Promise(
            (resolve, reject) => {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                let img = new Image();
                // let url = ''
                reader.onload = function (e) {
                    img.src = this.result
                }
                img.onload = function () {
                    // console.log(img.src.length)
                    // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
                    var canvas = document.createElement('canvas');
                    var context = canvas.getContext('2d');

                    // 图片原始尺寸
                    var originWidth = this.width;
                    var originHeight = this.height;

                    // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
                    var maxWidth = 400,
                        maxHeight = 500;
                    // 目标尺寸
                    var targetWidth = originWidth,
                        targetHeight = originHeight;
                    // 图片尺寸超过300x300的限制
                    if(originWidth > maxWidth || originHeight > maxHeight) {
                        if(originWidth / originHeight > maxWidth / maxHeight) {
                            // 更宽，按照宽度限定尺寸
                            targetWidth = maxWidth;
                            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                        } else {
                            targetHeight = maxHeight;
                            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                        }
                    }
                    // canvas对图片进行缩放
                    canvas.width = targetWidth;
                    canvas.height = targetHeight;
                    // 清除画布
                    context.clearRect(0, 0, targetWidth, targetHeight);
                    // 图片压缩
                    context.drawImage(img, 0, 0, targetWidth, targetHeight);
                    /*第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高*/

                    //压缩后的图片转base64 url
                    /*canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/png';
                      * qualityArgument表示导出的图片质量，只有导出为jpeg和webp格式的时候此参数才有效，默认值是0.92*/
                    var newUrl = canvas.toDataURL('image/jpeg', 0.92);//base64 格式
                    // console.log(newUrl.length)

                    resolve({
                        data: {
                            link: newUrl
                        }
                    })

                    //也可以把压缩后的图片转blob格式用于上传
                    // canvas.toBlob((blob)=>{
                    //     console.log(blob)
                    //     //把blob作为参数传给后端
                    // }, 'image/jpeg', 0.92)
                }
            }
        )
    }

    render(){
        var that = this;
        return (
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{
              background: '#fff', padding: 24, margin: 0, minHeight: 280,
            }}
            >

                <Editor
                    editorState={this.state.editorState}
                    toolbarClassName="home-toolbar"
                    wrapperClassName="home-wrapper"
                    editorClassName="home-editor"
                    onEditorStateChange={this.onEditorStateChange.bind(this)}
                    toolbar={{
                        history: { inDropdown: true },
                        inline: { inDropdown: false },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        image: {
                            urlEnabled: false,
                            uploadEnabled: true,
                            alignmentEnabled: true,   // 是否显示排列按钮 相当于text-align
                            uploadCallback: this.imageUploadCallBack,
                            previewImage: true,
                            inputAccept: 'image/*',
                            alt: {present: false, mandatory: false}
                        }
                    }}
                    onContentStateChange={(editorState)=>{

                    }}
                    placeholder="请输文章内容"
                    spellCheck
                    localization={{ locale: 'zh', translations: { 'generic.add': '添加' } }}
                />



                <textarea
                    disabled
                    value={draftToHtml(convertToRaw(that.state.editorState.getCurrentContent()))}
                />

                <div>
                    {draftToHtml(convertToRaw(that.state.editorState.getCurrentContent()))}
                </div>



            </Content>
          </Layout>
        )
    }

}
export default connect(function(state) {
  return {
    common: state.common,
    home: state.home
  };
})(Home_c);

