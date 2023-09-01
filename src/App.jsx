import { Route, Routes } from 'react-router-dom'

import ClothingListPage from './Pages/ClothingList'
import ClothingDetailsPage from './Pages/ClothingDetails'
import AddClothing from './Pages/AddClothing'
import EditClothing from './Pages/EditClothing/clothing'
import LaundryList from './Pages/LaundryList'



import './App.css'

function App() {
 
  return (
    <div>
    
    <h1>Clothing List</h1>
    <Routes>
        <Route path="/clothing" element={<ClothingListPage />} />
        <Route path="/clothing/:clothingId" element={<ClothingDetailsPage />} />
        <Route path="/clothing/create" element={<AddClothing />} />
        <Route path="/clothing/edit/:clothingId" element={<EditClothing />} />
        <Route path="/laundry" element={<LaundryList />} /> 
        
       
      </Routes>
       
    </div>
  )
}

export default App

