import { GET_PRICES_SUCCESS, GET_PRICES_FAIL } from "./actionTypes";

export const getPricesSuccess = (data) => ({
    type: GET_PRICES_SUCCESS,
    payload: data
})

export const getPricesFail = () => ({
    type: GET_PRICES_FAIL,
    payload: {isError: true}
})