import { GET_PRICES_SUCCESS, GET_PRICES_FAIL } from "./actionTypes";

const initialState ={
    prices: [],
    isError: false
};
const pricesReducer = (state = initialState, action) =>{
    switch(action.type) {
        case GET_PRICES_SUCCESS:
            return {
                ...state,
                prices: action.payload
            };
        case GET_PRICES_FAIL:
            return {
                ...state,
                isError: true
            }
        default: return state
    }
}
export {pricesReducer};

