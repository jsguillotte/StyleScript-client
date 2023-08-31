import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005";

function ClothingListPage() {
  const [clothing, setClothing] = useState([]);
  const [tops, setTops] = useState([]);

  const filterClothingByType = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      const response = await axios.get(`${API_URL}/api/clothing`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      console.log("response data:", response.data);
      await response.data.forEach((element) => {
        const filter = []
        if (element.type === "tops") {
            filter.push(element);
          setTops(filter);
        }
      });
    } catch (error) {}
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/clothing`)
      .then((response) => setClothing(response.data))
      .catch((error) => console.log(error));

    filterClothingByType();
    
    /* if(response.data.type === "jeans" ,  */
  }, []);
 console.log("tops", tops);
  return (
    <div>
      {clothing &&
        clothing.map((clothing) => {
          return (
            <div key={clothing._id}>
              <Link to={`/clothing/${clothing._id}`}>
                <img src={clothing.image} width={200} height={250} />
                <h3>{clothing.title}</h3>
              </Link>
            </div>
          );
        })}
      {/* {tops && tops.map((tops)=>{
            return(
                <div key={tops._id}>
                    <h1>TOPS</h1>
                   <Link to={`/clothing/${tops._id}`}>
                     <img src={tops.image} width={200} height={250}/>
                    <h3>{tops.title}</h3>

                    
                   </Link> 
                </div>
            )
          })}  */}
    </div>
  );
}

export default ClothingListPage;
