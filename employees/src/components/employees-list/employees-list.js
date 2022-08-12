import "./employees-list.css"
import EmployeesListItem from "../employees-list-item/employees-list-item";


export default function EmployeesList({ data, onDelete, onToggleProp, onChangeSalary }) {
    return (
        <ul className="app-list list-group">
            {data.map(employeer => {
                const { id, ...employeerData } = employeer
                return (
                    <EmployeesListItem key={id}
                        {...employeerData}
                        onDelete={() => onDelete(id)}
                        onToggleProp={(event) => onToggleProp(id, event.currentTarget.getAttribute("data-toggle"))}
                        onChangeSalary={(event) => onChangeSalary(id, event.currentTarget.value)} />
                )
            })}
        </ul>
    );
};
