import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import {
    UploadTitle,
} from './file-upload.styles';

import {
    updateImagesToUpload
} from '../../redux/inventory/inventory.actions';


const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const FileUpload = ( { updateImagesToUpload } ) => {
    const INITIAL_STATE = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
    };

    const [preview, setPreview] = useState(INITIAL_STATE);
 
    const handleCancel = () => {
        setPreview({
            ...preview,
            previewVisible: false 
        });
    }

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreview({
            ...preview,
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    const handleChange = ({ fileList }) => {
        setPreview({
            ...preview,
            fileList
        });

        updateImagesToUpload(fileList);
    }

    const { previewVisible, previewImage, fileList, previewTitle } = preview;
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className="ant-upload-text">Upload</div>
        </div>
    );
        
    return (
        <div>
            <UploadTitle>Upload Plant Images</UploadTitle>
            <Upload
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                accept=".png,.jpeg,.jpg"
                multiple
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={() => false}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateImagesToUpload: (fileList) => dispatch(updateImagesToUpload(fileList))
    }
}

export default connect(null, mapDispatchToProps)(FileUpload);

