import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as ShoppingBagIcon } from '../assets/icons/shopping-bag.svg'

const MyButton = props => {
    const buttons = () => {
        let template = '';
        switch (props.type) {
            case "default":
                template = 
                <Link 
                    className={!props.altClass ? "link_default" : props.altClass } 
                    to={props.linkTo} 
                    {...props.addStyle}
                >
                    {props.title}
                </Link>
                break;
            case "bag_link":
                template = 
                    <div className="bag_link"
                        onClick={()=>{
                            props.runAction();
                        }}
                    >
                    <ShoppingBagIcon />
                    </div> 
                break;
            case "submit":
                template = 
                <button className="button_primary" type="submit"
                >
                    {props.title}
                </button> 

                break
            case "primary":
                template = 
                <button
                    className="button_primary"
                     onClick={()=>{
                        props.runAction();
                    }}
                >
                    {props.title}
                </button>
                break;
            default:
                template='';
        }

        return template
    }


    return (
        <div className="my_link">
            {buttons()}
        </div>
    )
}

export default MyButton
