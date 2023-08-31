import { Route, Routes } from 'react-router-dom'
import ClothingListPage from './Pages/ClothingList'
import ClothingDetailsPage from './Pages/ClothingDetails'
import AddClothing from './Pages/AddClothing'


import './App.css'

function App() {
 
  return (
    <div>
    <h1>Clothing List</h1>
    <Routes>
        <Route path="/clothing" element={<ClothingListPage />} />
        <Route path="/clothing/:clothingId" element={<ClothingDetailsPage />} />
        <Route path="/clothing/create" element={<AddClothing />} />
        
       
      </Routes>
       
    </div>
  )
}

export default App

