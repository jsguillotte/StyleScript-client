{/* Edit clothing */}
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';

const API_URL = 'http://localhost:5005';

function EditClothing() {

    // State Declarations
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [size, setSize] = useState('');
    const [careInstruction, setCareInstruction] = useState('');
    const [season, setSeason] = useState('');
    const [type, setType] = useState('');
    const [color, setColor] = useState('');

    const {clothingId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_URL}/api/clothing/${clothingId}`)
        .then((response) => {
            const oneClothing = response.data;
            setTitle(oneClothing.title);
            setDescription(oneClothing.description);
            setImage(oneClothing.image);
            setBrand(oneClothing.brand);
            setSize(oneClothing.size);
            setCareInstruction(oneClothing.careInstruction);
            setSeason(oneClothing.season);
            setType(oneClothing.type);
            setColor(oneClothing.color);
        })
        .catch((error) => console.log(error))
    } , [clothingId])
     
    // Handle Submit Function
    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = {title, description, image, type, color, brand, size, careInstruction, season}

        axios.put(`${API_URL}/api/clothing/edit/${clothingId}`, requestBody)
        .then(()=>{
            setTitle('');
            setDescription('');
            setImage('');
            setBrand('');
            setSize('');
            setCareInstruction('');
            setSeason('');
            setType('');
            setColor('');
            navigate('/clothing')
        })
        .catch((error) => console.log(error))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Image:
                    <input type="text" name='image' value={image} onChange={(e) => setImage(e.target.value)} />
                </label>
                <label>
                    Title:
                    <input type="text" name='title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </label>
                <label>
                    Description:
                    <input type="text" name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <label>
                    Brand:
                    <input type="" name='brand' value={brand} onChange={(e) => setBrand(e.target.value)} />
                </label>
                {/*Create select 7 options for type */}
                <label>
                    Type:
                    <select name="type" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="tops">Top</option>
                        <option value="bottoms">Bottom</option>
                        <option value="dress">Dress</option>
                        <option value="outerwear">Outerwear</option>
                        <option value="shoes">Shoes</option>
                        <option value="accessories">Accessories</option>
                        <option value="other">Other</option>  
                        
                    </select>
                </label>
                <label>
                Weather:
                <select name="season" value={season} onChange={(e) => setSeason(e.target.value)}>
                    <option value="warm">Warm</option>
                    <option value="cold">Cold</option>
                    <option value="both">Both</option>
                </select>
                </label>
                {/*Create  a label for care instructions*/}
                <label>
                    Care Instructions:
                    <input type="text" name='careInstruction' value={careInstruction} onChange={(e) => setCareInstruction(e.target.value)} />
                </label>
                {/*Create label for size*/}
                <label>
                    Size:
                    <input type="text" name='size' value={size} onChange={(e) => setSize(e.target.value)} />
                </label>

            <br/>
            <button type='submit'>Edit Clothing</button>
            </form>
        </div>
    )
}

export default EditClothing

