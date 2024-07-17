import { useEffect } from "react"

function App(): JSX.Element {

    useEffect(() => {
        const messageListener = (_event, arg) => {
            console.log(arg); // Log the message
        };

        console.log("asdas")

        window.electron.ipcRenderer.on("message", messageListener);
    });

    return (
        <div>testasdasdaasdasdasdd</div>
    )
}

export default App