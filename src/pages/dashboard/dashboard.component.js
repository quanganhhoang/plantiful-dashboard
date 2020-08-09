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

const Dashboard = ( { viewAllOrders, orderData, completedOrders, incompleteOrders, numCustomers, totalRevenue, totalSales }) => {
    useEffect(() => {
        viewAllOrders();
    }, [viewAllOrders]);

    const orderTable = [];
    incompleteOrders.forEach(order => {
        orderTable.push({
            Name: order.name,
            Email: order.email,
            "Phone Number": order.phoneNumber,
            "Created at": order.creationDate,
            Total: order.total,
            "Cart Items": order.cartItems
        })
    })
    console.log("ORDER TABLE: ", orderTable);
    console.log("ALL ORDERS:", orderData)
    console.log("COMPLETE ORDERS:", completedOrders);
    console.log("INCOMPLETE ORDERS:", incompleteOrders);
    console.log("NUM CUSTOMERS:", numCustomers);
    console.log("TOTAL REVENUE:", totalRevenue);
    console.log("TOTAL SALES:", totalSales);


    return (
        <div>
            <DashboardContainer>
                <TotalNumberOrderContainer>
                    All orders: {orderData.length}
                </TotalNumberOrderContainer>

                <CompleteOrderContainer>
                    Complete Orders: {completedOrders.length}
                </CompleteOrderContainer>

                <IncompleteOrderContainer>
                    Incomplete Orders: {incompleteOrders.length}
                    {orderTable.length > 0 ? <DashboardTable data={orderTable}/> : ''}
                </IncompleteOrderContainer>

                <CustomerLogisticsContainer>
                    Total number of customers: {numCustomers.length}
                </CustomerLogisticsContainer>

                <TotalRevenueContainer>
                    Total Revenue: {totalRevenue}
                </TotalRevenueContainer>
            </DashboardContainer>
        </div>
    )
}

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
        viewAllOrders: () => dispatch(fetchLogistics())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);