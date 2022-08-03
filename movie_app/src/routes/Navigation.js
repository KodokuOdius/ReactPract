import React from "react";
import { Link } from "react-router-dom";

export function Navigation() {
    return (
        <div>
            <Link to={"./"}>Main</Link>
            <br />
            <Link to={"/about"}
                state={{
                    "qwe": "qwe"
                }}
            >About</Link>
        </div >
    )
}

