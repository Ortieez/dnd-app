function App(): JSX.Element {



  return (
    <div>
      <div className="bg-red-200 size-8"></div>
      <button onClick={() => window.electron.ipcRenderer.send("open-window", "combat-tracker")}>asdsa</button>
      <button onClick={() => window.electron.ipcRenderer.send("message", "hii")}>asdsasdasdasd</button>


      <div className="mt-10 mb-10 bg-green-200">

      </div>
    </div>
  )
}

export default App
