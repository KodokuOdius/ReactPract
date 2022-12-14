import React from "react";
import './employees-list-item.css';


export default class EmployeesListItem extends React.Component {
    render() {
        const {
            name, salary, 
            onDelete, onToggleProp, onChangeSalary,
            increase, like } = this.props;

        const liClassNames =
            "list-group-item d-flex justify-content-between" +
            (increase ? " increase" : "") +
            (like ? " like" : "");

        return (
            <li className={liClassNames}>
                <span className="list-group-item-label"
                    onClick={onToggleProp} data-toggle="like">
                    {name}
                </span>
                <input type="text" className="list-group-item-input" defaultValue={salary + "$"}
                    onBlurCapture={onChangeSalary} />
                <div className='d-flex justify-content-center align-items-center'>
                    <button type="button"
                        className="btn-cookie btn-sm "
                        onClick={onToggleProp} data-toggle="increase">
                        <i className="fas fa-cookie"></i>
                    </button>

                    <button type="button"
                        className="btn-trash btn-sm"
                        onClick={onDelete}>
                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
        )
    };
};
