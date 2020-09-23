import React from 'react'
import './page-top.scss'

const PageTop = (props) => {
    return (
        <div className="page_top">
            <div>
                {props.title}
            </div>
        </div>
    )
}

export default PageTop
