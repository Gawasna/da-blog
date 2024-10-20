import React from 'react';
import { MoonLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className="loading-container">
            <MoonLoader size={50} color={"#123abc"} loading={true} />
            <p>Loading...</p>
        </div>
    );
};

export default Loading;