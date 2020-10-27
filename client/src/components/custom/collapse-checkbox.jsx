import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { Collapse } from '@material-ui/core';
import { useState } from 'react';


const CollapseCheckBox = ({ initState, handleFilters, list, title }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [checked, setChecked] = useState([]);


    useEffect(() => {
        if (initState) {
            setIsOpen(initState)
        }
    }, [initState]);

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    const handleAngle = () => (
        isOpen ?
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

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }

    useEffect(() => {
        handleFilters(checked)
    // eslint-disable-next-line
    }, [checked])

    const renderList = () => (
        list ?
            list.map((value) => (
                <ListItem key={value._id} style={{ padding: '10px 0' }}>
                    <ListItemText primary={value.name} />
                    <ListItemSecondaryAction>
                        <Checkbox
                            color='primary'
                            onChange={handleToggle(value._id)}
                            checked={checked.indexOf(value._id) !== -1}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            ))
            : null
    )

    return (
        <div className="collapase_items_wrapper">
            <List style={{ borderBottom: '1px solid #dbdbdb' }}>
                <ListItem onClick={handleClick} style={{ padding: '10px 23px 10px 0' }}>
                    <ListItemText
                        primary={title}
                        className="collapse_title"

                    />
                    {handleAngle()}
                </ListItem>
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {renderList()}
                    </List>
                </Collapse>
            </List>
        </div>
    )
}

export default CollapseCheckBox
