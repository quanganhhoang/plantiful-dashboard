import { takeLatest, put, all, call } from 'redux-saga/effects';

import OrderActionTypes from './order.types';

import {
    fetchAllOrdersSuccess,
    fetchAllOrdersFail
} from './order.actions';

import {
    viewAllOrders
} from '../../firebase/firebase.utils';

export function* fetchAllOrders() {
    try {
        const allOrders = yield viewAllOrders();
        
        yield put(fetchAllOrdersSuccess(allOrders));
    } catch (error) {
        yield put(fetchAllOrdersFail(error));
    }
}

export function* onFetchAllOrders() {
    yield takeLatest(OrderActionTypes.FETCH_ALL_ORDERS, fetchAllOrders);
}

export default function* orderSagas() {
    yield all([
        call(onFetchAllOrders),
    ]);
}