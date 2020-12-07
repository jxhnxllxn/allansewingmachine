import axios from 'axios'
import { CollectionActionTypes } from './collection-constants'

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

export const addCollection = (dataToSubmit) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CollectionActionTypes.COLLECTION_REQUEST,
    })

    const {
      userLogin: { token },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.post('/collection', dataToSubmit, config)

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

export const deleteCollection = (dataToDelete) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: CollectionActionTypes.COLLECTION_REQUEST,
    })

    const {
      userLogin: { token },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.delete(`/collection/${dataToDelete}`, config)

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
