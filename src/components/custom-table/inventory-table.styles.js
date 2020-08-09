import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
    width: 75%;
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
        padding: 5px 10px;
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

const titleOrder = {
    "id": 0,
    "name": 1,
    "quantity": 2,
    "price": 3
}

const TableMarkup = ({ titles, data, exclude }) => {
    const displayTitles = exclude ? titles.filter(title => !exclude.includes(title)) : titles;
    displayTitles.sort((a, b) => titleOrder[a] - titleOrder[b]);

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
                    {displayTitles.map((title, index) => (
                        <th key={index}>{title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                <tr key={index}>
                    {displayTitles.map((title, index) => (
                        <td key={index}>{item[title]}</td>
                    ))}
                </tr>
                ))}
            </tbody>
        </StyledTable>
    );
};


export default ({ data, excludeColumns }) => (
    <TableMarkup titles={Object.keys(data[0])} data={data} exclude={excludeColumns}/>
);