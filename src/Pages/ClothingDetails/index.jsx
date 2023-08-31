import {useEffect, useState} from "react"
import axios from "axios"
import {Link, useParams} from "react-router-dom"

const API_URL = "http://localhost:5005"
function ClothingDetailsPage () {
    const [clothing, setClothing] = useState(null)
    const {clothingId} = useParams()

    useEffect(()=> {
    axios.get(`${API_URL}/api/clothing/${clothingId}`)
    .then((response)=> {
        const oneClothing = response.data;
        setClothing(oneClothing)
    })
    .catch((error)=> console.log(error))
    }, [clothingId])

return (
    <div>
        {clothing && (
            <div>
                <img src={clothing.image} width={200} height={250}/>
                <h3>{clothing.title}</h3>
                <p>{clothing.type}</p>
                <p>{clothing.description}</p>
                
                <p>{clothing.brand}</p>
                <p>{clothing.size}</p>
                <p>{clothing.careInstruction}</p>
                <p>{clothing.season}</p>
                
                

                
                <Link to = {`/clothing/edit/${clothingId}`}>Edit Clothing</Link>
            </div>
        )}
        <Link to = "/clothing">Back to Closet</Link>
    </div>
)


}

export default ClothingDetailsPage