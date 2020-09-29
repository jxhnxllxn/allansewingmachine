import React from 'react'
import { Link } from 'react-router-dom';
import './button.scss'

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
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <circle cx="9" cy="19" r="2" />
                    <circle cx="17" cy="19" r="2" />
                    <path d="M3 3h2l2 12a3 3 0 0 0 3 2h7a3 3 0 0 0 3 -2l1 -7h-15.2" />
                    </svg>
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
