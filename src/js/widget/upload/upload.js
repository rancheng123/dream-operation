import React, {Component, PropTypes} from 'react';
import { Upload, Icon, Modal } from 'antd';

class PicturesWall extends Component {
    constructor() {
        super();

        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
        };

    }



    handleCancel() {
        this.setState({ previewVisible: false })
    }

    handlePreview (file) {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange ({ file, fileList }) {


        //删除图片
        if(file.status == 'removed'){
            this.setState({ fileList });
            return
        }

        if(file.status == 'error'){
            alert('上传图片失败')
        }
        else if(file.status == 'done'){
            alert('上传图片成功')
        }

        if(file.response.status == 'success'){
            this.setState({ fileList })
        }
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="//jsonplaceholder.typicode.com/posts22222222/"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    directory={false}

                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

export default PicturesWall