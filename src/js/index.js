import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "../styles/index.css";
import Home from "./component/home.jsx";

const MainComponent = () => {
    const [counter, setCounter] = useState(0);
    const [intervalID, setIntervalID] = useState(null);

    useEffect(() => {
        // Cleanup interval on component unmount
        return () => {
            if (intervalID) {
                clearInterval(intervalID);
            }
        };
    }, [intervalID]);

    const startCounter = () => {
        if (!intervalID) {
            const id = setInterval(() => {
                setCounter(prevCounter => prevCounter + 1);
            }, 1000);
            setIntervalID(id);
        }
    };

    const stopCounter = () => {
        if (intervalID) {
            clearInterval(intervalID);
            setIntervalID(null);
        }
    };

    const resetCounter = () => {
        if (intervalID) {
            clearInterval(intervalID);
            setIntervalID(null);
        }
        setCounter(0);
    };

    return (
        <>
            <Home seconds={counter} />
            <div className="container justify-content-center mt-4">
                <div className="d-flex justify-content-center mt-4 mb-3">
                    <label className="p-2">Starting Value</label>
                    <input
                        type="number"
                        value={counter}
                        onChange={(event) => setCounter(Number(event.target.value))}
                    />
                </div>
                <div className="p-2 d-flex justify-content-center gap-3">
                    <button onClick={startCounter} className="btn btn-success">
                        Start
                    </button>
                    <button onClick={stopCounter} className="btn btn-danger">
                        Stop
                    </button>
                    <button onClick={resetCounter} className="btn btn-warning">
                        Reset
                    </button>
                </div>
            </div>
        </>
    );
};

let root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<MainComponent />);