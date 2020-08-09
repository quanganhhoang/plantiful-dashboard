import OrderActionTypes from './order.types';

const INITIAL_STATE = {
    allOrders: [],
    completedOrders: [],
    incompleteOrders: [],
    customers: 0,
    totalRevenue: 0,
    totalSales: 0,
    loading: false
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OrderActionTypes.FETCH_LOGISTICS:
            return {
                ...state,
                loading: true
            }
        case OrderActionTypes.FETCH_ALL_ORDERS_SUCCESS:
            return {
                ...state,
                allOrders: action.payload,
                loading: false
            }
        case OrderActionTypes.FETCH_COMPLETE_ORDERS_SUCCESS:
            return {
                ...state,
                completedOrders: action.payload,
                loading: false
            }
        case OrderActionTypes.FETCH_INCOMPLETE_ORDERS_SUCCESS:
            return {
                ...state,
                incompleteOrders: action.payload,
                loading: false
            }
        case OrderActionTypes.FETCH_ALL_CUSTOMERS_SUCCESS:
            return {
                ...state,
                customers: action.payload,
                loading: false
            }
        default:
            return state;
    }
};

export default userReducer;