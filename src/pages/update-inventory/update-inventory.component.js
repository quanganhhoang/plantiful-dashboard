import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    UpdateInventoryContainer,
    FormContainer,
    FormInfo,
    UploadContainer
} from './update-inventory.styles';

import { Button } from 'antd';

import FormInput from '../../components/form-input/form-input.component';
import FileUpload from '../../components/file-upload/file-upload.component';

import { addProduct } from '../../redux/inventory/inventory.actions'
import {
    selectProductImages
} from '../../redux/inventory/inventory.selectors';

import { storage, addCollectionAndDocuments } from '../../firebase/firebase.utils';

import { Radio } from 'antd';


const UpdateInventory = ( { productImages }) => {
    const INITIAL_STATE = {
        plantName: '',
        isStemAvailable: false,
        light: '',
        water: '',
        humidity: '',
        isToxicToPets: '',
        other: '',
        image: '',
        plantPrice: '',
        stemPrice: ''
    }

    const [item, setItem] = useState(INITIAL_STATE);
    const [isUploading, setIsUploading] = useState(false);

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
        const product = {
            name: plantName,
            isStemAvailable: isStemAvailable,
            light: light,
            water: water,
            humidity: humidity,
            isToxicToPets: isToxicToPets,
            other: other,
            image: image,
            plantPrice: plantPrice,
            stemPrice: stemPrice
        }

        
        await uploadImages(productImages);
        await addCollectionAndDocuments('plants', [product]);
        setIsUploading(false);
    }

    const uploadImages = async (images) => {
        const storageRef = storage.ref();
        images.forEach(async image => {
            const imageFolder = plantName.toLowerCase().split(' ').join('');
            const imageRef = storageRef.child(`plant-images/${imageFolder}/${image.name}`)
            const imageFile = new File([image.originFileObj], image.name, {
                type: image.type
            });
            
            const snapshot = await imageRef.put(imageFile);
        })
    }

    const {
        plantName,
        isStemAvailable,
        light,
        water,
        humidity,
        isToxicToPets,
        other,
        image,
        plantPrice,
        stemPrice
    } = item;

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
                                name='image'
                                type='url'
                                value={image}
                                handleChange={handleChange}
                                label='Image'
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
                                <FormInput
                                    name='stemPrice'
                                    type='number'
                                    value={stemPrice}
                                    handleChange={handleChange}
                                    label='Stem Price'
                                    required
                                />
                                : ''
                            }
                        </form>
                    </FormInfo>
                    <UploadContainer>
                        <FileUpload />
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
        productImages: selectProductImages(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (product) => dispatch(addProduct(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInventory);