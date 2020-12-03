import axios from 'axios'
import { CollectionActionTypes } from './collection-types'

export const getCollections = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/collection')
    dispatch({
      type: CollectionActionTypes.GET_COLLECTIONS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CollectionActionTypes.ERROR_COLLECTION,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}

export const addCollection = (dataToSubmit) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.token}`,
    },
  }

  try {
    const { data } = await axios.post('/collection', dataToSubmit, config)
    dispatch({
      type: CollectionActionTypes.ADD_COLLECTION,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CollectionActionTypes.ERROR_COLLECTION,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}

export const deleteCollection = (dataToDelete) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.token}`,
    },
  }
  try {
    const { data } = await axios.delete(`/collection/${dataToDelete}`, config)
    dispatch({
      type: CollectionActionTypes.DELETE_COLLECTION,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CollectionActionTypes.ERROR_COLLECTION,
      payload:
        error.response && error.response.data.error
          ? error.response.error
          : error.message,
    })
  }
}
