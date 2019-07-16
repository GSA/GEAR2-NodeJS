import * as types from './actionTypes';

export function loadInvestments() {
    return {type: types.LOAD_INVESTMENTS};
}

export const loadInvestmentsSuccess = (investments) => {
    return {type: types.LOAD_INVESTMENTS_SUCCESS, investments: investments};
};

export const loadInvestmentsFailed = () => {
    return {type: types.LOAD_INVESTMENTS_FAILURE};
};