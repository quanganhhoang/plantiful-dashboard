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

export const fetchTotalRevenueSuccess = ( totalRevenue ) => ({
    type: OrderActionTypes.FETCH_TOTAL_REVENUE_SUCCESS,
    payload: totalRevenue
})

export const completeOrder = (orderId) => ({
    type: OrderActionTypes.COMPLETE_ORDER,
    payload: orderId
})

export const cancelOrder = (orderId) => ({
    type: OrderActionTypes.CANCEL_ORDER,
    payload: orderId
})

