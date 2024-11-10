import React from "react";
import { Link } from "react-router-dom";

const Congrat = () => {
    return (
        <div className="congrat-container">
            <h1>Congratulations!</h1>
            <p>You have successfully logged in.</p>
            <Link to="/">Go to Home</Link>
        </div>
    );
};

export default Congrat;