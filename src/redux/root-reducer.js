import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import orderReducer from './order/order.reducer';
import inventoryReducer from './inventory/inventory.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['']
};

const rootReducer = combineReducers({
    user: userReducer,
    order: orderReducer,
    inventory: inventoryReducer,
});

export default persistReducer(persistConfig, rootReducer);
