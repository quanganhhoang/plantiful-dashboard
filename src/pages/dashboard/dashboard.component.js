import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    DashboardContainer,
    TotalNumberOrderContainer,
    CompleteOrderContainer,
    IncompleteOrderContainer,
    CustomerLogisticsContainer,
    SaleContainer,
} from './dashboard.styles';

import {
    fetchAllOrders
} from '../../redux/order/order.actions'

import { selectAllOrders } from '../../redux/order/order.selectors';

const Dashboard = ( { viewAllOrders, orderData }) => {
    useEffect(() => {
        viewAllOrders();
    }, [viewAllOrders]);

    return (
        <div>
            <DashboardContainer>
                <TotalNumberOrderContainer>
                    TotalNumberOrderContainer: {orderData.length}
                </TotalNumberOrderContainer>

                <CompleteOrderContainer>
                    CompleteOrderContainer
                </CompleteOrderContainer>

                <IncompleteOrderContainer>
                    IncompleteOrderContainer
                </IncompleteOrderContainer>

                <CustomerLogisticsContainer>
                    CustomerLogisticsContainer
                </CustomerLogisticsContainer>

                <SaleContainer>
                    SaleContainer
                </SaleContainer>
            </DashboardContainer>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        orderData: selectAllOrders(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        viewAllOrders: () => dispatch(fetchAllOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);