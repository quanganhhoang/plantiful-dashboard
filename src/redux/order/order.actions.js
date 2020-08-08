import OrderActionTypes from './order.types';

export const fetchAllOrders = () => ({
    type: OrderActionTypes.FETCH_ALL_ORDERS
})

export const fetchAllOrdersSuccess = ( allOrders ) => ({
    type: OrderActionTypes.FETCH_ALL_ORDERS_SUCCESS,
    payload: allOrders
})

export const fetchAllOrdersFail = ( error ) => ({
    type: OrderActionTypes.FETCH_ALL_ORDERS_FAIL,
    payload: error
})
