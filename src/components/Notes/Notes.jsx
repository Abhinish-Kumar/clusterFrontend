import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./Notes.css";

const Notes = () => {
  const { email } = useParams();
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [newNote, setNewNote] = useState(""); // State to handle new note input

  useEffect(() => {
    // Fetch user notes based on the email prop
    const fetchNotes = async () => {
      try {
        let response = await fetch(`https://clusterapi.onrender.com/${email}`, {
          method: "GET", // Use GET method to fetch notes
          credentials: "include", // Include cookies for authentication
        });

        if (!response.ok) {
          throw new Error("User not found or Unauthorized");
        }

        const data = await response.json();
        setNotes(data); // Set the fetched notes
      } catch (err) {
        setError(err.message); // Handle any errors that occur
      }
    };

    fetchNotes();
  }, [email]); // Re-fetch notes whenever the email changes

  // Function to handle the addition of a new note
  const handleAddNote = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    try {
      let response = await fetch(`https://clusterapi.onrender.com/${email}`, {
        method: "POST", // Use POST method to send new note
        headers: {
          "Content-Type": "application/json", // Indicate that the body is JSON
        },
        body: JSON.stringify({ note: newNote }), // Send the new note in the request body
        credentials: "include", // Include cookies for authentication
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      const data = await response.json(); // Updated notes after adding the new one
      setNotes(data); // Update the notes state with the new list of notes
      setNewNote(""); // Clear the input field after submitting
    } catch (err) {
      setError(err.message); // Handle any errors during the request
    }
  };

  return (
    <div id="notes">
      <header>
        <h1>Cluster</h1>
      </header>
      <div id="listOdNotesOfUser">
        <h2>Notes for {email}</h2>

        {error && <div style={{ color: "red" }}>{error}</div>}

        {/* Render the notes if they exist */}
        {notes.length > 0 ? (
          <ul>
            {notes.map((note, index) => (
              <li key={index}>{note[Object.keys(note)[0]]}</li>
            ))}
          </ul>
        ) : (
          <p>No notes available.</p>
        )}

        {/* Form to add a new note */}
        <form onSubmit={handleAddNote}>
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a new note"
            required
          />
          <button type="submit">Add Note</button>
        </form>
      </div>
    </div>
  );
};

export default Notes;
