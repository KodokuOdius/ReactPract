import React from "react";

import "./App.css";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: "Name 1", salary: 100, increase: true, id: 1, like: false },
                { name: "Name 2", salary: 11, increase: false, id: 2, like: false },
                { name: "Name 3", salary: 7987, increase: false, id: 3, like: true },
            ]
        };
    };

    deleteItem = (id) => {
        this.setState(({ data }) => {
            // const index = data.findIndex(element => element.id === id);
            return {
                data: data.filter(item => item.id !== id)
            };
        });
    };

    addItem = (name, salary) => {
        if (name && salary && name.length > 5) {
            this.setState(({ data }) => {
                return {
                    data: [...data, { name: name, salary: salary, increase: false, id: data.length + 1, like: false }]
                }
            });
        };
    };

    onToggleProp = (id, prop) => {
        this.setState(({ data }) => (
            {
                data: data.map(item => {
                    if (item.id === id) {
                        return { ...item, [prop]: !item[prop] }
                    };
                    return item;
                })
            }
        ));
    };

    render() {
        const { data } = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased} />


                <div className="search-panel">
                    <SearchPanel />
                    <AppFilter />
                </div>

                <EmployeesList data={data}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp} />
                <EmployeesAddForm onSubmit={this.addItem} />
            </div>
        );
    };
};
