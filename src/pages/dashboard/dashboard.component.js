import React from 'react'
import {
    DashboardContainer,
    TotalNumberOrderContainer,
    CompleteOrderContainer,
    IncompleteOrderContainer,
    CustomerLogisticsContainer,
    SaleContainer,
} from './dashboard.styles';

const Dashboard = () => {
    return (
        <div>
            <DashboardContainer>
                <TotalNumberOrderContainer>
                    TotalNumberOrderContainer
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

export default Dashboard;