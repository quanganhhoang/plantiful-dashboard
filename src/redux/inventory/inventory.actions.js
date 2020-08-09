import InventoryActionTypes from './inventory.types';

export const addProduct = (product) => ({
    type: InventoryActionTypes.ADD_PRODUCT,
    payload: product
});

export const addProductSuccess = () => ({
    type: InventoryActionTypes.ADD_PRODUCT
});

export const updateImagesToUpload = (fileList) => ({
    type: InventoryActionTypes.UPDATE_IMAGES_TO_UPLOAD,
    payload: fileList
})


