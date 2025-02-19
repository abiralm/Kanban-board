import './App.css'
import './index.css'
import Columns from './components/Columns'

function App() {
  return (
      <div className='App'>
        <Columns state={"COMPLETED"}/>
        <Columns state={"PLANNED"}/>
        <Columns state={"ONGOING"}/>
      </div>

  )
}

export default App
