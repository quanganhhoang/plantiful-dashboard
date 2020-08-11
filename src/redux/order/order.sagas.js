import { takeLatest, put, all, call } from 'redux-saga/effects';

import OrderActionTypes from './order.types';

import {
    fetchAllOrdersSuccess,
    fetchAllOrdersFail,
    fetchCompletedOrdersSuccess,
    fetchIncompleteOrdersSuccess,
    fetchAllCustomersSuccess,
    fetchTotalRevenueSuccess
} from './order.actions';

import {
    viewAllOrders
} from '../../firebase/firebase.utils';

export function* fetchLogistics() {
    try {
        const allOrders = yield viewAllOrders();
        allOrders.sort((a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime());
        const completedOrders = allOrders.filter(order => order.isCompleted);
        console.log("COMPLETE", completedOrders);
        const inCompletedOrders = allOrders.filter(order => !order.isCompleted);

        let customers = [], totalRevenue = 0;
        allOrders.forEach((order) => {
            // calc total revenue
            if (order.isCompleted) totalRevenue += order.total;
            // find total number of unique customers
            const index = customers.findIndex(x => x.name === order.name);
            if (index <= -1) {
                customers.push({
                    name: order.name,
                    email: order.email
                });
            }
        })

        yield put(fetchAllOrdersSuccess(allOrders));
        yield put(fetchCompletedOrdersSuccess(completedOrders));
        yield put(fetchIncompleteOrdersSuccess(inCompletedOrders));
        yield put(fetchAllCustomersSuccess(customers));
        yield put(fetchTotalRevenueSuccess(totalRevenue));
        
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

export function* onUpdateOrder() {
    yield takeLatest(
        [OrderActionTypes.COMPLETE_ORDER, OrderActionTypes.CANCEL_ORDER],
        fetchLogistics
    )
}

export default function* orderSagas() {
    yield all([
        call(onFetchLogistics),
        call(onUpdateOrder)
    ]);
}