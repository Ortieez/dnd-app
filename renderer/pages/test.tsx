import React, { useEffect } from 'react'

function test() {

    useEffect(() => {
        const messageHandler = (message) => {
            console.log(message);
        };

        window.api.ipc.on('message', messageHandler);
    }, []);


    return (
        <>
            <div>test</div>
        </>
    )
}

export default test