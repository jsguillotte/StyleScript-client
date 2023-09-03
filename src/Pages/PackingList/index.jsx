{
    /*display added to packing list */
  }
  import { useState, useEffect } from "react";
  import axios from "axios";
  
  const API_URL = "http://localhost:5005";
  
  function PackingList() {
    const [packing, setPacking] = useState([]);
  
    useEffect(() => {
      async function fetchPacking() {
        try {
          const storedToken = localStorage.getItem("authToken");
          const response = await axios.get(`${API_URL}/api/packing`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          setPacking(response.data.packing);
          /* const response = await axios.get("/api/Packing");
          if (response.status === 200) {
            setPacking(response.data);
          } */
        } catch (error) {
          console.error("Error getting packing:", error);
        }
      }
  
      fetchPacking();
    }, []);
  
    // Function to remove an item from the Packing list
    const removePackingItem = async (itemId) => {
      try {
        const storedToken = localStorage.getItem("authToken");
        await axios.delete(
          `${API_URL}/api/remove-from-packing/${itemId}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
  
        // After successfully removing the item, update the Packing list
        const updatedPacking = packing.filter((item) => item._id !== itemId);
        setPacking(updatedPacking);
      } catch (error) {
        console.error("Error removing from packing:", error);
      }
    };
  
  
    return (
      <div>
        <h2>Packing List</h2>
        <ul>
          {packing && packing.map((item) => 
          <li key={item._id}>
            {item.title}
            <button onClick={() => removePackingItem(item._id)}>Delete</button>
            </li>)}
        </ul>
        
      </div>
    );
  }
  
  export default PackingList;