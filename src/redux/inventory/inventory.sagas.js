import { takeLatest, put, all, call } from 'redux-saga/effects';

import InventoryActionTypes from './inventory.types';

import {

} from './inventory.actions';

import {
    addCollectionAndDocuments
} from '../../firebase/firebase.utils';

export function* addProduct(product) {
    try {
        yield console.log(product)
    } catch (error) {
        
    }
}

export function* onAddProduct() {
    yield takeLatest(
        InventoryActionTypes.ADD_PRODUCT,
        addProduct
    );
}

export default function* inventorySagas() {
    yield all([
        call(onAddProduct),
    ]);
}