import React from 'react'
import './progress-bar.scss';

const ProgressBar = props => (
        <div className="myProgress">
            <div className="myBar" style={{width:props.percentage+"%"}}></div>
        </div>
    )


export default ProgressBar


