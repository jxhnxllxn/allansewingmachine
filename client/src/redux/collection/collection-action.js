import axios from 'axios'
import { CollectionActionTypes } from './collection-constants'
import authAxios from '../../utils/helper/authAxios'

export const getCollections = () => async (dispatch) => {
  try {
    dispatch({
      type: CollectionActionTypes.COLLECTION_REQUEST,
    })

    const { data } = await axios.get('/collection')

    dispatch({
      type: CollectionActionTypes.GET_COLLECTIONS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: CollectionActionTypes.COLLECTION_FAIL,
      payload: message,
    })
  }
}

export const addCollection = (dataToSubmit) => async (dispatch) => {
  try {
    dispatch({
      type: CollectionActionTypes.COLLECTION_REQUEST,
    })

    const { data } = await authAxios.post('/collection', dataToSubmit)

    dispatch({
      type: CollectionActionTypes.POST_COLLECTION_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: CollectionActionTypes.COLLECTION_FAIL,
      payload: message,
    })
  }
}

export const deleteCollection = (dataToDelete) => async (dispatch) => {
  try {
    dispatch({
      type: CollectionActionTypes.COLLECTION_REQUEST,
    })

    const { data } = await authAxios.delete(`/collection/${dataToDelete}`)

    dispatch({
      type: CollectionActionTypes.DELETE_COLLECTION_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: CollectionActionTypes.COLLECTION_FAIL,
      payload: message,
    })
  }
}
