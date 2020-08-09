import { takeLatest, put, all, call } from 'redux-saga/effects';

import OrderActionTypes from './order.types';

import {
    fetchAllOrdersSuccess,
    fetchAllOrdersFail,
    fetchCompletedOrdersSuccess,
    fetchIncompleteOrdersSuccess,
    fetchAllCustomersSuccess
} from './order.actions';

import {
    viewAllOrders
} from '../../firebase/firebase.utils';

export function* fetchLogistics() {
    try {
        const allOrders = yield viewAllOrders();
        allOrders.sort((a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime());
        const completedOrders = allOrders.filter(order => order.isCompleted);
        const inCompletedOrders = allOrders.filter(order => !order.isCompleted);

        let customers = [];
        allOrders.forEach((order) => {
            const index = customers.findIndex(x => x.name === order.name)
            if (index <= -1) {
                customers.push({
                    name: order.name,
                    email: order.email
                })
            }
        })

        yield put(fetchAllOrdersSuccess(allOrders));
        yield put(fetchCompletedOrdersSuccess(completedOrders));
        yield put(fetchIncompleteOrdersSuccess(inCompletedOrders));
        yield put(fetchAllCustomersSuccess(customers));
        
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