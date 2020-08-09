import React, { useState } from "react";
import styled from "styled-components";
import { Button, Modal } from 'antd';
import OrderTable from './inventory-table.styles';

const StyledTable = styled.table`
    caption-side: top;
    border: none;
    border-collapse: collapse;
    ${'' /* border-collapse: separate; */}
    ${'' /* border-spacing: 5px 10px; */}

    caption-side: bottom;
    ${'' /* empty-cell: show | hide; */}
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

const TableMarkup = ({ titles, data }) => {
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    }

    const handleOk = e => {
        setVisible(false);
      };
    
    const handleCancel = e => {
        setVisible(false);
    };

    return (
        <StyledTable>
            <caption>Plant Inventory</caption>
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
                                <Button onClick={showModal}>
                                    View
                                </Button>
                                <Modal
                                    title="Order Information"
                                    width="600"
                                    visible={visible}
                                    okText="Complete"
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                >
                                    <p>Name: {item["Name"]}</p>
                                    <p>Email: {item["Email"]}</p>
                                    <p>Phone: {item["Phone Number"]}</p>
                                    {item["Cart Items"].length > 0 ? 
                                        <OrderTable
                                            data={item["Cart Items"]}
                                            excludeColumns="imageUrl"    
                                        /> 
                                        : 
                                        ''
                                    }                          
                                </Modal>
                            </td>
                            <td>
                                <Button
                                    onClick={() => {
                                        console.log(index);
                                    }}
                                >
                                    Complete
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