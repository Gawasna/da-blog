//Standard button interface component
import React from 'react';
import PropTypes from 'prop-types';
// Change Button to StandardButton
const StandardButton = ({ onClick, children, type = 'button', disabled = false, style = {} }) => {
    const defaultStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#007BFF',
        color: '#FFF',
        ...style,
    };

    return (
        <button type={type} onClick={onClick} disabled={disabled} className="btn" style={defaultStyle}>
            {children}
        </button>
    );
};

StandardButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    disabled: PropTypes.bool,
    style: PropTypes.object,
};

export default StandardButton;