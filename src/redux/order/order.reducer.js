import OrderActionTypes from './order.types';

const INITIAL_STATE = {
    allOrders: [],
    completedOrders: [],
    incompleteOrders: [],
    numCustomers: 0,
    grossRevenue: 0,
    numSales: 0,
    loading: false
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OrderActionTypes.FETCH_ALL_ORDERS:
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
        default:
            return state;
    }
};

export default userReducer;