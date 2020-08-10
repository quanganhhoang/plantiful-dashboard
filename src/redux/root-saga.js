import { all, call } from 'redux-saga/effects';

import userSagas from './user/user.sagas';
import orderSagas from './order/order.sagas';
// import inventorySagas from './inventory/inventory.sagas';

export default function* rootSaga() {
    yield all([
        call(userSagas), 
        call(orderSagas),
        // call(inventorySagas),
    ]);
}
