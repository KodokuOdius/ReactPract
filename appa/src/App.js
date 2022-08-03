import React from 'react';
import './App.css';


const Header = () => {
    return (
        <h2 className="title">Hello World</h2>
    );
};


const MiniBody = () => {
    const super_arr = [];
    for (let i = 0; i < 50; i++) {
        super_arr.push(i);
    };
    return (
        <div className="mini__body">
            {
                super_arr.map(element => {
                    return <p className={"index " + element}>
                        index -&gt; {element}
                    </p>
                })
            }
        </div>
    );
}

export class App extends React.Component {


    render() {
        return (
            <div className="App">
                <Header />
                <MiniBody />
            </div>
        );
    };
};
