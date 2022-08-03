import React from "react";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

export function Detail(props) {
    const location = useLocation();
    console.log(location)
    if (location.state === undefined) {
        return <Navigate replace to="/" />
    };

    console.log(location.state);
    return (
        <div>{location.state.title}</div>
    );
};
