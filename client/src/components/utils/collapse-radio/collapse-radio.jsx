import React, { useEffect } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleUp, faAngleDown} from '@fortawesome/free-solid-svg-icons';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Collapse, FormControlLabel, RadioGroup} from '@material-ui/core';
import Radio from '@material-ui/core/Radio'
import { useState } from 'react';

const CollapseRadio = (props) => {
    const [state, setState] = useState({
        open:false,
        value:'0'
    })

    useEffect(() => {
        if(props.initState){
            setState({
                ...state,
                open: props.initState
            })
        }
            
    },[props.initState]);

    const handleClick = () => {
        setState({...state,open:!state.open})
    }
    
    const handleAngle = () => (
        state.open ?
            <FontAwesomeIcon 
                icon={faAngleUp}
                className="icon"
            />
            :
            <FontAwesomeIcon 
                icon={faAngleDown}
                className="icon"
            />
    )

    const renderList = () => (
        props.list ?
            props.list.map(value => (
                <FormControlLabel  
                    key={value._id}
                    value={`${value._id}`}
                    control={<Radio />}
                    label={value.name}
                />
            ))
        :null
    )

    const handleChange = e => {
        props.handleFilters(e.target.value)
        setState({...state,value: e.target.value})
    }


    return (
        <div>
             <List style={{borderBottom:'1px solid #dbdbdb'}}>
                <ListItem onClick={handleClick} style={{padding:'10px 23px 10px 0'}}>
                    <ListItemText 
                        primary={props.title}
                        className="collapse_title"

                    />
                    {handleAngle()}
                </ListItem>
                <Collapse in={state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <RadioGroup
                            aria-label="prices"
                            name="prices"
                            value={state.value}
                            onChange={handleChange}
                        >
                            {renderList()}
                        </RadioGroup>
                    </List>
                </Collapse>
            </List>
        </div>
    )
}

export default CollapseRadio
