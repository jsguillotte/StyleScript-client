import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5005';

function ClothingDetailsPage() {
  const [clothing, setClothing] = useState(null);
  const navigate = useNavigate();
  const { clothingId } = useParams();
  const [isInLaundry, setIsInLaundry] = useState(false);
  const [noteContent, setNoteContent] = useState('');

  useEffect(() => {
    async function fetchClothing() {
      try {
        const storedToken = localStorage.getItem('authToken');
        const response = await axios.get(`${API_URL}/api/clothing/${clothingId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        const oneClothing = response.data;
        setClothing(oneClothing);
      } catch (error) {
        console.log(error);
      }
    }
    fetchClothing();
  }, [clothingId]);

  const refreshClothing = () => {
    async function fetchUpdatedClothing() {
      try {
        const storedToken = localStorage.getItem('authToken');
        const response = await axios.get(`${API_URL}/api/clothing/${clothingId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        const updatedClothing = response.data;
        setClothing(updatedClothing);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUpdatedClothing();
  };

  const addToLaundry = () => {
    async function addToLaundryRequest() {
      try {
        const storedToken = localStorage.getItem('authToken');
        await axios.post(`${API_URL}/api/clothing/add-to-laundry/${clothingId}`, null, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        refreshClothing();
        navigate('/clothing');
      } catch (error) {
        console.log(error);
      }
    }
    addToLaundryRequest();
  };

  const deleteClothing = () => {
    async function deleteClothingRequest() {
      try {
        const storedToken = localStorage.getItem('authToken');
        await axios.delete(`${API_URL}/api/clothing/delete/${clothingId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        navigate('/clothing');
      } catch (error) {
        console.log(error);
      }
    }
    deleteClothingRequest();
  };

  const createNote = () => {
    async function createNoteRequest() {
      try {
        const storedToken = localStorage.getItem('authToken');
        await axios.post(
          `${API_URL}/api/note/create/${clothingId}`,
          { content: noteContent },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        refreshClothing();
        setNoteContent('');
      } catch (error) {
        console.log(error);
      }
    }
    createNoteRequest();
  };

  return (
    <div>
      {clothing && (
        <div>
          <img src={clothing.image} width={200} height={250} />
          <h3>{clothing.title}</h3>

          {/* Display notes */}
          <ul>
            {clothing.note.map((note) => (
              <li key={note._id}>{note.content}</li>
            ))}
          </ul>

          {/* Add Note */}
          <div>
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Enter your note"
            />
            <button onClick={createNote}>Add Note</button>
          </div>

          <button onClick={addToLaundry} disabled={isInLaundry}>
            {isInLaundry ? 'Added to Laundry' : 'Add to Laundry'}
          </button>

          <p>{clothing.type}</p>
          <p>{clothing.description}</p>

          <p>{clothing.brand}</p>
          <p>{clothing.size}</p>
          <p>{clothing.careInstructions}</p>
          <p>{clothing.season}</p>

          <Link to={`/clothing/edit/${clothingId}`}>Edit Clothing</Link>
        </div>
      )}
      <Link to="/clothing">Back to Closet</Link>
      <button onClick={deleteClothing}>Delete Clothing</button>
    </div>
  );
}

export default ClothingDetailsPage;