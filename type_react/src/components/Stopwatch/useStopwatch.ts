import React from "react";

export type UseStopwatchResult = {
    value: number,
    handleReset: () => void,
    handleStart: () => void,
}

export const useStopwatch = (): UseStopwatchResult => {
    const [value, setValue] = React.useState(0);
    const timeout = React.useRef<null | NodeJS.Timeout>(null);

    const reset = () => {
        if (timeout.current === null) { return };
        clearTimeout(timeout.current);
    }

    const handleReset = () => {
        reset();
        setValue(0);
    };

    React.useEffect(() => {
        return () => reset();
    }, [])

    const handleStart = () => {
        reset();

        timeout.current = setTimeout(() => {
            setValue(previous => previous + 1);
            handleStart();
        }, 1000)
    };
    return { handleReset, handleStart, value };
};