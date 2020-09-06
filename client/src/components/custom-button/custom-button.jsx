import React from "react";
import "./custom-button.scss";

const CustomButton = ({children,inverted,disabled,buttonType, ...otherProps}) => (
    <button className={`${inverted ? 'inverted' : ''} ${disabled ? 'btnDisabled' : ''} ${buttonType} custom-button `} {...otherProps}>
        {children}
    </button>
)

export default CustomButton;