{
    /*display added to packing list */
  }
  import { useState, useEffect } from "react";
  import axios from "axios";
  import { Link } from "react-router-dom";
  import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
  
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
  
     // Function to remove all items from the laundry list
     const handleDeleteAll = async () => {
      try {
        const storedToken = localStorage.getItem("authToken");
    
        // Step 1: Clear the laundry list in local storage
        localStorage.removeItem("packingList");
    
        // Step 2: Clear the laundry state in your component
        setPacking([]);
    
        // Step 3: Send a request to your backend to delete all items
        const response = await axios.delete(`${API_URL}/api/remove-from-packing/all`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          }
        });
    
        if (response.status === 200) {
          console.log('All packing items deleted successfully from local storage and backend.');
        } else {
          console.error('Error deleting packing items from backend.');
        }
      } catch (error) {
        console.error('Error deleting packing:', error);
      }
    };


    return (
      <div className="clothing-list added-list">
        <h2>Packing List</h2>
        <ol className="clothing-grid">
          {packing && packing.map((clothing) => (
          <li key={clothing._id} className="clothing-item">
          <Link to={`/clothing/${clothing._id}`} >
           <img src={clothing.image} />
           <p>{clothing.title}</p>
           
          </Link>

             <button onClick={() => removePackingItem(clothing._id)}><DeleteOutlineIcon/></button>
            </li>))}
        </ol>
        <button onClick={handleDeleteAll}>Clear</button>
      </div>
    );
  }
  
  export default PackingList;