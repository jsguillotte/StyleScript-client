import {useState} from 'react';
import axios from 'axios'

const API_URL = 'http://localhost:5005'


function AddClothing() {
// State Declaration
const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [image, setImage] = useState('')
const [brand, setBrand] = useState('')
const [size, setSize] = useState('')
const [careInstruction, setCareInstruction] = useState('')
const [season, setSeason] = useState('')
const [type, setType] = useState('')
const [color, setColor] = useState('')



// Handle Submit Function
const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {title, description}

    axios.post(`${API_URL}/api/clothing/create`, requestBody)
    .then(()=>{
        setTitle('');
        setDescription('')
    })
    .catch((error) => console.log(error))
}
  return (
    <div>
        <form  onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" name='title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </label>
            <label>
                Description:
                <input type="text" name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>

            <button type='submit'>Add Clothing</button>
      
        </form>
    </div>
  )
}

export default AddClothing