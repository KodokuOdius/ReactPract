import React from "react";
import { useStopwatch } from "./useStopwatch";

const Stopwatch: React.FC = () => {
    const { value, handleReset, handleStart } = useStopwatch();

    return (
        <div className="stopwatch">
            <p className="time">
                Прошло секунд: {value}
            </p>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
};

export default Stopwatch;
