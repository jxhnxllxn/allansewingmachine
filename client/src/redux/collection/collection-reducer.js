import { CollectionActionTypes } from "./collection-types";

const initialState = {
    loading:true,
    collections:[],
}

export default function(state = initialState, action){
    const {type,payload} = action;
    switch (type) {
        case CollectionActionTypes.GET_COLLECTIONS:
            return {
                ...state,
                collections:payload.data,
                loading:false
            }
        case CollectionActionTypes.ADD_COLLECTION:
            return {
                ...state,
                collections:[...state.collections, payload.data],
                loading:false
            }
        case CollectionActionTypes.DELETE_COLLECTION:
            return {
                ...state,
                collections: state.collections.filter(collection => collection._id !== payload.data._id),
                loading:false
            }
        case CollectionActionTypes.ERROR_COLLECTION:
            return {
                loading:false,
                error: payload
            }
        default:
            return state
    }
}