import InventoryActionTypes from './inventory.types';

export const addProduct = (product) => ({
    type: InventoryActionTypes.ADD_PRODUCT,
    payload: product
})

export const addProductSuccess = () => ({
    type: InventoryActionTypes.ADD_PRODUCT
})


