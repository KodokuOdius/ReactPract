import "./app-info.css";

export default function AppInfo({employees, increased}) {
    return (
        <div className="app-info">
            <h1>Учёт сотрудников в компании 'Не Гений'</h1>
            <h2>Общее число сотрудников: {employees}</h2>
            <h2>Премию получат: {increased}</h2>
        </div>
    );
};
