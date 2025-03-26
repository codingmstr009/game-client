"use client";

export default function Error ({ error, reset }) {
    
    return (
        <div>
            <div>Error - {error.message}</div>
            <button onClick={reset}>Refresh</button>
        </div>
    )

}
