import React from 'react';
import PropTypes from 'prop-types';

const Textfield = ({ label, value, onChange, placeholder, type }) => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '1rem',
    };

    const labelStyle = {
        marginBottom: '0.5rem',
        fontSize: '1rem',
        fontWeight: 'bold',
    };

    const inputStyle = {
        padding: '0.5rem',
        fontSize: '1rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
    };

    return (
        <div className="textfield-container" style={containerStyle}>
            {label && <label className="textfield-label" style={labelStyle}>{label}</label>}
            <input
                className="textfield-input"
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={inputStyle}
            />
        </div>
    );
};

Textfield.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
};

Textfield.defaultProps = {
    type: 'text',
    placeholder: '',
};

export default Textfield;