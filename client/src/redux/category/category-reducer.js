import { CategoryActionTypes } from "./category-types";

const initialState = {
    loading:true,
    categories:[],
}

export default function(state = initialState, action){
    const {type,payload} = action;
    switch (type) {
        case CategoryActionTypes.GET_CATEGORIES:
            return {
                ...state,
                categories:payload.data,
                loading:false
            }
        case CategoryActionTypes.ADD_CATEGORY:
            return {
                ...state,
                categories:[...state.categories, payload.data],
                loading:false
            }
        case CategoryActionTypes.ADD_FAIL:
            return {
                ...state,
                ...payload,
                loading:false
            }
        case CategoryActionTypes.DELETE:
            return {
                ...state,
                categories: state.categories.filter(collection => collection._id !== payload.data._id),
                loading:false
            }
        default:
            return state
    }
}