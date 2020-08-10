import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    UpdateInventoryContainer,
    FormContainer,
    FormInfo,
    UploadContainer
} from './update-inventory.styles';

import FormInput from '../../components/form-input/form-input.component';
import FileUpload from '../../components/file-upload/file-upload.component';

import { addProduct } from '../../redux/inventory/inventory.actions'
import {
    selectProductImages,
    selectPreviewImage
} from '../../redux/inventory/inventory.selectors';

import { storage, addCollectionAndDocuments } from '../../firebase/firebase.utils';
import { convertPlantNameToImageDir } from '../../util/utils';

import { Radio, Button } from 'antd';


const UpdateInventory = ( { productImages, previewImage }) => {
    const INITIAL_STATE = {
        plantName: '',
        isStemAvailable: false,
        light: '',
        water: '',
        humidity: '',
        isToxicToPets: '',
        other: '',
        plantPrice: '',
        plantQuantity: '',
        stemPrice: '',
        stemQuantity: ''
    }

    const [item, setItem] = useState(INITIAL_STATE);
    const [isUploading, setIsUploading] = useState(false);

    const {
        plantName,
        isStemAvailable,
        light,
        water,
        humidity,
        isToxicToPets,
        other,
        plantPrice,
        plantQuantity,
        stemPrice,
        stemQuantity
    } = item;

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setItem({
            ...item,
            [name]: value
        });
    }

    const handleSubmit = async () => {
        setIsUploading(true);
        
        const imageUrls = await uploadImages([previewImage], true);
        await uploadImages(productImages, false);
        const product = {
            name: plantName,
            isStemAvailable: isStemAvailable,
            light: light,
            water: water,
            humidity: humidity,
            isToxicToPets: isToxicToPets,
            other: other,
            image: imageUrls[0],
            plantPrice: plantPrice,
            plantQuantity: plantQuantity,
            stemPrice: stemPrice,
            stemQuantity: stemQuantity
        }
        await addCollectionAndDocuments('plants', [product]);

        setIsUploading(false);
    }

    const uploadImages = async (images, isUploadingPreviewImage) => {
        const storageRef = storage.ref();
        let imageUrls = [];
        await Promise.all(images.map(async image => {
            // only works for English names
            // TODO(qahoang): fix this
            const imageDir = convertPlantNameToImageDir(plantName);
                
            const ref = isUploadingPreviewImage ?
                    `plant-preview-images/${image.name}` :
                    `plant-images/${imageDir}/${image.name}`;
            const imageRef = storageRef.child(ref);
            const imageFile = new File([image.originFileObj], image.name, {
                type: image.type
            });
            
            const snapshot = await imageRef.put(imageFile);
            const imageUrl = await snapshot.ref.getDownloadURL();
            imageUrls.push(imageUrl);
        }));

        return imageUrls;
    }

    return (
        <div>
            <UpdateInventoryContainer>
                <FormContainer>
                    <FormInfo>
                        <form onSubmit={handleSubmit}>
                            <FormInput
                                name='plantName'
                                type='string'
                                handleChange={handleChange}
                                value={plantName}
                                label='Plant Name'
                                required
                            />
                            <FormInput
                                name='light'
                                type='string'
                                value={light}
                                handleChange={handleChange}
                                label='Light'
                                required
                            />
                            <FormInput
                                name='water'
                                type='string'
                                value={water}
                                handleChange={handleChange}
                                label='Water'
                                required
                            />
                            <FormInput
                                name='humidity'
                                type='string'
                                value={humidity}
                                handleChange={handleChange}
                                label='Humidity'
                                required
                            />
                            <FormInput
                                name='isToxicToPets'
                                type='string'
                                value={isToxicToPets}
                                handleChange={handleChange}
                                label='Is it toxic to pets'
                                required
                            />
                            <FormInput
                                name='other'
                                type='string'
                                value={other}
                                handleChange={handleChange}
                                label='Other'
                                required
                            />
                            <FormInput
                                name='plantPrice'
                                type='number'
                                value={plantPrice}
                                handleChange={handleChange}
                                label='Plant Price'
                                required
                            />
                            <FormInput
                                name='plantQuantity'
                                type='number'
                                value={plantQuantity}
                                handleChange={handleChange}
                                label='Plant Quantity'
                                required
                            />
                            <p style={{ paddingBottom: 0, marginBottom: 0 }}>
                                Are stems available for sale?
                            </p>
                            <Radio.Group 
                                onChange={handleChange}
                                defaultValue={false}
                                size="large"
                                style={{ marginBottom: '20px' }}
                                name="isStemAvailable"
                            >
                                <Radio value={true}>Yes</Radio>
                                <Radio value={false}>No</Radio>
                            </Radio.Group>
                            {isStemAvailable ? 
                                <div>
                                    <FormInput
                                        name='stemPrice'
                                        type='number'
                                        value={stemPrice}
                                        handleChange={handleChange}
                                        label='Stem Price'
                                        required
                                    />
                                    <FormInput
                                        name='stemQuantity'
                                        type='number'
                                        value={stemQuantity}
                                        handleChange={handleChange}
                                        label='Stem Quantity'
                                        required
                                    />
                                </div>
                                : ''
                            }
                            <FileUpload isPreview title="Upload Preview Image"/>
                        </form>
                    </FormInfo>
                    <UploadContainer>
                        <FileUpload isPreview={false} title="Upload Additional Images"/>
                    </UploadContainer>
                </FormContainer>
                <Button
                    type="primary"
                    onClick={handleSubmit}
                    loading={isUploading}
                    style={{ marginBottom: '50px' }}
                >
                    {isUploading ? 'Uploading' : 'Start Upload'}
                </Button>
            </UpdateInventoryContainer>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        productImages: selectProductImages(state),
        previewImage: selectPreviewImage(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (product) => dispatch(addProduct(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInventory);