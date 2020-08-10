import { createSelector } from 'reselect';

const selectInventory = state => state.inventory;

export const selectProductToAdd = createSelector(
    [selectInventory],
    inventory => inventory.productToAdd
);

export const selectProductImages = createSelector(
    [selectInventory],
    inventory => inventory.productImages
);

export const selectPreviewImage = createSelector(
    [selectInventory],
    inventory => inventory.previewImage
);