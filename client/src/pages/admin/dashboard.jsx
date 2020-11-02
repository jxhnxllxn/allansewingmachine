import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import useDebounce from '../../utils/hooks/useDebounce'
import Loading from '../../components/loading'
import CustomTable from "../../components/table"
import Modal from '../../components/modal'
import MyButton from '../../components/button'
import { getAllOrder, getCanceledOrder, getDashboardAdmin, getPendingOrder, getProcessedOrder, searchCharacter } from '../../redux/order/order-action'
import { ReactComponent as ClockIcon } from '../../assets/icons/clock.svg'
import { ReactComponent as DobleCheckIcon } from '../../assets/icons/double-check.svg'
import { ReactComponent as TimesIcon } from '../../assets/icons/times.svg'
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg'

const Dashboard = () => {
    const dispatch = useDispatch();
    const [orders, setOrders] = useState({
        orders: [],
        error: false,
        loading: true,
        active: 'all'
    });
    const [modalData, setModalData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [count, setCount] = useState({})
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);


    useEffect(() => {
        if (debouncedSearchTerm) {
            setOrders({ ...orders, loading: true });
            dispatch(searchCharacter(debouncedSearchTerm)).then(res => {
                setOrders({
                    ...orders,
                    loading: false,
                    orders: res.payload.data
                });
            }).catch(error => {
                setOrders({
                    ...orders,
                    loading: false,
                    orders: []
                });
            })
        } else {
            setOrders({ ...orders, loading: true });
            allOrder();
        }
    },
    // eslint-disable-next-line
    [dispatch,debouncedSearchTerm]);

    useEffect(() => {
        dispatch(getDashboardAdmin()).then(res => {
            setCount(res.payload.count)
        });
        dispatch(getAllOrder()).then(res => {
            setOrders({
                orders: res.payload.data,
                loading: false,
                active: 'all'
            })
        }).catch(error => {
            setOrders({
                ...orders,
                loading: false,
                orders: []
            });
        })
        
    // eslint-disable-next-line
    }, [dispatch])


    const pendingOrder = () => {
        setOrders({
            ...orders,
            loading: true
        })
        dispatch(getPendingOrder()).then(res => {
            setOrders({
                orders: res.payload.data,
                loading: false,
                active: 'pending'
            })
        }).catch(error => {
            setOrders({
                ...orders,
                loading: false,
                orders: []
            });
        })
    }
    const processedOrder = () => {
        setOrders({
            ...orders,
            loading: true
        })
        dispatch(getProcessedOrder()).then(res => {
            setOrders({
                orders: res.payload.data,
                loading: false,
                active: 'processed'
            })
        }).catch(error => {
            setOrders({
                ...orders,
                loading: false,
                orders: []
            });
        })
    }
    const canceledOrder = () => {
        setOrders({
            ...orders,
            loading: true
        })
        dispatch(getCanceledOrder()).then(res => {
            setOrders({
                orders: res.payload.data,
                loading: false,
                active: 'canceled'
            })
        }).catch(error => {
            setOrders({
                ...orders,
                loading: false,
                orders: []
            });
        })
    }

    const allOrder = () => {
        setOrders({
            ...orders,
            loading: true
        })
        dispatch(getAllOrder()).then(res => {
            setOrders({
                orders: res.payload.data,
                loading: false,
                active: 'all'
            })
        }).catch(error => {
            setOrders({
                ...orders,
                loading: false,
                orders: []
            });
        })
    }

    const modalRef = useRef();
    const openModal = (data) => {
        setModalData(data);
        modalRef.current.openModal()
    }
    const closeModal = () => {
        modalRef.current.closeModal()
    }

    const handleDeleteOrder = () => {

    }

    const tableData =  {
        tHead:['Name','Code','Total','Date','Status','Action'],
        tData:orders.orders ? orders.orders : null,
        link:{
            view:'/admin/order',
            delete:'',
            edit:''
        },
    }
    
    const handleChange = e => setQuantity(e.target.value);

    const [quantity, setQuantity] = useState(5)

    return (
        <div>
            <div className="card order_dashboard_wrapper">
                <h2>Order</h2>
                <div className="order-dashboard">
                    <div className={`${orders.active === 'pending' ? 'active' : ''} card-item`} onClick={pendingOrder}>
                        <span className="badge">{count.pending}</span>
                        <ClockIcon />
                        <h3>Pending</h3>
                    </div>
                    <div className={`${orders.active === 'processed' ? 'active' : ''} card-item`} onClick={processedOrder}>
                        <span className="badge">{count.processed}</span>
                        <CheckIcon />
                        <h3>Processed</h3>
                    </div>
                    <div className={`${orders.active === 'canceled' ? 'active' : ''} card-item`} onClick={canceledOrder}>
                        <span className="badge">{count.canceled}</span>
                        <TimesIcon />
                        <h3>Canceled</h3>
                    </div>
                    <div className={`${orders.active === 'all' ? 'active' : ''} card-item`} onClick={allOrder}>
                        <span className="badge">{count.all}</span>
                        <DobleCheckIcon />
                        <h3>Total</h3>
                    </div>
                </div>
            </div>

            <div className="card">
                
                {
                    orders.loading ? 
                        <Loading />
                        :
                        <CustomTable tableData={tableData} openModal={openModal} setSearchTerm={setSearchTerm}/>
                }
                
                <Modal ref={modalRef}>
                    {modalData && <>
                        <h2>Are you sure you want to delete {modalData.name} category?</h2>
                        <br />
                        <p>This action cannot be undone. This will permanently delete the {modalData.name} category, and all product under the category.</p>
                        <br />
                        <p>Please type <b>rdg/{modalData.name}</b></p>
                        <form onSubmit={handleDeleteOrder}>
                            {/* <FormInput label="Confirm" type="text" name="confirmAction" value={confirmAction} onChange={e => onChange(e)}/> */}
                            <div className="form-ation">
                                {/* <CustomButton buttonType="danger" type="submit" disabled={Boolean(confirmAction !== `rdg/${modalData.categoryName}`)}>Delete<Button> */}

                                <MyButton runAction={closeModal} type="submit" title="Cancel" value="Submit" />
                                <MyButton runAction={closeModal} type="submit" title="Cancel" value="Submit" />
                            </div>
                        </form>
                    </>}
                </Modal>

            </div>

        </div>
    )
}
export default Dashboard
