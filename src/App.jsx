import { Route, Routes } from 'react-router-dom'
import ClothingListPage from './Pages/ClothingList'


import './App.css'

function App() {
 
  return (
    <div>
    <h1>Clothing List</h1>
    <Routes>
        <Route path="/clothing" element={<ClothingListPage />} />
        
       
      </Routes>
       
    </div>
  )
}

export default App

