import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    DashboardContainer,
    TotalNumberOrderContainer,
    CompleteOrderContainer,
    IncompleteOrderContainer,
    CustomerLogisticsContainer,
    TotalRevenueContainer,
} from './dashboard.styles';

import {
    fetchLogistics
} from '../../redux/order/order.actions'

import { 
    selectAllOrders,
    selectCompletedOrders,
    selectIncompleteOrders,
    selectCustomers,
    selectTotalRevenue,
    selectTotalSales
 } from '../../redux/order/order.selectors';

import DashboardTable from '../../components/custom-table/dashboard-table.styles';

const Dashboard = React.memo(( { fetchLogistics, orderData, completedOrders, incompleteOrders, numCustomers, totalRevenue }, nextProps) => {
    useEffect(() => {
        fetchLogistics();
    }, [fetchLogistics]);

    const orderTable = [];
    incompleteOrders.forEach(order => {
        orderTable.push({
            "Order ID": order.id,
            Name: order.name,
            Email: order.email,
            "Phone Number": order.phoneNumber,
            "Created at": order.creationDate,
            Total: order.total,
            "Cart Items": order.cartItems
        })
    })

    return (
        <div>
            <DashboardContainer>
                <TotalNumberOrderContainer>
                    All orders: {orderData.length}
                </TotalNumberOrderContainer>

                <CompleteOrderContainer>
                    Complete orders: {completedOrders.length}
                </CompleteOrderContainer>

                <IncompleteOrderContainer>
                    Incomplete orders: {incompleteOrders.length}
                    {orderTable.length > 0 ? <DashboardTable data={orderTable}/> : ''}
                </IncompleteOrderContainer>

                <CustomerLogisticsContainer>
                    Total number of customers: {numCustomers.length}
                </CustomerLogisticsContainer>

                <TotalRevenueContainer>
                    Total revenue: {totalRevenue}
                </TotalRevenueContainer>
            </DashboardContainer>
        </div>
    )
})

const mapStateToProps = (state, ownProps) => {
    return {
        orderData: selectAllOrders(state),
        completedOrders: selectCompletedOrders(state),
        incompleteOrders: selectIncompleteOrders(state),
        numCustomers: selectCustomers(state),
        totalRevenue: selectTotalRevenue(state),
        totalSales: selectTotalSales(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLogistics: () => dispatch(fetchLogistics())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);