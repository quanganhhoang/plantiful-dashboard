import styled from 'styled-components';

export const UpdateInventoryContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const FormContainer = styled.div`
    display: grid;
`;

export const FormInfo = styled.div`
    grid-column-start: 1;
    grid-column-end: 5;
`;

export const UploadContainer = styled.div`
    grid-column-start: 6;
    grid-column-end: 8;
    display: inline-block;
    max-width: 400px;
`;
