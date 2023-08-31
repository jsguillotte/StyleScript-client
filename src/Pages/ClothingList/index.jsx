import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'


const API_URL = 'http://localhost:5005'

function ClothingListPage(){
   const [clothing, setClothing] = useState([]);

   useEffect(() => {
     axios.get(`${API_URL}/api/clothing`)
     .then((response)=> setClothing(response.data))
     .catch((error)=> console.log(error))
   
   }, [])
   
   return(
        <div>
          {clothing.map((clothing)=>{
            return(
                <div key={clothing._id}>
                   <Link to={`/clothing/${clothing._id}`}>
                    <h3>{clothing.title}</h3>
                   </Link> 
                </div>
            )
          })}  
        </div>
   )

}

export default ClothingListPage