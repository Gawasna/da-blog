import React from 'react';
import { MoonLoader } from 'react-spinners';
import { useState, useEffect } from 'react';
const Loading = () => {


    const [loginSuccess, setLoginSuccess] = useState(false);

    useEffect(() => {
        if (loginSuccess) {
            const timer = setTimeout(() => {
                setLoginSuccess(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [loginSuccess]);
    useEffect(() => {
        setTimeout(() => {
            setLoginSuccess(true);
        }, 2000);
    }, []);

    return (
        <div className="loading-overlay">
            <div className='loadctn'>
                <MoonLoader />
                <div className="loading-lb">
                    <p>Loading...</p>
                </div>
            </div>
            
        </div>
    );
};

export default Loading;