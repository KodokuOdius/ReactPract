import React from "react";
import "./employees-add-form.css";


export default class EmployeesAddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            salary: ""
        };
    };

    onValueChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    setDefault = () => {
        this.setState({
            name: "",
            salary: ""
        });
    };

    render() {
        const { name, salary } = this.state;
        const { onSubmit } = this.props;
        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form action="." className="add-form d-flex" onSubmit={(event) => { event.preventDefault(); onSubmit(name, salary); this.setDefault(); }}>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?"
                        name="name"
                        value={name}
                        onChange={this.onValueChange} />
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?"
                        name="salary"
                        value={salary}
                        onChange={this.onValueChange} />
                    <button
                        className="btn btn-outline-light">
                        Добавить
                    </button>
                </form>
            </div>
        );
    };
};
