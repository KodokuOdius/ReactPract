// import { Component } from "react";
import "./app-filter.css"

export default function AppFilter(props) {
    const btnsData = [
        { name: "all", label: "Все сотрудники" },
        { name: "like", label: "На повышение" },
        { name: "moreThen", label: "З/П больше 1000$" }
    ]

    return (
        <div className="btn-group">
            {btnsData.map(({ name, label }) => {
                const isActive = props.filter === name;
                return (
                    <button key={name} type="button"
                        className={"btn" + (isActive ? " btn-light" : " btn-outline-light")}
                        onClick={() => props.onFilterSelect(name)}>
                        {label}
                    </button>
                );
            })}
        </div>
    );
};