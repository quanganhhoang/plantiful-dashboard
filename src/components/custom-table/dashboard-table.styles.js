import React, { useState } from "react";
import styled from "styled-components";
import { Button, Modal } from 'antd';
import OrderTable from './inventory-table.styles';

import {
    completeOrder,
    cancelOrder
} from '../../firebase/firebase.utils';

const StyledTable = styled.table`
    margin: 10px;
    caption-side: top;
    border: none;
    border-collapse: collapse;
    ${'' /* border-collapse: separate; */}
    ${'' /* border-spacing: 5px 10px; */}

    caption-side: bottom;
    empty-cell: show | hide;
    /* empty-cell is a property of table or the cells themselves */

    /* vertical-align: baseline | sub | super | text-top | 
                text-bottom | middle | top | bottom | 
                <percentage> | <length> */

    tbody {
        vertical-align: top;
    }

    td,
    th {
        border: none;
    }

    td {
        padding: 5px 5px;
    }

    tbody tr {
        :nth-of-type(odd) {
            background-color: #83E588;
        }
        :hover {
            background-color: lightpink;
        }
    }

    thead > tr {
        background-color: #fff;
    }

    caption {
        font-size: 0.9em;
        padding: 5px;
        font-weight: bold;
    }
`;

const TableMarkup = ( { titles, data } ) => {
    const modalVisibility = {};
    Object.keys(data).forEach(k => {
        modalVisibility[k] = false;
    })
    
    const [visible, setVisible] = useState(modalVisibility);

    const showModal = (index) => {
        setVisible({
            ...visible,
            [index]: true
        })
    }

    const handleOk = (index) => {
        setVisible({
            ...visible,
            [index]: false
        })
    };
    
    const handleCancel = (index) => {
        setVisible({
            ...visible,
            [index]: false
        })
    };

    const handleCompleteOrder = (orderId) => {
        completeOrder(orderId);
    }

    const handleCancelOrder = (orderId) => {
        cancelOrder(orderId);
    }

    const excludeColumns = "botanicalName, image, imageUrls, humidity, light, plantQuantity, stemQuantity, isToxicToPets, plantPrice, stemPrice, water, isStemAvailable, other";
    return (
        <StyledTable>
            <colgroup>
                <col />
                <col />
                <col />
            </colgroup>
            <thead>
                <tr>
                    {titles.filter(title => title !== "Cart Items").map((title, index) => (
                        <th key={index}>{title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => {
                    return (
                        <tr key={index}>
                            {titles.filter(title => title !== "Cart Items").map((title, index) => (
                                <td key={index}>{item[title]}</td>
                            ))}
                            <td>
                                <Button 
                                    onClick={() => showModal(index)}>
                                    View
                                </Button>
                                <Modal
                                    title="Order Information"
                                    width="600"
                                    visible={visible[index]}
                                    okText="Complete order"
                                    onOk={() => handleOk(index)}
                                    onCancel={() => handleCancel(index)}
                                    closeable
                                >
                                    <p>Order ID: {item["Order ID"]}</p>
                                    <p>Name: {item["Name"]}</p>
                                    <p>Email: {item["Email"]}</p>
                                    <p>Phone: {item["Phone Number"]}</p>
                                    {item["Cart Items"].length > 0 ? 
                                        <OrderTable
                                            data={item["Cart Items"]}
                                            excludeColumns={excludeColumns}
                                        /> 
                                        : 
                                        ''
                                    }                          
                                </Modal>
                            </td>
                            <td>
                                <Button
                                    onClick={() => handleCompleteOrder(item["Order ID"])}
                                >
                                    Complete
                                </Button>
                            </td>
                            <td>
                                <Button
                                    onClick={() => handleCancelOrder(item["Order ID"])}
                                >
                                    Cancel
                                </Button>
                            </td>
                        </tr>
                )})}
            </tbody>
        </StyledTable>
    )
};


export default ({ data }) => (
    <TableMarkup titles={Object.keys(data[0])} data={data} />
);