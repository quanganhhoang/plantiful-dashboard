import InventoryActionTypes from './inventory.types';

const INITIAL_STATE = {
    productToAdd: null,
    productImages: []
};

const inventoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case InventoryActionTypes.ADD_PRODUCT:
            return {
                ...state,
                productToAdd: action.payload
            };
        case InventoryActionTypes.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                productToAdd: null
            };
        case InventoryActionTypes.UPDATE_IMAGES_TO_UPLOAD:
            return {
                ...state,
                productImages: action.payload
            };
        default:
            return state;
    }
};

export default inventoryReducer;