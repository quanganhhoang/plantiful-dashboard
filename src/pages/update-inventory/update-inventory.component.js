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

import { storage } from '../../firebase/firebase.utils';


const UpdateInventory = ( { productImages, addProduct }) => {
    const INITIAL_STATE = {
        plantName: '',
        light: '',
        water: '',
        humidity: '',
        isToxicToPets: '',
        other: ''
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

    const handleSubmit = () => {
        setIsUploading(true);
        const product = {
            name: plantName,
            light: light,
            water: water,
            humidity: humidity,
            isToxicToPets: isToxicToPets,
            other: other
        }
        uploadImages(productImages);
        setIsUploading(false);
    }

    const uploadImages = async (images) => {
        const storageRef = storage.ref();
        images.forEach(async image => {
            console.log("image", image);
            const imageFolder = plantName.toLowerCase().split(' ').join('');
            const imageRef = storageRef.child(`plant-images/${imageFolder}/${image.name}`)
            const imageFile = new File([image], image.name, {
                type: image.type
            });
            
            const snapshot = await imageRef.put(imageFile);
            console.log("snapshot", snapshot);
        })
    }

    const {
        plantName,
        light,
        water,
        humidity,
        isToxicToPets,
        other
    } = item;

    return (
        <div>
            <UpdateInventoryContainer>
                <FormContainer>
                    <FormInfo>
                        <form onSubmit={handleSubmit}>
                            <FormInput
                                name='plantName'
                                type='plantName'
                                handleChange={handleChange}
                                value={plantName}
                                label='Plant Name'
                                required
                            />
                            <FormInput
                                name='light'
                                type='light'
                                value={light}
                                handleChange={handleChange}
                                label='Light'
                                required
                            />
                            <FormInput
                                name='water'
                                type='water'
                                value={water}
                                handleChange={handleChange}
                                label='Water'
                                required
                            />
                            <FormInput
                                name='humidity'
                                type='humidity'
                                value={humidity}
                                handleChange={handleChange}
                                label='Humidity'
                                required
                            />
                            <FormInput
                                name='isToxicToPets'
                                type='isToxicToPets'
                                value={isToxicToPets}
                                handleChange={handleChange}
                                label='Is it toxic to pets'
                                required
                            />
                            <FormInput
                                name='other'
                                type='other'
                                value={other}
                                handleChange={handleChange}
                                label='Other'
                                required
                            />
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