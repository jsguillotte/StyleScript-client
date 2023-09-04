{
  /*display added to laundry list */
}
import { useState, useEffect } from "react";
import axios from "axios";


const API_URL = "http://localhost:5005";

function LaundryList() {
  const [laundry, setLaundry] = useState([]);

  useEffect(() => {
    async function fetchLaundry() {
      try {
        const storedToken = localStorage.getItem("authToken");
        const response = await axios.get(`${API_URL}/api/laundry`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setLaundry(response.data.laundry);
        /* const response = await axios.get("/api/laundry");
        if (response.status === 200) {
          setLaundry(response.data);
        } */
      } catch (error) {
        console.error("Error getting laundry:", error);
      }
    }

    fetchLaundry();
  }, []);

  // Function to remove an item from the laundry list
  const removeLaundryItem = async (itemId) => {
    try {
      const storedToken = localStorage.getItem("authToken");
      await axios.delete(`${API_URL}/api/remove-from-laundry/${itemId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      // After successfully removing the item, update the laundry list
      const updatedLaundry = laundry.filter((item) => item._id !== itemId);
      setLaundry(updatedLaundry);
    } catch (error) {
      console.error("Error removing from laundry:", error);
    }
  };

  return (
    <div>
      <h2>Laundry List</h2>
      <ol>
        {laundry &&
          laundry.map((clothing) => (
            <li key={clothing._id}>
               <img src={clothing.image} width={200} height={250} />
              <p>{clothing.title}</p>
              <p>{clothing.careInstructions}</p>

              <button onClick={() => removeLaundryItem(clothing._id)}>
                Remove
              </button>
            </li>
          ))}
      </ol>
    </div>
  );
}

export default LaundryList;
