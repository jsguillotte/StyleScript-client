import { useState } from 'react';
import axios from 'axios';

function CreateNote({ clothingId, refreshClothing }) {
  const [noteContent, setNoteContent] = useState('');

  const handleCreateNote = async () => {
    try {
      const response = await axios.post(`/api/note/create/${clothingId}`, {
        content: noteContent,
      });

      if (response.status === 200) {
        refreshClothing(); // Call this function to refresh clothing details after adding note
        setNoteContent('');
      }
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <div>
      
      <textarea
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
      />
      <button onClick={handleCreateNote}>Add Note</button>
    </div>
  );
}

export default CreateNote;
