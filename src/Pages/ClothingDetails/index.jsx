import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import DryCleaningIcon from "@mui/icons-material/DryCleaning";
import LuggageIcon from "@mui/icons-material/Luggage";

// const API_URL = "https://style-script.onrender.com";
const API_URL = "http://localhost:5005";

function ClothingDetailsPage() {
  const [clothing, setClothing] = useState(null);
  const navigate = useNavigate();
  const { clothingId } = useParams();
  const [isInLaundry, setIsInLaundry] = useState(false);
  const [isInPacking, setIsInPacking] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  useEffect(() => {
    async function fetchClothing() {
      try {
        const storedToken = localStorage.getItem("authToken");
        const response = await axios.get(
          `${API_URL}/api/clothing/${clothingId}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
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
        const storedToken = localStorage.getItem("authToken");
        const response = await axios.get(
          `${API_URL}/api/clothing/${clothingId}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
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
        const storedToken = localStorage.getItem("authToken");
        await axios.post(
          `${API_URL}/api/clothing/add-to-laundry/${clothingId}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        refreshClothing();
        navigate("/clothing");
      } catch (error) {
        console.log(error);
      }
    }
    addToLaundryRequest();
  };

  const addToCalendar = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      await axios.post(
        `${API_URL}/api/clothing/add-to-calendar/${clothingId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      navigate("/calendar");
    } catch (error) {
      console.log(error);
    }
  };

  const addToPacking = () => {
    async function addToPackingRequest() {
      try {
        const storedToken = localStorage.getItem("authToken");
        await axios.post(
          `${API_URL}/api/clothing/add-to-packing/${clothingId}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        refreshClothing();
        navigate("/clothing");
      } catch (error) {
        console.log(error);
      }
    }
    addToPackingRequest();
  };

  const deleteClothing = () => {
    async function deleteClothingRequest() {
      try {
        const storedToken = localStorage.getItem("authToken");
        await axios.delete(`${API_URL}/api/clothing/delete/${clothingId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        navigate("/clothing");
      } catch (error) {
        console.log(error);
      }
    }
    deleteClothingRequest();
  };

  const createNote = () => {
    async function createNoteRequest() {
      try {
        const storedToken = localStorage.getItem("authToken");
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
        setNoteContent("");
      } catch (error) {
        console.log(error);
      }
    }
    createNoteRequest();
  };
  const [editedNoteId, setEditedNoteId] = useState(null);
  const [editedNoteContent, setEditedNoteContent] = useState("");

  // Function to edit a note
  const editNote = (noteId, currentContent) => {
    setEditedNoteId(noteId);
    setEditedNoteContent(currentContent);
  };

  // Function to save edited note
  const saveEditedNote = async (noteId) => {
    async function editNoteRequest() {
      try {
        const storedToken = localStorage.getItem("authToken");
        await axios.put(
          `${API_URL}/api/note/update/${clothingId}/${noteId}`,
          { content: editedNoteContent },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        refreshClothing();
        setEditedNoteId(null);
      } catch (error) {
        console.log(error);
      }
    }
    editNoteRequest();
  };

  const deleteNote = (noteId) => {
    async function deleteNoteRequest() {
      try {
        const storedToken = localStorage.getItem("authToken");
        await axios.delete(
          `${API_URL}/api/note/delete/${clothingId}/${noteId}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        refreshClothing();
      } catch (error) {
        console.log(error);
      }
    }

    // Prompt the user for confirmation before deleting the note
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmDelete) {
      deleteNoteRequest();
    }
  };

  return (
    <div className="clothing-details">
      {clothing && (
        <div>
          <img src={clothing.image} width={200} height={250} />
          <h3>{clothing.title}</h3>

          {/* Display notes */}
          <ul>
            {clothing.note.map((note) => (
              <li key={note._id}>
                {editedNoteId === note._id ? (
                  <>
                    <textarea
                      value={editedNoteContent}
                      onChange={(e) => setEditedNoteContent(e.target.value)}
                      placeholder={note.content}
                    />
                    <button onClick={() => saveEditedNote(note._id)}>
                      Save Note
                    </button>
                  </>
                ) : (
                  <>
                    {note.content}
                    <button onClick={() => editNote(note._id, note.content)}>
                      Edit Note
                    </button>
                    <button onClick={() => deleteNote(note._id)}>
                      Delete Note
                    </button>
                  </>
                )}
              </li>
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

          <button onClick={addToCalendar}>Add to Calendar</button>

          <button onClick={addToLaundry} disabled={isInPacking}>
            <DryCleaningIcon />
            {/*  {isInPacking ? "Added to Packing" : "Add to Packing"} */}
          </button>

          <button onClick={addToPacking} disabled={isInPacking}>
            <LuggageIcon />
            {/*  {isInPacking ? "Added to Packing" : "Add to Packing"} */}
          </button>

          <p>Type: {clothing.type}</p>
          <p>Description: {clothing.description}</p>

          <p>Brand: {clothing.brand}</p>
          <p>Size: {clothing.size}</p>
          <p>Care Label: {clothing.careInstructions}</p>
          <p>Weather: {clothing.season}</p>

          <Link to={`/clothing/edit/${clothingId}`}>
            <button>Edit Clothing</button>
          </Link>
        </div>
      )}

      <button onClick={deleteClothing}>Delete Clothing</button>
    </div>
  );
}

export default ClothingDetailsPage;
