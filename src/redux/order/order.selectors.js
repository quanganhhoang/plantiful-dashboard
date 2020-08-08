import { createSelector } from 'reselect';

const selectOrder = state => state.order;

export const selectAllOrders = createSelector(
    [selectOrder],
    order => order.allOrders
);
