import React, { useEffect } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleUp, faAngleDown} from '@fortawesome/free-solid-svg-icons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import {Collapse} from '@material-ui/core';
import { useState } from 'react';


const CollapseCheckBox = (props) => {
    
    const [state, setState] = useState({
        open: false,
        checked: []
    })

    useEffect(() => {
        const open = () =>{
            if(props.initState){
                setState({
                    ...state,
                    open: props.initState
                })
            }
        }
        open()
    },[]);

    const handleClick = () => {
        setState({...state, open:!state.open})
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
    
    const handleToggle = value => () => {
        const {checked} = state;
        const  currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if(currentIndex === -1){
            newChecked.push(value)
        }else{
            newChecked.splice(currentIndex,1)
        }

        setState({
            ...state,
            checked:newChecked
        })
    }

    useEffect(() => {
        props.handleFilters(state.checked)
    }, [state.checked])

    const renderList = () => (
        props.list ?
            props.list.map((value)=>(
               <ListItem key={value._id} style={{padding:'10px 0'}}>
                    <ListItemText primary={value.categoryName} />
                    <ListItemSecondaryAction>
                        <Checkbox  
                            color='primary'
                            onChange={handleToggle(value._id)}
                            checked={state.checked.indexOf(value._id) !== -1}
                        />
                    </ListItemSecondaryAction>
               </ListItem>
            ))
        :null
    )

    return (
        <div className="collapase_items_wrapper">
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
                        {renderList()}
                    </List>
                </Collapse>
            </List>
        </div>
    )
}

export default CollapseCheckBox
