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

const UpdateInventory = ( { addProduct }) => {
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
        addProduct(product);
        setIsUploading(false);
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

const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (product) => dispatch(addProduct(product))
    }
}

export default connect(null, mapDispatchToProps)(UpdateInventory);