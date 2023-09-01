import {useEffect, useState} from "react"
import axios from "axios"
import {Link, useParams, useNavigate} from "react-router-dom"
import CreateNote from "../CreateNote"

const API_URL = "http://localhost:5005"
function ClothingDetailsPage () {
    const [clothing, setClothing] = useState(null)
    const navigate = useNavigate()
    const {clothingId} = useParams()
    const [isInLaundry, setIsInLaundry] = useState(false)


    useEffect(()=> {
    axios.get(`${API_URL}/api/clothing/${clothingId}`)
    .then((response)=> {
        const oneClothing = response.data;
        setClothing(oneClothing)
    })
    .catch((error)=> console.log(error))
    }, [clothingId])
    
    const refreshClothing = () => {
        axios.get(`${API_URL}/api/clothing/${clothingId}`)
            .then((response) => {
                const updatedClothing = response.data;
                setClothing(updatedClothing);
            })
            .catch((error) => console.log(error));
    };


    {/*add to laundry */}
    const addToLaundry = () => {
        axios.post(`${API_URL}/api/clothing/add-to-laundry/${clothingId}`)
        .then(()=> {
            refreshClothing();
            navigate('/clothing')
        })
        .catch((error)=> console.log(error))
    }


    {/* Delete clothing */}
    const deleteClothing = () => {
        axios.delete(`${API_URL}/api/clothing/delete/${clothingId}`)
        .then(()=> {
            navigate('/clothing')
        })
        .catch((error)=> console.log(error))
    }

   
    
     

return (
    <div>
        {clothing && (
            <div>
                <img src={clothing.image} width={200} height={250}/>
                <h3>{clothing.title}</h3>
                  {/* Display notes */}
         
          <ul>
            {clothing.note.map((note) => (
              <li key={note._id}>{note.content}</li>
            ))}
          </ul>
          
          {/* Add Note */}
          <CreateNote clothingId={clothingId} refreshClothing={refreshClothing}/>
        
        <button onClick={addToLaundry} disabled={isInLaundry}>
        {isInLaundry ? 'Added to Laundry' : 'Add to Laundry'}
        </button>

                <p>{clothing.type}</p>
                <p>{clothing.description}</p>
                
                <p>{clothing.brand}</p>
                <p>{clothing.size}</p>
                <p>{clothing.careInstructions}</p>
                <p>{clothing.season}</p>
                
                

                
                <Link to = {`/clothing/edit/${clothingId}`}>Edit Clothing</Link>
            </div>
        )}
        <Link to = "/clothing">Back to Closet</Link>
        <button onClick={deleteClothing}>Delete Clothing</button>
        
        
    </div>
)


}

export default ClothingDetailsPage