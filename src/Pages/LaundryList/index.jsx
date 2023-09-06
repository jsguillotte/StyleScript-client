{
  /*display added to laundry list */
}
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const API_URL = "https://style-script.onrender.com";

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

  // Function to remove all items from the laundry list
  const handleDeleteAll = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      // Step 1: Clear the laundry list in local storage
      localStorage.removeItem("laundryList");

      // Step 2: Clear the laundry state in your component
      setLaundry([]);

      // Step 3: Send a request to your backend to delete all items
      const response = await axios.delete(
        `${API_URL}/api/remove-from-laundry/all`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(
          "All laundry items deleted successfully from local storage and backend."
        );
      } else {
        console.error("Error deleting laundry items from backend.");
      }
    } catch (error) {
      console.error("Error deleting laundry:", error);
    }
  };

  {
    /* const removeAllLaundryItems = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      await axios.delete(`${API_URL}/api/remove-from-laundry/all`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
  
      // After successfully removing all items, update the laundry list to an empty array
      setLaundry([]);
      console.log('All laundry items deleted successfully.');
    } catch (error) {
      console.error("Error removing all laundry items:", error);
    }
  };*/
  }

  return (
    <div className="clothing-list added-list">
      <h2>Laundry List</h2>
      <ol className="clothing-grid">
        {laundry &&
          laundry.map((clothing) => (
            <li key={clothing._id} className="clothing-item-added">
              <Link to={`/clothing/${clothing._id}`}>
                <img src={clothing.image} />
                <p>{clothing.title}</p>
                <p>{clothing.careInstructions}</p>
              </Link>

              <button onClick={() => removeLaundryItem(clothing._id)}>
                <DeleteOutlineIcon />
              </button>
            </li>
          ))}
      </ol>
      <button onClick={handleDeleteAll}>Clear</button>
    </div>
  );
}

export default LaundryList;
