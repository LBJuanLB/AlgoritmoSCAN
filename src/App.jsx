import './App.css'
import { useState } from "react"
import { Scan } from "./componets/scan"

function App() {

  const [sequence,setSequence] = useState([]) 

  const handleChange = (e) => {
    const {value} = e.target
    setSequence(value.split(',').map(Number))
  }
  return (
    <>
    <h1>Algoritmo SCAN</h1>
    <div className='InputSequence'>
      <h4>Ingrese la secuencia: </h4>
      <textarea type="text" onChange={handleChange}/>
    </div>
    <p><strong>Ejemplo:</strong> 28, 43, 7, 31, 14, 37, 2, 5, 26</p>
    
    {sequence.length > 0 ? <Scan Sequence={sequence}/> : null}
    </>
  )
}

export default App
