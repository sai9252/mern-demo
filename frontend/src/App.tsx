import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Createpage from "./components/Programs/Createpage";
import Homepage from "./components/Programs/Homepage";
import Navbar from './components/Programs/Navbar';



function App() {

  return (
    <>

    <Router >
      <div className=' '>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/create" element={<Createpage/>}/>
    </Routes>
    </div>
    </Router>

    </>
  )
}

export default App
