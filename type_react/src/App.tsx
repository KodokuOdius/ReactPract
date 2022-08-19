import React from 'react';
import './App.css';
// import MouseObserver from './components/MouseObserver/MouseObserver';
import Stopwatch from './components/Stopwatch';

const App: React.FC = () => {
    return (
        <div className="main">
            {/* <MouseObserver /> */}
            <Stopwatch />
        </div>
    );
};

export default App;
