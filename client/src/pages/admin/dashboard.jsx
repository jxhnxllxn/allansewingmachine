import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import useDebounce from '../../components/utils/debounce.jsx'
import Loading from '../../components/loading';
import Modal from '../../components/modal';
import MyButton from '../../components/utils/button';
import { getAllOrder, getCanceledOrder, getDashboardAdmin, getPendingOrder, getProcessedOrder, searchCharacter } from '../../redux/order/order-action';


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
                    order: []
                });
            })
        } else {
            setOrders({ ...orders, loading: true });
            dispatch(getAllOrder()).then(res => {
                setOrders({
                    orders: res.payload.data,
                    loading: false,
                    active: 'all'
                })
            })
        }
    },
        [debouncedSearchTerm]);

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
                order: []
            });
        })
    }, [])


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
                order: []
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
                order: []
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
                order: []
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
                order: []
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

    const table = () => (
        !orders.loading ?
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    {orderTableRow()}
                </tbody>

            </table>
            : <Loading />

    )

    const orderTableRow = () => (
        orders.orders.map(i => (
            <tr key={i._id}>
                <td>{i.name}</td>
                <td>{i.paymentId}</td>
                <td>{i.total}</td>
                <td>{i.createdAt}</td>
                <td>{i.status}</td>
                <td><MyButton linkTo={`/admin/order/${i._id}`} title="View" type="default" /> | <button onClick={() => openModal(i)}>Delete</button></td>
            </tr>
        ))
    )

    const handleChange = e => setQuantity(e.target.value);

    const [quantity, setQuantity] = useState(5)

    return (
        <div>
            <div className="card order_dashboard_wrapper">
                <h2>Order</h2>
                <div className="order-dashboard">
                    <div className={`${orders.active === 'pending' ? 'active' : ''} card-item`} onClick={pendingOrder}>
                        <span className="badge">{count.pending}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-clock" width="60" height="60" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <circle cx="12" cy="12" r="9" />
                            <polyline points="12 7 12 12 15 15" />
                        </svg>
                        <h3>Pending</h3>
                    </div>
                    <div className={`${orders.active === 'processed' ? 'active' : ''} card-item`} onClick={processedOrder}>
                        <span className="badge">{count.processed}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="60" height="60" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M5 12l5 5l10 -10" />
                        </svg>
                        <h3>Processed</h3>
                    </div>
                    <div className={`${orders.active === 'canceled' ? 'active' : ''} card-item`} onClick={canceledOrder}>
                        <span className="badge">{count.canceled}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="60" height="60" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        <h3>Canceled</h3>
                    </div>
                    <div className={`${orders.active === 'all' ? 'active' : ''} card-item`} onClick={allOrder}>
                        <span className="badge">{count.all}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-checks" width="60" height="60" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M7 12l5 5l10 -10" />
                            <path d="M2 12l5 5m5 -5l5 -5" />
                        </svg>
                        <h3>Total</h3>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="table_header">
                    <h2>Manage orders</h2>
                    <div className="filter_pagination">
                        <input
                            placeholder="Search Name"
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <div className="pagination">
                            <div className="item_per_page">
                                <span>Item per page </span>
                                <span className='quantity'>
                                    <input type='number' name="quantity" value={quantity} onChange={handleChange} min='5' />
                                </span>
                            </div>

                            <div className="arrows">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-bar-to-left" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <line x1="10" y1="12" x2="20" y2="12" />
                                    <line x1="10" y1="12" x2="14" y2="16" />
                                    <line x1="10" y1="12" x2="14" y2="8" />
                                    <line x1="4" y1="4" x2="4" y2="20" />
                                </svg>


                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <polyline points="15 6 9 12 15 18" />
                                </svg>

                                <span>6</span>

                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <polyline points="9 6 15 12 9 18" />
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-bar-to-right" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <line x1="14" y1="12" x2="4" y2="12" />
                                    <line x1="14" y1="12" x2="10" y2="16" />
                                    <line x1="14" y1="12" x2="10" y2="8" />
                                    <line x1="20" y1="4" x2="20" y2="20" />
                                </svg>
                            </div>



                        </div>
                    </div>
                </div>

                {table()}

                {
                    orders.orders.length <= 0 && !orders.loading ?
                        <h1>Sorry, No result.</h1>
                        : null
                }

                <Modal ref={modalRef}>

                    {modalData && <Fragment>
                        <h2>Are you sure you want to delete {modalData.name} category?</h2>
                        <br />
                        <p>This action cannot be undone. This will permanently delete the {modalData.name} category, and all product under the category.</p>
                        <br />
                        <p>Please type <b>rdg/{modalData.name}</b></p>
                        <form onSubmit={handleDeleteOrder}>
                            {/* <FormInput label="Confirm" type="text" name="confirmAction" value={confirmAction} onChange={e => onChange(e)}/> */}
                            <div className="form-ation">
                                {/* <CustomButton buttonType="danger" type="submit" disabled={Boolean(confirmAction !== `rdg/${modalData.categoryName}`)}>Delete</CustomButton> */}

                                <MyButton runAction={closeModal} type="submit" title="Cancel" value="Submit" />
                                <MyButton runAction={closeModal} type="submit" title="Cancel" value="Submit" />
                            </div>
                        </form>


                    </Fragment>}

                </Modal>

            </div>

        </div>
    )
}
export default Dashboard
