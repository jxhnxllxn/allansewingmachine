import React, { useEffect, useRef, useState } from 'react'
import useDebounce from '../../utils/hooks/useDebounce'
import Loading from '../../components/loading'
import CustomTable from '../../components/table'
import Modal from '../../components/modal'
import MyButton from '../../components/button'
import {
  getAllOrder,
  getCanceledOrder,
  getDashboardAdmin,
  getPendingOrder,
  getProcessedOrder,
  searchCharacter,
} from '../../redux/order/order-action'

import { ReactComponent as ClockIcon } from '../../assets/icons/clock.svg'
import { ReactComponent as DobleCheckIcon } from '../../assets/icons/double-check.svg'
import { ReactComponent as TimesIcon } from '../../assets/icons/times.svg'
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg'
import { useDispatch, useSelector } from 'react-redux'

const Dashboard = () => {
  const dispatch = useDispatch()
  const modalRef = useRef()

  const ordersState = useSelector(({ order }) => order)
  const { loading, orders, countDash, error } = ordersState

  const [quantity, setQuantity] = useState(5)

  const [modalData, setModalData] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')

  const debouncedSearchTerm = useDebounce(searchTerm, 1000)

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        dispatch(searchCharacter(debouncedSearchTerm))
      }
    },
    // eslint-disable-next-line
    [debouncedSearchTerm]
  )

  const pendingOrder = () => {
    dispatch(getPendingOrder())
  }
  const processedOrder = () => {
    dispatch(getProcessedOrder())
  }
  const canceledOrder = () => {
    dispatch(getCanceledOrder())
  }

  const allOrder = () => {
    dispatch(getAllOrder())
  }

  const handleDeleteOrder = () => {}

  const tableFormat = {
    tHead: ['Name', 'Code', 'Total', 'Date', 'Status', 'Action'],
    link: {
      view: '/admin/order',
      delete: '',
      edit: '',
    },
  }

  const handleChange = (e) => setQuantity(e.target.value)

  const openModal = (data) => {
    setModalData(data)
    modalRef.current.openModal()
  }
  const closeModal = () => {
    modalRef.current.closeModal()
  }

  return (
    <div className='dashboard_admin'>
      <h2 className='heading-secondary'>Order</h2>
      <div className='dashboard_admin__count'>
        <div
          className={`${orders.active === 'pending' ? 'active' : ''} count`}
          onClick={pendingOrder}
        >
          <span className='badge'>{countDash.pending}</span>
          <ClockIcon />
          <h4>Pending</h4>
        </div>
        <div
          className={`${orders.active === 'processed' ? 'active' : ''} count`}
          onClick={processedOrder}
        >
          <span className='badge'>{countDash.processed}</span>
          <CheckIcon />
          <h4>Processed</h4>
        </div>
        <div
          className={`${orders.active === 'canceled' ? 'active' : ''} count`}
          onClick={canceledOrder}
        >
          <span className='badge'>{countDash.canceled}</span>
          <TimesIcon />
          <h4>Canceled</h4>
        </div>
        <div
          className={`${orders.active === 'all' ? 'active' : ''} count`}
          onClick={allOrder}
        >
          <span className='badge'>{countDash.all}</span>
          <DobleCheckIcon />
          <h4>Total</h4>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <CustomTable
          tableFormat={tableFormat}
          tableData={orders}
          openModal={openModal}
          setSearchTerm={setSearchTerm}
        />
      )}

      <Modal ref={modalRef}>
        {modalData && (
          <>
            <h2>Are you sure you want to delete {modalData.name} category?</h2>
            <br />
            <p>
              This action cannot be undone. This will permanently delete the{' '}
              {modalData.name} category, and all product under the category.
            </p>
            <br />
            <p>
              Please type <b>rdg/{modalData.name}</b>
            </p>
            <form onSubmit={handleDeleteOrder}>
              {/* <FormInput label="Confirm" type="text" name="confirmAction" value={confirmAction} onChange={e => onChange(e)}/> */}
              <div className='form-ation'>
                {/* <CustomButton buttonType="danger" type="submit" disabled={Boolean(confirmAction !== `rdg/${modalData.categoryName}`)}>Delete<Button> */}

                <MyButton
                  runAction={closeModal}
                  type='submit'
                  title='Cancel'
                  value='Submit'
                />
                <MyButton
                  runAction={closeModal}
                  type='submit'
                  title='Cancel'
                  value='Submit'
                />
              </div>
            </form>
          </>
        )}
      </Modal>
    </div>
  )
}
export default Dashboard
