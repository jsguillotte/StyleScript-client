{/*display added to laundry list */}
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5005";

function LaundryList() {
  const [laundry, setLaundry] = useState([]);

  useEffect(() => {
    async function fetchLaundry() {
      try {
        const response = await axios.get('/api/laundry');
        if (response.status === 200) {
          setLaundry(response.data);
        }
      } catch (error) {
        console.error('Error getting laundry:', error);
      }
    }

    fetchLaundry();
  }, []);

  return (
    <div>
      <h2>Laundry List</h2>
      <ul>
        {laundry.map(item => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default LaundryList;


