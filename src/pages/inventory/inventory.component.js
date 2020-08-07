import React from 'react';
import { withRouter } from 'react-router-dom';
import { 
    InventoryPageContainer,
    UpdateInventoryButton
} from './inventory.styles';

import CustomTable from '../../components/custom-table/custom-table.styles';

const InventoryPage = ( { history }) => {
    const tableData = [
        {
            "Country Name": "Afghanistan",
            Capital: "Kabul",
            Currency: "Afghani"
        },
        {
            "Country Name": "Albania",
            Capital: "Tirane",
            Currency: "Lek"
        },
        {
            "Country Name": "Algeria",
            Capital: "Algiers",
            Currency: "Dinar"
        }
    ];

    return (
        <div>
            <InventoryPageContainer>
                <UpdateInventoryButton
                    inverted
                    onClick={() => {
                        history.push('/inventory/update')
                    }}
                >
                    Update Inventory
                </UpdateInventoryButton>
                <CustomTable data={tableData} />
            </InventoryPageContainer>
        </div>
    )
}

export default withRouter(InventoryPage);