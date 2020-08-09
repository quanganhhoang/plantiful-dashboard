import InventoryActionTypes from './inventory.types';

const INITIAL_STATE = {
    productToAdd: null
};

const inventoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case InventoryActionTypes.ADD_PRODUCT:
            return {
                ...state,
                productToAdd: action.payload
            }
        case InventoryActionTypes.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                productToAdd: null
            }
        default:
            return state;
    }
};

export default inventoryReducer;