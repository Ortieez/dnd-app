import { useEffect, useState } from "react"
import { database } from "./db"
import { posts } from "../../db/schema"

function App(): JSX.Element {



  return (
    <div>
      <div className="bg-red-200 size-8"></div>
      <button onClick={() => window.electron.ipcRenderer.send("open-window", "combat-tracker")}>asdsa</button>
      <button onClick={() => window.electron.ipcRenderer.send("message", "hii")}>asdsasdasdasd</button>
    </div>
  )
}

export default App
