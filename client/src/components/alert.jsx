import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

const Alert = ({alerts}) => {
    const alert = alerts !== null && alerts.length > 0 ? 
    <div className="alertContainer">
        {alerts.map(alert => (  
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
        </div>
        ))}
    </div> : null
    return ReactDOM.createPortal(
        <>{alert}</>,
        document.getElementById("modal-root")
    )    

}


Alert.propTypes = { 
    alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert);
