import * as types from './actionTypes';

export function loadPortfolios() {
    return {type: types.LOAD_PORTFOLIOS};
}

export const loadPortfoliosSuccess = (porfolios) => {
    return {type: types.LOAD_PORTFOLIOS_SUCCESS, porfolios: porfolios};
};

export const loadPortfoliosFailed = () => {
    return {type: types.LOAD_PORTFOLIOS_FAILURE};
};