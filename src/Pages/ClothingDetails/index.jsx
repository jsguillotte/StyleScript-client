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
                <h1>{clothing.title}</h1>
                <p>{clothing.description}</p>
                
                <Link to = {`/clothing/edit/${clothingId}`}>Edit Clothing</Link>
            </div>
        )}
        <Link to = "/clothing">Back to Closet</Link>
    </div>
)


}

export default ClothingDetailsPage