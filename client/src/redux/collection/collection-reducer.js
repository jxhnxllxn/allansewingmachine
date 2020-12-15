import { CollectionActionTypes } from './collection-constants'

const initialState = {
  loading: true,
  collections: [],
}

export default function collectionReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case CollectionActionTypes.COLLECTION_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CollectionActionTypes.GET_COLLECTIONS_SUCCESS:
      return {
        ...state,
        collections: payload.data,
        loading: false,
      }
    case CollectionActionTypes.POST_COLLECTION_SUCCESS:
      return {
        ...state,
        collections: [...state.collections, payload.data],
        loading: false,
      }
    case CollectionActionTypes.DELETE_COLLECTION_SUCCESS:
      return {
        ...state,
        collections: state.collections.filter(
          (collection) => collection._id !== payload.data._id
        ),
        loading: false,
      }
    case CollectionActionTypes.COLLECTION_FAIL:
      return {
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
