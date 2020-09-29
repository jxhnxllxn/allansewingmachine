import React from 'react'
import { useState } from 'react';
import useDebounce from '../debounce'

const FilterPagination = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    const [dataFilter, setDataFilter] = useState({
        page:1,
        limit:5,
    })

    useEffect(() => {
        if (debouncedSearchTerm) {
          setOrders({...orders,loading:true});
          dispatch(searchCharacter(debouncedSearchTerm)).then(res => {
            setOrders({
                ...orders,
                loading:false,
                orders:res.payload.data
            });
          });

        } else {
            setOrders({...orders,loading:true});
            dispatch(getAllOrder()).then(res=> {
                setOrders({
                    orders:res.payload.data,
                    loading:false,
                    active:'all'
                })
            })
        }
      },
    [debouncedSearchTerm]);


    
    const submitFilter = (payment) => {
        props.filterData(payment)
    }
    

    
    return (
        <div className="filter_pagination_wrapper">
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
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-bar-to-left" width="36" height="36" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <line x1="10" y1="12" x2="20" y2="12" />
                                    <line x1="10" y1="12" x2="14" y2="16" />
                                    <line x1="10" y1="12" x2="14" y2="8" />
                                    <line x1="4" y1="4" x2="4" y2="20" />
                                </svg>
                            

                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="36" height="36" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <polyline points="15 6 9 12 15 18" />
                                </svg>

                                <span>6</span>
                                
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width="36" height="36" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <polyline points="9 6 15 12 9 18" />
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-bar-to-right" width="36" height="36" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <line x1="14" y1="12" x2="4" y2="12" />
                                <line x1="14" y1="12" x2="10" y2="16" />
                                <line x1="14" y1="12" x2="10" y2="8" />
                                <line x1="20" y1="4" x2="20" y2="20" />
                                </svg>
                            </div>

                                
                            
                        </div>
                    </div>
        </div>
    )
}

export default FilterPagination
