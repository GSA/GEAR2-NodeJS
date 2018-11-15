import * as types from './actionTypes';

export function loadPortfolios() {
    return {type: types.LOAD_PORTFOLIOS};
}

export const loadPortfoliosSuccess = (portfolios) => {
    return {type: types.LOAD_PORTFOLIOS_SUCCESS, portfolios: portfolios};
};

export const loadPortfoliosFailed = () => {
    return {type: types.LOAD_PORTFOLIOS_FAILURE};
};