import { useState } from "react"
import Navbar from "./components/Navbar"
import DashboardView from "./views/DashboardView"
import FormView from "./views/FormView"

function App() {
  const [ view, setView ] = useState('dashboard')
  
  return (
    <div>
      <Navbar value={view} setValue={setView}></Navbar>
      { view === 'dashboard' ?
        <DashboardView></DashboardView> : <FormView></FormView>
      }
    </div>
  )
}

export default App
