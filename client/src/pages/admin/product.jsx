import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getProductsToShop,
  deleteProduct,
} from '../../redux/product/product-action'
import Loading from '../../components/loading'
import Modal from '../../components/modal'
import { withRouter } from 'react-router-dom'
import MyButton from '../../components/button'

const Product = (props) => {
  const productState = useSelector(({ product }) => product)
  const { products, loading } = productState
  const dispatch = useDispatch()

  const [modalData, setModalData] = useState(null)

  const [data] = useState({
    searchInput: '',
    confirmAction: '',
  })

  const { confirmAction } = data

  useEffect(() => {
    dispatch(getProductsToShop())
  }, [dispatch])

  // const onChange = e => setData({...data,[e.target.name]:e.target.value});

  const modalRef = useRef()
  const openModal = (data) => {
    setModalData(data)
    modalRef.current.openModal()
  }
  const closeModal = () => {
    modalRef.current.closeModal()
  }
  const renderImage = (images) => {
    if (images.length > 0) {
      return images[0].url
    } else {
      return '/images/slide2.jpg'
    }
  }

  const productData = products && !loading ? products : []

  const tableData = productData.map((col) => (
    <tr key={col._id}>
      <td>{col.name}</td>
      <td>
        <img
          className='collectionPhoto'
          src={`${renderImage(col.images)}`}
          alt='product_image'
        />
      </td>
      <td>{col.collections.name}</td>
      <td>{col.category.name}</td>
      <td>{col.price}</td>
      <td>{col.collections.name}</td>
      <td>
        view | <button onClick={() => openModal(col)}>Delete</button>
      </td>
    </tr>
  ))

  const handleDeleteProduct = async (e) => {
    e.preventDefault()
    dispatch(deleteProduct(modalData._id))
    modalRef.current.closeModal()
  }

  return (
    <div className='product-wrapper-admin'>
      <div className='table-header'>
        <h3>Manage products</h3>
        {/* <FormField
                    id={'unit'}
                    
                /> */}
        {/* <FormInput type="text" name="search" value={searchInput} onChange={e => onChange(e)} label="Search" /> */}
      </div>
      <div className='floatRight'>
        <MyButton
          onClick={() => props.history.push(`${props.match.url}/add`)}
          type='submit'
          title='Add product'
        />
      </div>
      {!loading ? (
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Collection</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

            {tableData}
          </tbody>

          <Modal ref={modalRef}>
            {modalData && (
              <>
                <h2>
                  Are you sure you want to delete {modalData.name} product?
                </h2>
                <br />
                <p>
                  This action cannot be undone. This will permanently delete the{' '}
                  {modalData.name} product.
                </p>
                <br />
                <p>
                  Please type <b>rdg/{modalData.name}</b>
                </p>
                <form onSubmit={handleDeleteProduct}>
                  {/* <FormInput label="Confirm" type="text" name="confirmAction" value={confirmAction} onChange={e => onChange(e)}/> */}
                  <div className='form-ation'>
                    {/* <CustomButton buttonType="danger" type="submit" disabled={Boolean(confirmAction !== `rdg/${modalData.name}`)}>Delete<Button>
                                    <CustomButton buttonType="default" onClick={closeModal}>Cancel<Button> */}
                  </div>
                </form>
              </>
            )}
          </Modal>
        </table>
      ) : (
        <Loading></Loading>
      )}
    </div>
  )
}

export default withRouter(Product)
