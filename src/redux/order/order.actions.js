import OrderActionTypes from './order.types';

export const fetchLogistics = () => ({
    type: OrderActionTypes.FETCH_LOGISTICS
})

export const fetchAllOrdersSuccess = ( allOrders ) => ({
    type: OrderActionTypes.FETCH_ALL_ORDERS_SUCCESS,
    payload: allOrders
})

export const fetchAllOrdersFail = ( error ) => ({
    type: OrderActionTypes.FETCH_ALL_ORDERS_FAIL,
    payload: error
})

export const fetchCompletedOrdersSuccess = ( completedOrders ) => ({
    type: OrderActionTypes.FETCH_COMPLETE_ORDERS_SUCCESS,
    payload: completedOrders
})

export const fetchIncompleteOrdersSuccess = ( inCompletedOrders ) => ({
    type: OrderActionTypes.FETCH_INCOMPLETE_ORDERS_SUCCESS,
    payload: inCompletedOrders
})

export const fetchAllCustomersSuccess = ( customers ) => ({
    type: OrderActionTypes.FETCH_ALL_CUSTOMERS_SUCCESS,
    payload: customers
})

