import React from "react";
import { useLocation } from "react-router-dom";

export function About(props) {
    const state = useLocation();
    console.log(state)
    return <span>О проекте qwerty
        qwerty
        lorem*8
        qwerty
        qwerty
        qwerty
        qwerty
        qwerty

    </span>
}
