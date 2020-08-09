import { takeLatest, put, all, call } from 'redux-saga/effects';

import OrderActionTypes from './order.types';

import {
    fetchAllOrdersSuccess,
    fetchAllOrdersFail,
    fetchCompletedOrdersSuccess,
    fetchIncompleteOrdersSuccess
} from './order.actions';

import {
    viewAllOrders
} from '../../firebase/firebase.utils';

export function* fetchLogistics() {
    try {
        const allOrders = yield viewAllOrders();
        const completedOrders = allOrders.filter(order => order.isCompleted);
        const inCompletedOrders = allOrders.filter(order => !order.isCompleted);

        yield put(fetchAllOrdersSuccess(allOrders));
        yield put(fetchCompletedOrdersSuccess(completedOrders));
        yield put(fetchIncompleteOrdersSuccess(inCompletedOrders));
        
    } catch (error) {
        yield put(fetchAllOrdersFail(error));
    }
}

export function* onFetchLogistics() {
    yield takeLatest(
        OrderActionTypes.FETCH_LOGISTICS, 
        fetchLogistics
    );
}

export default function* orderSagas() {
    yield all([
        call(onFetchLogistics),
    ]);
}