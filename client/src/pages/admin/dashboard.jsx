import React, { useEffect, useRef, useState } from 'react'
import useDebounce from '../../utils/hooks/useDebounce'
import Loading from '../../components/loading'
import Table from '../../components/table'
import Modal from '../../components/modal'
import MyButton from '../../components/button'
import {
  getAllOrder,
  getCanceledOrder,
  // getDashboardAdmin,
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
  const { loading, data, countDash, error } = ordersState

  const [modalData, setModalData] = useState(null)
  const [active, setactive] = useState('')

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
    setactive('pending')
    dispatch(getPendingOrder())
  }
  const processedOrder = () => {
    setactive('processed')
    dispatch(getProcessedOrder())
  }
  const canceledOrder = () => {
    setactive('canceled')
    dispatch(getCanceledOrder())
  }

  const allOrder = () => {
    setactive('all')
    dispatch(getAllOrder())
  }

  const handleDeleteOrder = () => {}

  const tableFormat = {
    tHead: ['Name', 'Code', 'Total', 'Date', 'Status', 'Action'],

    tData: ['name', 'code', 'totalPrice', 'createdAt', 'status', 'action'],
    link: {
      view: '/admin/order',
      delete: '',
      edit: '',
    },
  }

  const openModal = (data) => {
    setModalData(data)
    modalRef.current.openModal()
  }
  const closeModal = () => {
    modalRef.current.closeModal()
  }

  return (
    <div className='dashboard_admin card'>
      <h2 className='heading-secondary'>Order</h2>
      <div className='dashboard_admin__count'>
        <div
          className={`${active === 'pending' ? 'card' : ''} count`}
          onClick={pendingOrder}
        >
          <span className='badge'>{countDash.pending}</span>
          <ClockIcon />
          <h4>Pending</h4>
        </div>
        <div
          className={`${active === 'processed' ? 'card' : ''} count`}
          onClick={processedOrder}
        >
          <span className='badge'>{countDash.processed}</span>
          <CheckIcon />
          <h4>Processed</h4>
        </div>
        <div
          className={`${active === 'canceled' ? 'card' : ''} count`}
          onClick={canceledOrder}
        >
          <span className='badge'>{countDash.canceled}</span>
          <TimesIcon />
          <h4>Canceled</h4>
        </div>
        <div
          className={`${active === 'all' ? 'card' : ''} count`}
          onClick={allOrder}
        >
          <span className='badge'>{countDash.all}</span>
          <DobleCheckIcon />
          <h4>Total</h4>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : data.length > 0 ? (
        <Table
          tableFormat={tableFormat}
          tableData={data}
          openModal={openModal}
        />
      ) : null}

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
