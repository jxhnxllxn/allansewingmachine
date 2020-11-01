import React, { useEffect } from 'react'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Collapse, FormControlLabel, RadioGroup } from '@material-ui/core';
import Radio from '@material-ui/core/Radio'

import { ReactComponent as UpIcon } from '../assets/icons/chevron-up.svg'
import { ReactComponent as DownIcon } from '../assets/icons/chevron-down.svg'
import { useState } from 'react';

const CollapseRadio = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState('0')

    useEffect(() => {
        if (props.initState) {
            setIsOpen(props.initState)
        }
    }, [props.initState]);

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

   
    const handleAngle = () => (
        isOpen ?
            <UpIcon />
            :
           <DownIcon />
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
            : null
    )

    const handleChange = e => {
        props.handleFilters(e.target.value)
        setValue(e.target.value)
    }


    return (
        <div>
            <List style={{ borderBottom: '1px solid #dbdbdb' }}>
                <ListItem onClick={handleClick} style={{ padding: '10px 23px 10px 0' }}>
                    <ListItemText
                        primary={props.title}
                        className="collapse_title"
                    />
                    {handleAngle()}
                </ListItem>
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <RadioGroup
                            aria-label="prices"
                            name="prices"
                            value={value}
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
